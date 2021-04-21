const $this = this
const path = require('path')
var fs = require('fs')
    , _ = require('lodash')
const seq = require('../db')
const config = require('../config');
const url = require('url')
const help = require('./helpers');
const { collect } = require('collect.js');

const files = fs.readdirSync(path.resolve(__dirname, '../models'))
const tranform = (data) => {
    var out;
    if (_.isArray(data)) {
        out = _.chain(data).mapValues((row) => {
            return tranform(row);
        }).values();
    } else if (_.isPlainObject(data)) {
        out = _.chain(data).mapValues((val, key) => {
            if (!help.empty(val)) {
                if (typeof val == 'object') {
                    val = tranform(val)
                }
            } else {
                val = val == null ? "" : val;
            }
            return val;
        });
    }
    return out;
}
const searchBuilder = function (str, attrs = []) {
    let words = _.compact(str.match(/((\+|\-)?"[^"]*("))|((\+|\-)?[^ "]*())/gm))
    const r = []

    words = words.map(w => w.replace(/^(\+|-)?"?|"$/gmi, '$1'))

    for (let a of attrs) {
        let l = []

        l.push({
            $or: words.filter(w => /^"|^[^+-]/gmi.test(w)).map(w => ({ $like: '%' + w + '%' }))
        })
        for (let w of words.filter(w => /^\+/gmi.test(w))) {
            l.push({ $like: '%' + w.replace(/^\+/gmi, '') + '%' })
        }
        for (let w of words.filter(w => /^\-/gmi.test(w))) {
            l.push({ $notLike: '%' + w.replace(/^\-/gmi, '') + '%' })
        }
        if (l.length > 0)
            r.push({ [a]: { $and: l } })
    }
    return r
}

class classQuery {
    /**
     * Class to query sequelite results.
     */
    constructor($model = null) {
        for (var f of files) {
            seq.import(path.resolve(__dirname, '../models', f))
        }
        this._now = new Date().getTime();
        this._operation = {
            "=": "$eq",
            "==": "$eq",
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "like": "$like",
            "<>": "$ne",
            "BETWEEN": "$btw",
            "NOTBETWEEN": "$notbtw"
        };
        this._template = {};
        this._transaction = null;
        this._is_null = false;
        this._current_page = 1;
        this._where = {};
        this._params = {};
        this._order = {};
        this._include = {};
        this._include.include = [];
        this._limit = {};
        this._offset = {};
        this._attributes = {};
        this._group = {};
        this._group.group = [];
        this._glob = {};
        this._case_select = [];
        this._as_case_when = [];
        this._as_default = {};
        this._convert_type = {};
        if (!help.empty($model)) {
            var $modelList = {};
            if (typeof $model == 'string') {
                // $modelList[$model] = seq.models[$model];
                this._models = seq.models[$model];
                return this
            } else {
                _.forEach($model, function (value) {
                    $modelList[value] = seq.models[value];
                });
            }
            return $modelList;
        }
    }

    getPrimaryKey() {
        return this._models.primaryKeyAttribute
    }

    editType($attr = '', $type = '') {
        if (!help.empty($attr) && !help.empty($type)) {
            var Attr = this.getAttributes(1)
            if (!help.empty(Attr[$attr])) {
                if (Attr[$attr] != $type.toUpperCase()) {
                    this._convert_type[$attr] = $type;
                }
            }
        }
        return this
    }
    async bulkCreate(variable = []) {
        return await this._models.bulkCreate(variable)
    }
    transaction(transaction = null) {

        this._transaction = transaction
        return this
    }
    async save(variable = {}) {
        var attributes = this.getAttributes();

        variable = _.merge(variable, help.only(this, attributes))
        variable = help.only(variable, attributes)

        var call = {}
        if (!help.empty(this._where)) {
            call = await this._models.update(variable, this._where);
            if (!help.empty(call)) {
                call = await this._models.findOne(this._where)
            }
        } else {
            call = await this._models.create(variable)
            let other = help.only(call.dataValues, this._models.primaryKeyAttributes)
            call = await this._models.findOne({
                where: other
            })
        }
        return call;
    }
    async create(variable = {}) {
        var attributes = this.getAttributes();

        variable = _.merge(variable, help.only(this, attributes))
        variable = help.only(variable, attributes)

        var call = {}
        call = await this._models.create(variable)
        let other = help.only(call.dataValues, this._models.primaryKeyAttributes)
        call = await this._models.findOne({
            where: other
        })
        return call;
    }
    async update(variable = {}) {
        var attributes = this.getAttributes();

        variable = _.merge(variable, help.only(this, attributes))
        variable = help.only(variable, attributes)

        var call = {}
        call = await this._models.update(variable, this._where);
        if (!help.empty(call)) {
            call = await this._models.findOne(this._where)
        }
        return call;
    }
    async createUpdate(variable = {}, showStatus = false) {
        var attributes = this.getAttributes();
        variable = _.merge(variable, help.only(this, attributes))
        variable = help.only(variable, attributes)
        var call = {}
            , status = ''
        if (!help.empty(this._where)) {

            call = await this._models.update(variable, this._where, { returning: true });
            if (!help.empty(call)) {
                call = await this._models.findOne(this._where)
                status = 'update'
            } else {
                status = 'create'
                if (help.empty(await this._models.findOne(this._where))) {
                    call = await this._models.create(variable)
                    let other = help.only(call.dataValues, this._models.primaryKeyAttributes)
                    call = await this._models.findOne({
                        where: other
                    })
                } else {
                    call = await this._models.findOne(this._where)
                }
            }
        } else {
            call = await this._models.create(variable)
            let other = help.only(call.dataValues, this._models.primaryKeyAttributes)
            status = 'create'
            call = await this._models.findOne({
                where: other
            })
        }
        if (help.empty(showStatus)) {
            return call;
        } else {
            return { status: status, data: call };
        }
    }
    async commiting(variable = {}, options) {
        var attributes = this.getAttributes();
        variable = _.merge(variable, help.only(this, attributes))
        variable = help.only(variable, attributes)
        let showStatus = help.getBoolean(help.get(options, 'showStatus', false))
        let t = options.transaction ? null : await seq.transaction()
        var call = {}
        var status = '{}'
        try {
            let Model = this._models
            let where = help.get(this._where, 'where', {})

            if (!help.empty(where)) {
                if (t) {
                    // await Model.destroy({
                    //     where,
                    //     ...options
                    // })
                }
                call = await this._models.update(variable, this._where, { returning: true, ...options });
                if (!help.empty(call)) {
                    call = await this._models.findOne(this._where)
                    status = 'update'
                } else {
                    status = 'create'
                    if (help.empty(await this._models.findOne(this._where))) {

                        call = await this._models.create(variable, { ...options })
                        let other = help.only(call.dataValues, this._models.primaryKeyAttributes)
                        // call = await this._models.findOne({
                        //     where: other
                        // })
                    } else {
                        call = await this._models.findOne(this._where)
                    }
                }
            } else {
                call = await this._models.create(variable, { returning: true, ...options })
                let other = help.only(call.dataValues, this._models.primaryKeyAttributes)
                status = 'create'
                call = await this._models.findOne({
                    where: other
                })
            }

            if (t) {
                await t.commit();
            }
            if (help.empty(showStatus)) {
                return call;
            } else {
                return { status: status, data: call };
            }
        } catch (e) {
            if (t) {
                await t.rollback();
            } else {
                throw e
            }
        }


    }

    async delete($config = {}) {
        var attributes = this.getAttributes();
        var variable = help.only(this, attributes)
        var call = {}

        if (!_.isEmpty(this._where)) {
            $config = await _.merge(this._where, $config)
        }
        if (!help.empty($config)) {
            call = await this._models.destroy($config, { transaction: this._transaction });
        }

        return call;
    }

    /**
    * @param {Model} Model - name Model.
    */
    model($model) {
        this._models = seq.models[$model];
        return this;
    }
    _relationship($with, $oldModel = '') {
        var call = {}
            , key = ''
            , val = {}
            , $data = {}
        if (typeof $with == 'function') {
            if (!help.empty(Object.keys($with.call(this, {})))) {
                call = $with.call(this, {})
            }
        } else if (typeof $with == 'object') {
            if (_.isArray($with)) {
                for (let index = 0; index < $with.length; index++) {
                    let $objectKey = _.head(Object.keys($with[index]))
                    call[$objectKey] = help.filter(_.concat(call[$objectKey], $with[index][$objectKey]))

                    //   call = _.concat($with[index])
                }
            } else if (_.isObject($with)) {
                call = $with
            }
        }
        if (!help.empty(call)) {
            if (!help.empty(call.belongsTo)) {
                key = _.head(Object.keys(call.belongsTo))
                val = Object.values(call.belongsTo)
                if (val.length == 1) {
                    val = _.head(val)
                    if (!help.empty(val.model)) {
                        key = val.model
                    }
                    $data = _.concat($data, this.belongsTo(key, val, $oldModel));
                } else if (val.length > 1) {
                    for (let index = 0; index < val.length; index++) {
                        if (!help.empty(val[index].model)) {
                            key = val[index].model
                        }
                        $data = _.concat($data, this.belongsTo(key, val[index], $oldModel));
                    }
                }
                // return this.belongsTo(key,val,$oldModel)
            }
            if (!help.empty(call.hasMany)) {
                key = _.head(Object.keys(call.hasMany))
                val = Object.values(call.hasMany)
                if (val.length == 1) {
                    val = _.head(val)
                    if (!help.empty(val.model)) {
                        key = val.model
                    }
                    $data = _.concat($data, this.hasMany(key, val, $oldModel));
                } else if (val.length > 1) {
                    for (let index = 0; index < val.length; index++) {
                        if (!help.empty(val[index].model)) {
                            key = val[index].model
                        }
                        $data = _.concat($data, this.hasMany(key, val[index], $oldModel));
                    }
                }
                // return this.hasMany(key,val,$oldModel)
            }
            if (!help.empty(call.hasOne)) {
                key = _.head(Object.keys(call.hasOne))
                val = Object.values(call.hasOne)
                if (val.length == 1) {
                    val = _.head(val)
                    if (!help.empty(val.model)) {
                        key = val.model
                    }
                    $data = _.concat($data, this.hasOne(key, val, $oldModel));
                } else if (val.length > 1) {
                    for (let index = 0; index < val.length; index++) {
                        if (!help.empty(val[index].model)) {
                            key = val[index].model
                        }
                        $data = _.concat($data, this.hasOne(key, val[index], $oldModel));
                    }
                }
                // return this.hasOne(key,val,$oldModel)
            }
            if (!help.empty(call.belongsToMany)) {
                key = _.head(Object.keys(call.belongsToMany))
                val = Object.values(call.belongsToMany)
                if (val.length == 1) {
                    val = _.head(val)
                    if (!help.empty(val.model)) {
                        key = val.model
                    }
                    $data = _.concat($data, this.belongsToMany(key, val, $oldModel));
                } else if (val.length > 1) {
                    for (let index = 0; index < val.length; index++) {
                        if (!help.empty(val[index].model)) {
                            key = val[index].model
                        }
                        $data = _.concat($data, this.belongsToMany(key, val[index], $oldModel));
                    }
                }
                // return this.belongsToMany(key,val,$oldModel)
            }
            $data = help.filter($data);

        }
        return $data;
    }
    _relationship_option($model, $option = {}, $oldModel = null, $condition = null) {
        try {
            var now = this._now;
            var name_model = '';
            if (!help.empty($option.model)) {
                var $_model = seq.models[$option.model];
                name_model = $option.model
            } else {
                var $_model = seq.models[$model];
                name_model = $model
            }
            try {
                var rawAttributes = $_model.rawAttributes
            }
            catch (error) {
                if (help.empty($_model)) {
                    console.log(`model "${name_model}" not existe`);
                }
                console.error($_model, error);
                // expected output: ReferenceError: nonExistentFunction is not defined
                // Note - error messages will vary depending on browser
            }
            var keys = (Object.keys(rawAttributes))
                , type = _.merge(_.map(rawAttributes, (r, k) => {
                    return rawAttributes[k].type.key
                })),
                attributes = _.zipObject(keys, type)

            var $_setModel = {}
            var $_setQuery = {}
            if (!_.isEmpty($option.foreignKey)) {
                $_setModel['foreignKey'] = $option.foreignKey
            } else {
                if (help.empty($oldModel)) {

                    if (!help.empty($condition)) {
                        if ($condition == 'belongsTo') {
                            $_setModel['foreignKey'] = !help.empty($_model.primaryKeyAttributes) ? _.head($_model.primaryKeyAttributes) : $_model.getTableName() + 'Id';
                        } else if ($condition == 'hasMany') {
                            $_setModel['foreignKey'] = !help.empty(this._models.primaryKeyAttributes) ? _.head(this._models.primaryKeyAttributes) : this._models.getTableName() + 'Id';
                        } else if ($condition == 'hasOne') {
                            $_setModel['foreignKey'] = !help.empty(this._models.primaryKeyAttributes) ? _.head(this._models.primaryKeyAttributes) : this._models.getTableName() + 'Id';
                        }
                    }
                } else {
                    var $_oldModel = seq.models[$oldModel]
                    if (!help.empty($condition)) {
                        if ($condition == 'belongsTo') {
                            $_setModel['foreignKey'] = !help.empty($_model.primaryKeyAttributes) ? _.head($_model.primaryKeyAttributes) : $_model.getTableName() + 'Id';
                        } else if ($condition == 'hasMany') {
                            $_setModel['foreignKey'] = !help.empty($_oldModel.primaryKeyAttributes) ? _.head($_oldModel.primaryKeyAttributes) : $_oldModel.getTableName() + 'Id';
                        } else if ($condition == 'hasOne') {
                            $_setModel['foreignKey'] = !help.empty($_oldModel.primaryKeyAttributes) ? _.head($_oldModel.primaryKeyAttributes) : $_oldModel.getTableName() + 'Id';
                        }
                    }
                }
            }
            if (!_.isSet($option.through)) {
                $_setModel['through'] = $option.through
            }
            if (!_.isSet($option.sourceKey)) {
                $_setModel['sourceKey'] = $option.sourceKey //hasMany hasOne
            }
            if (!_.isSet($option.targetKey)) {
                $_setModel['targetKey'] = $option.targetKey //belongsTo
            }

            $_setQuery['model'] = $_model
            if (!_.isEmpty($option.as)) {
                /*/
                $_setModel['as']=$option.as
                $_setQuery['as']=$option.as
                /*/
                let model_to = {}

                let model_as = {}
                    , asKeys = $option.as + now
                    , asVals = $option.as
                if ($condition == 'belongsToMany') {
                    $_setModel['as'] = asVals
                    $_setQuery['as'] = asVals
                } else {
                    $_setModel['as'] = asKeys
                    $_setQuery['as'] = asKeys
                }
                model_as[asKeys] = asVals;
                model_to[asVals] = $_model;
                this._glob = _.merge(this._glob, { model_as: [model_as] })

                this._glob = _.merge(this._glob, { model: [model_to] })
                if (!_.isEmpty($option.default)) {
                    let as_default = {}
                    if (typeof $option.default == 'string') {
                        if (help.testJSON($option.default)) {
                            as_default[asKeys] = JSON.parse($option.default)
                        } else {
                            as_default[asKeys] = $option.default
                        }
                    } else {
                        as_default[asKeys] = $option.default
                    }
                    this._as_default = _.merge(this._as_default, as_default)
                }

                //*/
            }

            if (!_.isSet($option.required)) {
                $_setQuery['required'] = $option.required
            }

            var $_attributes = $option.attributes || null
            $_attributes = $option.select || null
            if (!help.empty($_attributes)) {
                $_setQuery['attributes'] = $_attributes
            } else if (!_.isNull($_attributes)) {
                $_setQuery['attributes'] = $_attributes
            }

            // if (!help.empty($option.attributes)) {
            //     $_setQuery['attributes'] = $option.attributes
            // }
            // if (!help.empty($option.select)) {
            //     $_setQuery['attributes'] = $option.select
            // }
            if (!_.isSet($option.except)) {
                var rawAttributes = $_model.rawAttributes
                    , keyAttributes = Object.keys(rawAttributes);
                if (_.isArray($option.except)) {
                    if (!help.empty($_setQuery['attributes'])) {
                        $attributes = _.merge($_setQuery['attributes'], keyAttributes);
                        $_setQuery['attributes'] = help.except($attributes, $option.except);
                    } else {
                        $_setQuery['attributes'] = help.except(keyAttributes, $option.except);
                    }
                }
                $_setModel['through'] = $option.through
            }

            if (!_.isSet($option.through)) {
                $_setQuery['through'] = $option.through
            }
            if (!_.isSet($option.paranoid)) {
                $_setQuery['paranoid'] = $option.paranoid
            }

            if (!_.isEmpty($option.where)) {
                $_setQuery['where'] = $option.where
            }
            if (!_.isEmpty($option.search)) {

                var keysAttr = Object.keys(attributes)
                    , AttrAt = []
                if (!_.isEmpty($option.searchAttributes)) {
                    if (_.isString($option.searchAttributes)) {
                        if (help.testJSON($option.searchAttributes)) {
                            AttrAt = JSON.parse($option.searchAttributes)
                        } else {
                            AttrAt = $option.searchAttributes.split(',')
                        }
                    }
                    if (!help.empty(AttrAt)) {
                        keysAttr = help.only(keysAttr, AttrAt)
                    }
                }
                attributes = help.filter(attributes, (val, key) => {
                    return _.indexOf(keysAttr, key) >= 0
                })
                var search = searchBuilder($option.search, keysAttr)
                    , where_search = {}
                where_search['$or'] = search

                $_setQuery['where'] = _.merge(!help.empty($_setQuery['where']) ? $_setQuery['where'] : {}, where_search)
            }
            if (!help.empty($option.with)) {
                if (typeof $option.with == 'function' || typeof $option.with == 'object') {

                    let relationship = this._relationship($option.with, $model)
                    if (!help.empty(relationship)) {
                        $_setQuery = _.merge($_setQuery, { include: relationship });
                    }
                }
            }
            if (
                !_.isEmpty($option.belongsTo) || !_.isEmpty($option.belongs_to) ||
                !_.isEmpty($option.hasMany) || !_.isEmpty($option.has_many) ||
                !_.isEmpty($option.hasOne) || !_.isEmpty($option.has_one) ||
                !_.isEmpty($option.belongsToMany) || !_.isEmpty($option.belongs_to_many)
            ) {
                var relationships = _.filter(Object.keys($option), (relation) => {
                    return _.indexOf(['belongsTo', 'hasMany', 'hasOne', 'belongsToMany', 'belongs_to', 'has_many', 'has_one', 'belongs_to_many'], relation) >= 0;
                })

                for (let indexRelationShip = 0; indexRelationShip < relationships.length; indexRelationShip++) {
                    var relationship = $option[relationships[indexRelationShip]];


                    var relationshipTo = relationship
                        , relationshipCon = _.camelCase(relationships[indexRelationShip]);

                    if (_.isPlainObject(relationshipTo)) {
                        let relatsTo = {}
                        relatsTo[relationshipCon] = $option[relationshipCon]
                        let relationships = this._relationship(relatsTo, $model)
                        if (!help.empty(relationships)) {
                            if (help.empty($_setQuery.include)) {
                                $_setQuery.include = relationships
                            } else {
                                $_setQuery.include = help.merge($_setQuery.include, relationships)
                            }
                        }
                    } else if (_.isArray(relationshipTo)) {
                        for (let indexBelongTo = 0; indexBelongTo < relationshipTo.length; indexBelongTo++) {
                            let relationships = []
                            for (let index = 0; index < $option[relationshipCon].length; index++) {

                                let RelatsTo = {}
                                RelatsTo[relationshipCon] = $option[relationshipCon][index]
                                relationships = _.concat(relationships, this._relationship(RelatsTo, $model))
                            }
                            relationships = help.filter(relationships);
                            if (!help.empty(relationships)) {
                                if (help.empty($_setQuery.include)) {
                                    $_setQuery.include = relationships
                                } else {
                                    $_setQuery.include = help.merge($_setQuery.include, relationships)
                                }
                            }

                        }
                    }

                }
            }
            return {
                setQuery: $_setQuery,
                setModel: $_setModel
            }
        }
        catch (error) {
            console.error(error);
        }


    }
    /**
    * @param {string} Model - name Model ที้ต้องการเชื่อมความสัมพันด้วย.
    * @param {Object} option - ต้องค่าการเชื่อมโยง
    * @example 
     .belongsTo('model',{ "foreignKey": 'id อ้างอิง' , 'as':'ชื้อที่ต้องการแสดง' ,"required": false })
    * @memberof model
    */
    belongsTo($model, $option = {}, $oldModel = null) {
        var $_model = seq.models[$model];
        var $_setOption = this._relationship_option($model, $option, $oldModel, 'belongsTo')
        var $_setModel = $_setOption.setModel
        var $_setQuery = $_setOption.setQuery
        try {
            if (!help.empty($oldModel)) {
                var $setModel = seq.models[$oldModel];
                $setModel.belongsTo($_model, $_setModel)
            } else {
                this._models.belongsTo($_model, $_setModel)
            }
        } catch (e) { }

        if (!help.empty($_setQuery.as)) {
            if (help.empty(this._as_default[$_setQuery.as])) {
                this._as_default[$_setQuery.as] = {}
            }
        }

        if (!help.empty($oldModel)) {
            return $_setQuery;
        } else {
            this._include['include'] = _.concat(this._include['include'], [$_setQuery])
            return this;
        }
    }
    /**
    * @param {string} Model - name Model ที้ต้องการเชื่อมความสัมพันด้วย.
    * @param {Object} option - ต้องค่าการเชื่อมโยง
    * @example 
     .hasMany('model',{ "foreignKey": 'id อ้างอิง' , 'as':'ชื้อที่ต้องการแสดง' ,"required": false })
    * @memberof model
    */
    hasMany($model, $option = {}, $oldModel = null) {
        var $_model = seq.models[$model];
        var $_setOption = this._relationship_option($model, $option, $oldModel, 'hasMany')
        try {
            var $_setModel = $_setOption.setModel
        } catch (error) {
            console.error($model)
        }

        var $_setQuery = $_setOption.setQuery

        try {
            if (!help.empty($oldModel)) {
                var $setModel = seq.models[$oldModel];
                $setModel.hasMany($_model, $_setModel)
            } else {
                this._models.hasMany($_model, $_setModel)
            }
        } catch (e) { }

        if (!help.empty($_setQuery.as)) {
            if (help.empty(this._as_default[$_setQuery.as])) {
                this._as_default[$_setQuery.as] = []
            }
        }
        if (!help.empty($oldModel)) {
            return $_setQuery;
        } else {
            this._include['include'] = _.concat(this._include['include'], [$_setQuery])
            return this;
        }
    }
    /**
    * @param {string} Model - name Model ที้ต้องการเชื่อมความสัมพันด้วย.
    * @param {Object} option - ต้องค่าการเชื่อมโยง
    * @example 
     .hasMany('model',{ "foreignKey": 'id อ้างอิง' , 'as':'ชื้อที่ต้องการแสดง' ,"required": false })
    * @memberof model
    */
    hasOne($model, $option = {}, $oldModel = null) {
        var $_model = seq.models[$model];
        var $_setOption = this._relationship_option($model, $option, $oldModel, 'hasOne')
        var $_setModel = $_setOption.setModel
        var $_setQuery = $_setOption.setQuery
        try {
            if (!help.empty($oldModel)) {
                var $setModel = seq.models[$oldModel];
                $setModel.hasOne($_model, $_setModel)
            } else {
                this._models.hasOne($_model, $_setModel)
            }
        } catch (e) { }
        if (!help.empty($_setQuery.as)) {
            if (help.empty(this._as_default[$_setQuery.as])) {
                this._as_default[$_setQuery.as] = {}
            }
        }
        if (!help.empty($oldModel)) {
            return $_setQuery;
        } else {
            this._include['include'] = _.concat(this._include['include'], [$_setQuery])
            return this;
        }
    }

    belongsToMany($model, $option = {}, $oldModel = null) {
        var $_model = seq.models[$model];
        var $_setOption = this._relationship_option($model, $option, $oldModel, 'belongsToMany')
        var $_setModel = $_setOption.setModel
        var $_setQuery = $_setOption.setQuery
        // try {
        if (!help.empty($oldModel)) {
            var $setModel = seq.models[$oldModel];
            $_model.belongsToMany($setModel, $_setModel)
            $setModel.belongsToMany($_model, $_setModel)
        } else if ($_setModel.sourceKey) {
            this._models.belongsToMany($_model, $_setModel)
        }
        // } catch (e) {
        //     console.log(e);

        //  }
        if (!help.empty($_setQuery.as)) {
            if (help.empty(this._as_default[$_setQuery.as])) {
                this._as_default[$_setQuery.as] = {}
            }
        }
        if (!help.empty($oldModel)) {
            return $_setQuery;
        } else {
            this._include['include'] = _.concat(this._include['include'], [$_setQuery])
            return this;
        }
    }
    /**
    * @param {Array} select - field ที่ต้องการ
    * @example 
     .select(["id","old","name"])
    * @memberof model
    */
    select($select = [], $check = true) {
        if (!help.empty($select)) {
            var tbName = this._models.name
            var Attributes = this.getAttributes()
            if ($check) {
                $select = help.filter($select, r => {
                    if (typeof r == 'object') {
                        if (typeof _.head(r) == 'string') {
                            return _.indexOf(Attributes, _.head(r)) >= 0
                        } else if (typeof _.head(r) == 'object') {
                            return true
                        }
                    } else {
                        return _.indexOf(Attributes, r) >= 0
                    }
                })
            }
            this._attributes = { attributes: $select };
        }
        return this
    }
    /**
    * @param {Array} selectAdd - field ที่ต้องการ
    * @example
     .selectAdd(["id","old","name"])
    * @memberof model
    */
    selectAdd($select = []) {
        if (!help.empty($select)) {
            var Attributes = this.getAttributes()
            if (help.empty(help.get(this._attributes, 'attributes', []))) {
                this._attributes.attributes = Attributes
            }
            this._attributes = { attributes: _.concat(help.get(this._attributes, 'attributes', []), $select) };
        }
        return this
    }
    /**
    * @param {Array} except - field ที่ไม่ต้องการ
    * @example 
     .except(["createdAt","updatedAt"])
    * @memberof model
    */
    except($except = []) {
        if (!help.empty($except)) {
            var tbName = this._models.name
            var Attributes = this.getAttributes()

            if (!help.empty(this._attributes.attributes)) {
                this._attributes.attributes = _.merge(this._attributes.attributes, Attributes)
                this._attributes.attributes = help.except(this._attributes.attributes, $except)
            } else {
                this._attributes = { attributes: help.except(Attributes, $except) }
            }
        }
        return this
    }
    /**
    * @param {Array} select - field ที่ต้องการ
    * @example 
     .attributes(["id","old","name"])
    * @memberof model
    */
    attributes($select = []) {
        if (!help.empty($select)) {
            var tbName = this._models.name
            var Attributes = this.getAttributes()
            $select = help.filter($select, r => {
                return _.indexOf(Attributes, r) >= 0
            })
            this._attributes = { attributes: $select };
        }
        return this
    }
    getAttributes($set = null, $b = false) {
        var rawAttributes = this._models.rawAttributes
            , keys = (Object.keys(rawAttributes))
            , type = _.merge(_.map(rawAttributes, (r, k) => {
                return rawAttributes[k].type.key || rawAttributes[k].type
            }));
        // if ($b) {
        //     return rawAttributes;
        // }

        if (help.empty($set) || $set == null) {
            return keys;
        } else {
            return _.zipObject(keys, type)
        }
    }
    paramsWhere(where, $setting = 'and') {
        if (!help.empty(where)) {
            if (typeof where == 'string') {
                where = where
                    .replace(/<>/g, '$ne')
                    .replace(/>=/g, '$gte')
                    .replace(/>=/g, '$lte')
                    .replace(/>/g, '$gt')
                    .replace(/</g, '$lt');
                if (help.testJSON(where)) {
                    where = JSON.parse(where)
                }
            }
            if (typeof where == 'object') {
                if (_.isPlainObject(where)) {
                    var whereAttribute = help.filter(where, (data, attr) => {
                        if (typeof attr == 'string') {
                            let dot = attr.split('.')
                            return dot.length == 1
                        } else {
                            let attrobj = _.head(Object.keys(attr))
                            let dot = attrobj.split('.')
                            return dot.length == 1
                        }
                    })
                    var whereAttributes = help.filter(where, (data, attr) => {
                        if (typeof attr == 'string') {
                            let dot = attr.split('.')
                            return (dot.length) > 1
                        } else {
                            let attrobj = _.head(Object.keys(attr))
                            let dot = attrobj.split('.')
                            return (dot.length) > 1
                        }
                    })
                    if (!help.empty(whereAttribute)) {
                        this._where = _.merge(this._where, { where: help.only(where, Object.keys(whereAttribute)) })
                    }
                    if (!help.empty(whereAttributes)) {
                        var _glob = this._glob
                        var asModel = function (params) {
                            let ds = _.head(_glob.model_as)
                            ds = help.filter(ds, data => {
                                return data == params;
                            })
                            ds = Object.keys(ds)
                            return ds
                        }
                        whereAttributes = help.map(whereAttributes, (data, attr) => {
                            let attrobj = typeof attr == 'string' ? attr : _.head(Object.keys(attr))

                            var fout = {}
                            let dot = attrobj.split('.')
                            let out = {}
                            let model = help.filter(dot, (r, k) => {
                                return k != (dot.length) - 1
                            })
                            model = _.flatten(_.map(model, r => {
                                return r.split('->')
                            }))
                            model = _.map(model, r => {
                                return !help.empty(asModel(r)) ? _.head(asModel(r.replace("$", ""))) : r.replace("$", "")
                            })
                            model = _.join(model, '->')
                            out.models = model
                            out.model = dot[(dot.length) - 2]
                            out.attrs = _.last(dot)

                            if (!help.empty(data)) {
                                out.query = {}
                                out.query[dot[1]] = data
                            }

                            return out
                        })
                        whereAttributes = _.groupBy(whereAttributes, 'model')
                        var mapWhere = _.mapValues(whereAttributes, (attr, model) => {
                            for (const db of attr) {
                                if (!help.empty(db.query)) {
                                    let set = {}
                                    set[`$${db.models}.${db.attrs.replace("$", "")}$`] = _.head(Object.values(db.query))
                                    let where_query = {}
                                    where_query[`$${$setting}`] = [set]

                                    let chkSetting = help.get(this._where, `where.$${$setting}`, '')
                                    if (!help.empty(chkSetting)) {
                                        this._where.where[`$${$setting}`].push(set)
                                    } else {
                                        this._where = _.merge(this._where, { where: where_query })
                                    }
                                }
                            }
                            return attr
                        })
                    }
                } else {
                    var whereAttribute = help.filter(where, (attr) => {
                        if (typeof attr == 'string') {
                            let dot = attr.split('.')
                            return dot.length == 1
                        } else {
                            let attrobj = _.head(Object.keys(attr))
                            let dot = attrobj.split('.')
                            return dot.length == 1
                        }
                    })
                    var whereAttributes = help.filter(where, (attr) => {
                        if (typeof attr == 'string') {
                            let dot = attr.split('.')
                            return (dot.length) > 1
                        } else {
                            let attrobj = _.head(Object.keys(attr))
                            let dot = attrobj.split('.')
                            return (dot.length) > 1
                        }
                    })
                    if (!help.empty(whereAttribute)) {
                        let keyWhereAttribute = _.map(whereAttribute, r => {
                            return Object.keys(r)
                        })
                        keyWhereAttribute = _.flatten(keyWhereAttribute)
                        if (!help.empty(where)) {

                            for (const where of where) {
                                this._where = _.merge(this._where, { where: help.only(where, keyWhereAttribute) })
                            }
                        }
                    }
                    if (!help.empty(whereAttributes)) {
                        whereAttributes = help.map(whereAttributes, (attr) => {
                            let attrobj = typeof attr == 'string' ? attr : _.head(Object.keys(attr))
                            let data = _.head(Object.values(attr))
                            var fout = {}
                            let dot = attrobj.split('.')
                            let out = {}
                            let model = help.filter(dot, (r, k) => {
                                return k != (dot.length) - 1
                            })
                            model = _.flatten(_.map(model, r => {
                                return r.split('->')
                            }))
                            model = _.map(model, r => {
                                return !help.empty(asModel(r)) ? _.head(asModel(r.replace("$", ""))) : r.replace("$", "")
                            })
                            model = _.join(model, '->')
                            out.models = model
                            out.model = dot[(dot.length) - 2]
                            out.attrs = _.last(dot)

                            if (!help.empty(data)) {
                                out.query = {}
                                out.query[dot[1]] = data
                            }

                            return out
                        })
                        whereAttributes = _.groupBy(whereAttributes, 'model')
                        var mapWhere = _.mapValues(whereAttributes, (attr, model) => {
                            for (const db of attr) {
                                let set = {}
                                set[`$${db.models}.${db.attrs.replace("$", "")}$`] = _.head(Object.values(db.query))
                                let where_query = {}
                                where_query[`$${$setting}`] = [set]
                                this._where = _.merge(this._where, { where: where_query })
                            }
                            return attr
                        })
                    }
                }

            }
        }
        return this
    }
    /**
    * @param {Object} params
    * @param {Array} option
    * @example 
     .params({Object}) # full
     .params({Object},['limit','page','order']) # select option
     .params({Object},{is:['limit','page','order']}) # select option
     .params({Object},{not:['relationships','select','where']}) # select except option
    * @memberof model
    */
    params(params, option = ['relationships', 'limit', 'select', 'offset', 'search', 'filter', 'where', 'page', 'order']) {
        if (_.isPlainObject(option)) {
            var newOption = ['relationships', 'limit', 'select', 'offset', 'search', 'filter', 'where', 'page', 'order']
            for (const [key, value] of Object.entries(option)) {
                if (key == 'not' || key == 'except' || key == '!') {
                    newOption = help.except(newOption, value)
                } else if (key == 'active' || key == 'is') {
                    newOption = help.only(newOption, value)
                }
            }
            option = newOption;
        }
        if (_.indexOf(option, 'relationships') >= 0) {
            if (
                !_.isEmpty(params.belongsTo) || !_.isEmpty(params.belongs_to) ||
                !_.isEmpty(params.hasMany) || !_.isEmpty(params.has_many) ||
                !_.isEmpty(params.hasOne) || !_.isEmpty(params.has_one) ||
                !_.isEmpty(params.belongsToMany) || !_.isEmpty(params.belongs_to_many)
            ) {
                var relationships = _.filter(Object.keys(params), (relation) => {
                    return _.indexOf(['belongsTo', 'hasMany', 'hasOne', 'belongsToMany', 'belongs_to', 'has_many', 'has_one', 'belongs_to_many'], relation) >= 0;
                })
                for (let indexRelationShip = 0; indexRelationShip < relationships.length; indexRelationShip++) {
                    var relationship = params[relationships[indexRelationShip]];

                    if (help.testJSON(relationship)) {
                        var relationshipTo = JSON.parse(relationship)
                            , relationshipCon = _.camelCase(relationships[indexRelationShip]);
                        if (_.isObject(relationshipTo) && !_.isArray(relationshipTo)) {
                            let keyBelongsTo = Object.keys(relationshipTo)
                                , varBelongsTo = Object.values(relationshipTo)
                            for (let index = 0; index < keyBelongsTo.length; index++) {
                                let keyBelongs = keyBelongsTo[index];
                                let varBelongs = varBelongsTo[index];
                                if (!help.empty(varBelongs.model)) {
                                    keyBelongs = varBelongs.model
                                }
                                this[relationshipCon](keyBelongs, varBelongs)
                            }
                        } else if (_.isArray(relationshipTo)) {
                            for (let indexBelongTo = 0; indexBelongTo < relationshipTo.length; indexBelongTo++) {
                                let belongs_to = relationshipTo[indexBelongTo];
                                let keyBelongsTo = Object.keys(belongs_to)
                                    , varbelongsTo = Object.values(belongs_to)
                                    , chechVarbelongs = _.head(_.uniq(_.map(varbelongsTo, (vars) => {
                                        return _.isPlainObject(vars)
                                    })))

                                if (chechVarbelongs) {
                                    for (let index = 0; index < keyBelongsTo.length; index++) {
                                        let keyBelongs = keyBelongsTo[index];
                                        let varBelongs = varbelongsTo[index];

                                        if (!help.empty(varBelongs.model)) {
                                            keyBelongs = varBelongs.model
                                        }
                                        this[relationshipCon](keyBelongs, varBelongs)
                                    }
                                } else {
                                    if (!help.empty(belongs_to.model)) {
                                        let keyBelongs = belongs_to.model
                                        this[relationshipCon](keyBelongs, belongs_to)
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }

        if (_.indexOf(option, 'select') >= 0) {
            if (!_.isEmpty(params.select)) {
                var select = []
                var attributes = this.getAttributes()
                select = help.reqJsonConverte(params.select)
                select = _.map(select, r => {
                    if (/ |=/.test(r)) {
                        let as = _.last(r.split('='))
                        let param = `concat(${(_.head(r.split('='))).split(' ').join(",' ',")})`
                        r = [param, as]
                    }
                    return r
                })
                let selectAs = _.filter(select, s => typeof s == 'object')

                let relate = help.filter(select, s => {
                    if (typeof s == 'string') {
                        return (s.split('.')).length >= 2
                    } else {
                        try {
                            return (_.head(s).split('.')).length >= 2
                        } catch (error) {
                            return true;
                        }
                    }
                })
                for (let index = 0; index < relate.length; index++) {
                    var element = (relate[index])
                    if (typeof element == 'string') {
                        element = element.split('.');
                        var keyAs = _.head(element)
                        var attAs = _.last(element)
                        var $include = help.filter(this._include.include, inc => {
                            let AS = help.get(inc, 'as', inc.model)
                            if (typeof AS == 'function') {
                                AS = AS.tableName
                            }
                            AS = (AS).replace(`${this._now}`, '', AS)
                            return AS == keyAs
                        })

                        for (const inc of $include) {
                            inc.attributes = _.uniq(_.concat(inc.attributes, attAs))
                        }
                    }
                }

                if (!help.empty(select)) {
                    select = _.map(select, attr => {
                        if (_.isPlainObject(attr)) {
                            let keys = _.head(Object.keys(attr))
                            let vals = _.head(Object.values(attr))
                            attr = [keys, vals]
                        }
                        return attr
                    })
                    select = help.filter(select, attr => {

                        if (_.isArray(attr)) {
                            return _.indexOf(attributes, _.head(attr)) >= 0;
                        } else {
                            return _.indexOf(attributes, attr) >= 0;
                        }
                        return false
                    })
                    if (_.isArray(select)) {
                        this._attributes.attributes = select
                        // this._attributes.attributes = help.filter(help.unique(_.concat(this._attributes.attributes, select)))

                    }
                }
                if (!help.empty(selectAs)) {
                    // exam data "name+lastname=fullname"
                    this.selectAdd(selectAs)
                }
            }
        }

        if (_.indexOf(option, 'search') >= 0) {
            if (!help.empty(params.search)) {
                var attributes = this.getAttributes(1)
                    , keysAttr = Object.keys(attributes)
                    , AttrAt = []
                if (!help.empty(params.searchAttr)) {
                    params.searchAttributes = params.searchAttr
                    delete params.searchAttr
                }
                if (!_.isEmpty(params.searchAttributes)) {
                    if (_.isString(params.searchAttributes)) {
                        if (help.testJSON(params.searchAttributes)) {
                            AttrAt = JSON.parse(params.searchAttributes)
                        } else {
                            AttrAt = params.searchAttributes.split(',')
                        }
                    }
                    if (!help.empty(AttrAt)) {
                        keysAttr = help.only(keysAttr, AttrAt)
                    }
                }
                attributes = help.filter(attributes, (val, key) => {
                    return _.indexOf(keysAttr, key) >= 0
                })

                var model_as_search = _.chain(this._glob.model_as).map(ret => {
                    return _.values(ret);
                }).values()
                model_as_search = _.flatten(JSON.parse(JSON.stringify(model_as_search)));

                var searchAttribute = []
                var searchAttributes = []
                if (!help.empty(params.searchAttributes)) {
                    params.searchAttributes = typeof params.searchAttributes === 'string' ? JSON.parse(params.searchAttributes) : params.searchAttributes;
                    searchAttribute = help.filter(params.searchAttributes, attr => {
                        if (typeof attr == 'string') {
                            let dot = attr.split('.')
                            return dot.length == 1
                        } else {
                            let attrobj = _.head(Object.keys(attr))
                            let dot = attrobj.split('.')
                            return dot.length == 1
                        }

                    })
                    searchAttributes = help.filter(params.searchAttributes, attr => {
                        if (typeof attr == 'string') {
                            let dot = attr.split('.')
                            return dot.length > 1
                        } else {
                            let attrobj = _.head(Object.keys(attr))
                            let dot = attrobj.split('.')
                            return dot.length > 1
                        }
                    })
                }
                if (!help.empty(searchAttribute) || help.empty(params.searchAttributes)) {
                    let AttributesSearch = help.empty(params.searchAttributes) ? help.except(keysAttr, ["createdAt", "updatedAt"]) : params.searchAttributes
                    var search = searchBuilder(params.search, AttributesSearch)
                    var where_search = {}
                    where_search['$or'] = search
                    this._where = _.merge(this._where, { where: where_search })
                }

                if (!help.empty(searchAttributes)) {
                    searchAttributes = help.map(searchAttributes, attr => {
                        let attrobj = typeof attr == 'string' ? attr : _.head(Object.keys(attr))

                        var fout = {}
                        let dot = attrobj.split('.')
                        let out = {}
                        out.model = dot[0]
                        out.attrs = dot[1]
                        if (typeof attr != 'string') {
                            out.required = _.head(Object.values(attr))
                        }
                        return out
                    })
                    searchAttributes = _.groupBy(searchAttributes, 'model')
                    // searchAttributes = _.mapValues(searchAttributes,model=>{
                    //     return help.pluck(model,'attrs')
                    // })

                    _.mapValues(searchAttributes, (attr, model) => {
                        var _glob = this._glob
                            , asModel = function (params) {
                                let ds = _.head(_glob.model_as)
                                ds = help.filter(ds, data => {
                                    return data == params;
                                })
                                ds = Object.keys(ds)
                                return ds
                            }
                        var isModel = _.head(asModel(model))
                            , include = _.map(help.filter(this._include['include'], include => {
                                return include.as == isModel
                            }), inc => {
                                let getAttr = help.pluck(attr, 'attrs')
                                let required = _.uniq(help.pluck(attr, 'required'))
                                let where = _.get(inc, 'where', {});
                                let attributes = _.get(inc, 'attributes', []);

                                let search = searchBuilder(params.search, help.except(getAttr, ["createdAt", "updatedAt"]))
                                    , where_search = {}
                                where_search['$or'] = search
                                inc.where = _.merge(where, where_search)
                                if (!help.empty(required)) {
                                    if (required.length == 1) {
                                        inc.required = _.head(required)
                                    }
                                }
                                return inc
                            })
                    })

                }

            }
        }
        if (_.indexOf(option, 'filter') >= 0) {
            if (!help.empty(params.filter)) {
                if (typeof params.filter == 'string') {
                    if (help.testJSON(params.filter)) {
                        params.filter = JSON.parse(params.filter)
                    }
                }
                if (typeof params.filter == 'object') {
                    if (_.isPlainObject(params.filter)) {

                        var filterAttribute = help.filter(params.filter, (data, attr) => {
                            if (typeof attr == 'string') {
                                let dot = attr.split('.')
                                return dot.length == 1
                            } else {
                                let attrobj = _.head(Object.keys(attr))
                                let dot = attrobj.split('.')
                                return dot.length == 1
                            }
                        })
                        var filterAttributes = help.filter(params.filter, (data, attr) => {
                            if (typeof attr == 'string') {
                                let dot = attr.split('.')
                                return (dot.length) > 1
                            } else {
                                let attrobj = _.head(Object.keys(attr))
                                let dot = attrobj.split('.')
                                return (dot.length) > 1
                            }
                        })
                        if (!help.empty(filterAttribute)) {
                            let data = _.mapValues(filterAttribute, (fa, index) => {
                                var search = searchBuilder(fa, [index])
                                var where_search = {}
                                where_search['$or'] = search
                                this._where = _.merge(this._where, { where: where_search })

                                let query = {}
                                let re = new RegExp("^([%])|([%])$");
                                if (re.test(`${fa}`)) {
                                    query["$like"] = `${fa}`
                                } else {
                                    query["$like"] = `%${fa}%`
                                }
                                return query
                            })
                        }
                        if (!help.empty(filterAttributes)) {
                            let data = _.mapValues(filterAttributes, (fa, index) => {
                                var _glob = this._glob
                                    , asModel = function (params) {
                                        let ds = _.head(_glob.model_as)
                                        ds = help.filter(ds, data => {
                                            return data == params;
                                        })
                                        ds = Object.keys(ds)
                                        return ds
                                    }
                                var attr = JSON.parse(JSON.stringify(_.chain(index.split('.')).map(key => {
                                    if (!help.empty(asModel(key))) {
                                        return _.head(asModel(key))
                                    } else {
                                        return key
                                    }
                                }).values()))
                                attr = _.join(attr, '.')
                                var search = searchBuilder(fa, [`$${attr}$`])
                                var where_search = {}
                                where_search['$or'] = search
                                this._where = _.merge(this._where, { where: where_search })

                                let query = {}
                                let re = new RegExp("^([%])|([%])$");
                                if (re.test(`${fa}`)) {
                                    query["$like"] = `${fa}`
                                } else {
                                    query["$like"] = `%${fa}%`
                                }
                                return query
                            })
                        }
                    }
                }
            }
        }
        if (_.indexOf(option, 'where') >= 0) {
            if (!help.empty(params.where)) {
                this.paramsWhere(params.where)
            }
        }
        if (_.indexOf(option, 'limit') >= 0) {
            if (!_.isEmpty(params.limit)) {
                this._params.limit = parseInt(params.limit)
            }
        }
        if (_.indexOf(option, 'offset') >= 0) {
            if (!_.isEmpty(params.offset)) {
                this._params.offset = parseInt(params.offset)
            }
        }
        if (_.indexOf(option, 'offset') >= 0) {
            if (!_.isEmpty(params.page)) {
                if (help.empty(this._params.limit)) {
                    this._params.limit = 15;
                }
                var page = 0
                if (parseInt(params.page) == 1) {
                    page = (parseInt(params.page) - 1)
                } else {
                    page = parseInt(params.page)
                }
                this._current_page = parseInt(params.page)
                this._params.offset = ((this._params.limit * page) - this._params.limit)
                if (this._params.offset < 0) {
                    this._params.offset = 0
                }
            }
        }
        if (_.indexOf(option, 'order') >= 0) {
            if (!_.isEmpty(params.order)) {
                var order = params.order || [['updatedAt', 'desc'], ['createdAt', 'desc']]
                var tbName = this._models.name
                if (typeof order == 'string') {
                    if (help.testJSON(order)) {
                        var __order = JSON.parse(order);
                        this.orderBy(__order, 'ASC', true)
                    }
                }
            }
            if (!_.isEmpty(help.get(params, 'order_by', help.get(params, 'orderBy', '')))) {
                params.order_by = help.get(params, 'order_by', help.get(params, 'orderBy', ['-updatedAt']))
                params.order_by = help.reqJsonConverte(params.order_by)

                this.orderBy(params.order_by.map(o => /^\-/gmi.test(o) ? [o.replace(/^\-/, ''), 'desc'] : [o, 'asc']))
            }
        }
        return this
    }
    /**
    * @param {Integer} id - filter ด้วย id primary ของตาราง
    * @example 
     .find(1)
    * @memberof model
    */
    find($identity = null) {
        if (!help.empty($identity)) {
            if (typeof $identity != 'object') {
                const where = {}
                where[_.head(this._models.primaryKeyAttributes)] = $identity
                this._where = _.merge(this._where, { where: where })
            } else {
                const where = {}
                    , query = {}
                    , $operation = '$in'
                query[$operation] = $identity
                where[_.head(this._models.primaryKeyAttributes)] = query
                this._where = _.merge(this._where, { where: where })
            }
        }
        return this
    }
    latest($attr = null) {
        var Attributes = this.getAttributes()
            , $identity = this._models.primaryKeyAttributes
        if (help.empty($attr)) {
            $attr = _.indexOf(Attributes, 'createdAt') >= 0 ? 'createdAt' : $identity;
        } else if (_.indexOf(Attributes, $attr) < 0) {
            $attr = _.indexOf(Attributes, 'createdAt') >= 0 ? 'createdAt' : $identity;
        }
        var $order = _.concat(this._params.order, [[$attr, 'desc']])

        $order = help.filter($order)
        $order = _.mapValues($order, order => {
            var dat = {}
            dat[order[1]] = order[0]
            return dat
        })
        $order = help.unique($order, uniq => {
            if (!help.empty(uniq.asc)) {
                return uniq.asc
            } else if (!help.empty(uniq.ASC)) {
                return uniq.ASC
            } else if (!help.empty(uniq.desc)) {
                return uniq.desc
            } else if (!help.empty(uniq.DESC)) {
                return uniq.DESC
            }
        })
        $order = _.mapValues(order => {
            return [_.head(Object.values(order)), _.head(Object.keys(order))]
        })
        this._params.order = $order;

        return this
    }
    /**
* Pagination.
*
* @param {order} [Options]- Options to order query.
* @example
* MyModel.orderBy("id","asc")
* MyModel.orderBy({"id":"asc"})
* MyModel.orderBy([{"id":"asc"}])
* MyModel.orderBy([["id","asc"]])
* @memberof Model
*/
    orderBy($attr = null, $operation = 'ASC', $isParam = false) {
        // if (Array.isArray($attr)) {
        //     let checkList = help.filter($attr, atr => {
        //         return Array.isArray(atr)
        //     })
        //     if (!help.empty(checkList)) {
        //         this._order = _.filter(_.merge(_.result(this, '_order', []), checkList))
        //         return this;
        //     }
        // }
        if (!help.empty($attr)) {
            var Attributes = this.getAttributes()
            var $order = []
            if (_.isArray($attr)) {
                if (_.isArray(_.head(Object.values($attr)))) {
                    $order = $attr
                }
                else if (_.isObject(_.head(Object.values($attr)))) {
                    $order = _.flatten(_.values(_.mapValues($attr, order => {
                        let _order = []
                        let ObjKeys = Object.keys(order)
                        let ObjValues = Object.values(order)
                        for (let index = 0; index < ObjKeys.length; index++) {
                            const elementKeys = ObjKeys[index];
                            const elementValues = ObjValues[index];
                            _order.push([elementKeys, elementValues])
                        }
                        return _order
                    })))
                }

            } else if (_.isObject($attr)) {
                let ObjKeys = Object.keys($attr)
                let ObjValues = Object.values($attr)
                for (let index = 0; index < ObjKeys.length; index++) {
                    const elementKeys = ObjKeys[index];
                    const elementValues = ObjValues[index];
                    $order.push([elementKeys, elementValues])
                }
            } else if (typeof $attr == 'string') {
                $order = [[$attr, $operation]]
            }

            if (!help.empty($isParam)) {
                $order = _.concat(this._params.order, $order);
            } else {
                $order = _.concat(this._order, $order);
            }

            $order = help.filter($order)

            $order = _.mapValues($order, order => {
                var dat = {}
                dat[order[1]] = order[0]
                return dat
            })
            $order = _.values($order);
            $order = help.unique($order, uniq => {
                if (!help.empty(uniq.asc)) {
                    return uniq.asc
                } else if (!help.empty(uniq.ASC)) {
                    return uniq.ASC
                } else if (!help.empty(uniq.desc)) {
                    return uniq.desc
                } else if (!help.empty(uniq.DESC)) {
                    return uniq.DESC
                }
            })

            var model_as = _.chain(this._glob.model_as).map(ret => {
                return _.values(ret);
            }).values()
            model_as = _.flatten(JSON.parse(JSON.stringify(model_as)));

            $order = _.mapValues($order, order => {
                if (typeof _.head(Object.values(order)) == 'object') {
                    let $_order = [[_.head(Object.values(order)), _.head(Object.keys(order))]]
                    $_order = _.concat(this._order, $_order);
                    $_order = help.filter($_order)
                    this._order = $_order
                } else {
                    let Attr = _.head(Object.values(order))
                        , dot = Attr.split('.')
                        , totleModel = (dot.length) - 1 < 0 ? 0 : (dot.length) - 1
                        , modeldot = dot[(totleModel - 1) < 0 ? 0 : totleModel - 1]
                        , Attrdot = dot[totleModel]
                    if (_.indexOf(Attributes, Attr) >= 0) {
                        return [Attr, _.head(Object.keys(order))]
                    } else if (_.indexOf(model_as, modeldot) >= 0) {
                        let _glob = this._glob
                            , asModel = function (params) {
                                let ds = _.head(_glob.model_as)
                                ds = help.filter(ds, data => {
                                    return data == params;
                                })
                                ds = Object.keys(ds)
                                return ds
                            }
                            , dotModel = help.filter(dot, data => {
                                return data !== Attrdot;
                            })
                            , returnOrder = []
                        for (let index = 0; index < dotModel.length; index++) {
                            const element = dotModel[index];
                            returnOrder.push({ "model": _.head(_glob.model)[element], as: _.head(asModel(element)) })
                        }
                        returnOrder.push(Attrdot)
                        returnOrder.push(_.head(Object.keys(order)))
                        return returnOrder
                    }
                }
            })
            $order = _.values($order);
            if (!help.empty($isParam)) {
                $order = _.concat(this._params.order, $order);
            } else {
                $order = _.concat(this._order, $order);
            }
            $order = help.filter($order)

            if (!help.empty($isParam)) {
                this._params.order = $order;
            } else {
                this._order = $order;
            }
            if (!help.empty($isParam)) {
                if (!help.empty(this._params.order)) {
                    var attributes = this.getAttributes(1)
                    var tbName = this._models.name
                    this._params.order = this._params.order.map(d => {
                        if (Array.isArray(d)) {
                            if (_.indexOf(Object.keys(this._convert_type), d[0]) >= 0) {
                                d[0] = seq.fn(this._convert_type[d[0]], seq.col(d[0]))
                            } else {
                                if (_.indexOf(Object.keys(attributes), d[0]) >= 0) {
                                    if (attributes[d[0]] == 'STRING' || attributes[d[0]] == 'TEXT') {
                                        d[0] = seq.literal('CONVERT(' + tbName + '.' + d[0] + ' USING tis620)')
                                    }
                                }
                            }
                        } else {
                            if (_.indexOf(Object.keys(this._convert_type), d) >= 0) {
                                d = seq.fn(this._convert_type[d], seq.col(d))
                            } else {
                                if (_.indexOf(Object.keys(attributes), d) >= 0) {
                                    if (attributes[d] == 'STRING' || attributes[d] == 'TEXT') {
                                        d = seq.literal('CONVERT(' + tbName + '.' + d + ' USING tis620)')
                                    }
                                }
                            }
                        }
                        return d
                    })
                }
            } else {
                if (!help.empty(this._order)) {
                    var attributes = this.getAttributes(1)
                    var tbName = this._models.name
                    this._order = this._order.map(d => {
                        if (Array.isArray(d)) {
                            if (_.indexOf(Object.keys(this._convert_type), d[0]) >= 0) {
                                d[0] = seq.fn(this._convert_type[d[0]], seq.col(d[0]))
                            } else {
                                if (_.indexOf(Object.keys(attributes), d[0]) >= 0) {
                                    if (attributes[d[0]] == 'STRING' || attributes[d[0]] == 'TEXT') {
                                        d[0] = seq.literal('CONVERT(' + tbName + '.' + d[0] + ' USING tis620)')
                                    }
                                }
                            }
                        } else {
                            if (_.indexOf(Object.keys(this._convert_type), d) >= 0) {
                                d = seq.fn(this._convert_type[d], seq.col(d))
                            } else {
                                if (_.indexOf(Object.keys(attributes), d) >= 0) {
                                    if (attributes[d] == 'STRING' || attributes[d] == 'TEXT') {
                                        d = seq.literal('CONVERT(' + tbName + '.' + d + ' USING tis620)')
                                    }
                                }
                            }
                        }
                        return d
                    })
                }
            }


        }
        return this
    }
    orWhere($attr = null, $operationOrCondition = null, $condition = null) {
        var $operation = null;
        var $_condition = $condition;
        if (!_.isNull($attr)) {
            if (!_.isNull($operationOrCondition) && _.isNull($condition)) {
                if (_.isArray($operationOrCondition)) {
                    $operation = "$in"
                    $condition = $operationOrCondition
                } else {
                    $operation = "$eq"
                    $condition = $operationOrCondition
                }
            } else if (!_.isNull($operationOrCondition) && !_.isNull($condition)) {
                switch ($operationOrCondition) {
                    case '=':
                        $operation = '$eq'
                        break;
                    case '==':
                        $operation = '$eq'
                        break;
                    case '>':
                        $operation = '$gt'
                        break;
                    case '>=':
                        $operation = '$gte'
                        break;
                    case '<':
                        $operation = '$lt'
                        break;
                    case '<=':
                        $operation = '$lte'
                        break;
                    case 'like':
                        $operation = '$like'
                        break;
                }

                if ($operationOrCondition == '!=' || $operationOrCondition == '<>') {
                    if (typeof $condition == 'object') {
                        $operation = '$notin';
                    } else {
                        $operation = '$ne';
                    }
                } else if ($operationOrCondition == '-' || $operationOrCondition == '--' || $operationOrCondition == 'between') {
                    $operation = '$btw';
                } else if ($operationOrCondition == '!-' || $operationOrCondition == 'notBetween') {
                    $operation = '$notbtw';
                } else if (help.empty($operation)) {
                    $operation = $operationOrCondition;
                }
            } else if (_.isNull($operationOrCondition)) {
                $operation = '$is'
            }
            if ($operationOrCondition == '->' || $operationOrCondition == 'is') {
                $operation = '$is'
            }
            const $_where = {}
            const where = {}
            const query = {}
            // if(!help.empty(this._convert_type)){
            //     if(_.indexOf(Object.keys(this._convert_type),$attr)>=0){
            //         convert_type = seq.where(seq.fn(this._convert_type[$attr], seq.col($attr)),'BETWEEN',$condition)
            //     }
            // }

            var setOr = []
            var setOld = {}
            if (!help.empty(this._where["where"])) {
                if (!help.empty(this._where["where"]["$or"])) {
                    setOr = this._where["where"]["$or"]
                }
                if (!help.empty(this._where["where"][$attr])) {
                    setOld[$attr] = this._where["where"][$attr]
                    delete this._where["where"][$attr]
                }
            }
            setOr = help.filter(setOr);
            if (!help.empty(setOld)) {
                setOr = _.concat(setOr, setOld)
            }

            query[$operation] = $operation == '$is' ? $_condition : $condition
            where[$attr] = query
            setOr = _.concat(setOr, where)

            this._where = _.merge(this._where, { where: { '$or': setOr } })

        }
        return this
    }
    rawWhere($where = null, $andOr = '$and') {
        if (help.empty(this._where)) {
            var where = {}
            where[$andOr] = [seq.literal($where)]
            this._where.where = where
        } else if (help.empty(this._where.where[$andOr])) {
            var where = {}
            where[$andOr] = [seq.literal($where)]
            this._where.where = _.merge(this._where.where, where)
        } else {
            this._where.where[$andOr] = _.concat(this._where.where[$andOr], [seq.literal($where)])
        }
        return this
    }
    where($attr = null, $operationOrCondition = null, $condition = null) {
        var $operation = null;
        var $_condition = $condition;
        var $arrayAny = [];
        var $arrayNull = [];
        if (!_.isNull($attr)) {

            if (_.isPlainObject($attr)) {
                let fkey = Object.keys($attr)
                let fval = Object.values($attr)

                for (let index = 0; index < fkey.length; index++) {
                    const elekey = fkey[index];
                    const eleval = fval[index];
                    if (typeof eleval == 'string') {
                        this.where(elekey, eleval)
                    } else if (_.isPlainObject(eleval)) {
                        let keyVal = _.head(Object.keys(eleval))
                        let valVal = _.head(Object.values(eleval))
                        keyVal = _.get(this._operation, keyVal, '$eq')
                        valVal = valVal == undefined ? eleval : valVal
                        this.where(elekey, keyVal, valVal)
                    } else {
                        this.where(elekey, eleval)
                    }
                }
                return this
            }

            if (!_.isNull($operationOrCondition) && _.isNull($condition)) {
                if (_.isArray($operationOrCondition)) {
                    $arrayAny = help.filter($operationOrCondition, r => { return !help.getNull(r) })
                    $arrayNull = help.filter($operationOrCondition, r => { return help.getNull(r) })
                    $operation = "$in"
                    $condition = $arrayAny
                    if (!help.empty($arrayNull)) {
                        this.orWhere($attr, null)
                    }
                } else {
                    $operation = "$eq"
                    $condition = $operationOrCondition
                }
            } else if (!_.isNull($operationOrCondition) && !_.isNull($condition)) {
                switch ($operationOrCondition) {
                    case '||':
                        $operation = '$or'
                        break;
                    case '=':
                        $operation = '$eq'
                        break;
                    case '==':
                        $operation = '$eq'
                        break;
                    case '>':
                        $operation = '$gt'
                        break;
                    case '>=':
                        $operation = '$gte'
                        break;
                    case '<':
                        $operation = '$lt'
                        break;
                    case '<=':
                        $operation = '$lte'
                        break;
                    case 'like':
                        $operation = '$like'
                        break;
                }

                if ($operationOrCondition == '!=' || $operationOrCondition == '<>') {
                    if (typeof $condition == 'object') {
                        $operation = '$notin';
                    } else {
                        $operation = '$ne';
                    }
                } else if ($operationOrCondition == '-' || $operationOrCondition == '--' || $operationOrCondition == 'between') {
                    $operation = '$btw';
                } else if ($operationOrCondition == '!-' || $operationOrCondition == 'notBetween') {
                    $operation = '$notbtw';
                } else if (help.empty($operation)) {
                    $operation = $operationOrCondition;
                }
            } else if (_.isNull($operationOrCondition)) {
                $operation = '$is'
            }
            if ($operationOrCondition == '->' || $operationOrCondition == 'is') {
                $operation = '$is'
            }

            if ($operationOrCondition == 'json') {
                var field = $attr
                var json = help.reqJsonConverte($condition)

                var regex = _.chain(json).map((v, k) => {
                    let set = []
                    let code = ''
                    if (typeof v == 'string') {
                        code = '"'
                    }

                    // console.log(typeof v);

                    if (v.match(`^%`)) {
                        set.push(`(${code}\.*)`)
                    } else {
                        set.push(`(${code})`)
                    }
                    set.push(`(${v.replace(/%/g, '')})`)
                    if (v.match(`%$`)) {
                        set.push(`(\.*${code})`)
                    } else {
                        set.push(`(${code})`)
                    }
                    return `("${k}")+(:|: )+${_.join(set, '+')}`
                }).value().join('+(,|, )+')
                // console.log(`${field} REGEXP '${regex}'`);

                this.rawWhere(`${field} REGEXP '${regex}'`).toJson()
                return this
            }

            var where = {}
            var query = {}

            if ($operation != '$or') {
                query[$operation] = $operation == '$is' ? $_condition : $condition;

                if ($operation == '$like') {
                    if (_.isArray($condition)) {
                        query = {
                            $or: $condition.map((item) => {
                                return { '$like': `%${item}%` };
                            })
                        }
                    }
                }
                where[$attr] = query
                this._where = _.merge(this._where, { where: where })
            } else {
                this.orWhere($attr, $condition)
            }
            if (!help.empty($arrayNull)) {
                this.orWhere($attr, null)
            }

        }
        return this;
    }
    limit(limit = 0) {
        if (!help.empty(limit)) {
            this._limit['limit'] = parseInt(limit);
        }
        return this
    }
    /**
    * case.
    *
    * @param {order} [Options]- Options to order query.
    * @example
    * MyModel.case({"case":"refTB","key":"refId"},[{ when: "ex", foreignKey: "exId" }])
    * MyModel.case(["refTB","refId"],[{ when: "ex", foreignKey: "exId" }])
    * MyModel.case("refTB",[{ when: "ex", foreignKey: "exId" }])
    * MyModel.case("refTB",[{ when: "ex", foreignKey: "exId" }],"asCaseList")
    * @memberof Model
    */
    case($case = '', $obj = [], as = "list_case") {
        // selectAdd([seq.literal(``)])
        this._as_case_when.push(as)
        let tbName = this._models.name
        let refKey = 'refId'
        let refTB = 'refTable'
        if (_.isPlainObject($case)) {
            refKey = help.get($case, 'key', refKey)
            $case = help.get($case, 'case', refTB)
        }
        if (_.isArray($case)) {
            refKey = help.get($case, '1', refKey)
            $case = help.get($case, '0', refTB)
        }
        $obj = _.map($obj, l => {
            let textAs = help.get(l, 'text', help.get(l, 'message', false))
            let fieldAs = help.get(l, 'attr', help.get(l, 'field', false))
            if (!help.empty(textAs)) {
                textAs = typeof textAs == 'number' ? textAs : `'${textAs}'`
                if (!_.isSet(l.when) && l.when !== undefined) {
                    return `WHEN '${l.when}' THEN ${textAs}`
                } else {
                    return `ELSE ${textAs}`
                }
            } else if (!help.empty(fieldAs)) {
                if (!_.isSet(l.when) && l.when !== undefined) {
                    return `WHEN '${l.when}' THEN ${fieldAs}`
                } else {
                    return `ELSE ${fieldAs}`
                }
            } else {
                let model = help.get(l, 'model', help.get(l, 'tb', help.get(l, 'when')))
                let getAttributes = help.query(model).getAttributes(1)
                let select = help.get(l, 'select', help.query(model).getAttributes())

                select = _.map(select, (s, k) => {
                    if (getAttributes[s] == "POINT") {
                        if (k == 0) {
                            return `'"${s}":"',REPLACE(COALESCE(ST_AsText(${model}.${s}),''),'"','\\\\"'),'"'`;
                        } else {
                            return `',"${s}":"',REPLACE(COALESCE(ST_AsText(${model}.${s}),''),'"','\\\\"'),'"'`;
                        }
                    } else {
                        if (k == 0) {
                            return `'"${s}":"',REPLACE(COALESCE(${model}.${s},''),'"','\\\\"'),'"'`;
                        } else {
                            return `',"${s}":"',REPLACE(COALESCE(${model}.${s},''),'"','\\\\"'),'"'`;
                        }
                    }
                })

                let join = ` `
                if (!help.empty(l.join)) {
                    join = `LEFT JOIN ${l.join.tb} ON ${model}.${help.get(l.join, 'foreignKey', _.camelCase(model) + 'Id')} = ${l.join.tb}.${l.join.targetKey}`
                    let join_select = help.get(l, 'select', help.query(l.join.tb).getAttributes())
                    join_select = _.map(join_select, (s, k) => {
                        if (getAttributes[s] == "POINT") {
                            if (k == 0) {
                                return `'"${s}":"',REPLACE(COALESCE(ST_AsText(${l.join.tb}.${s}),''),'"','\\\\"'),'"'`;
                            } else {
                                return `',"${s}":"',REPLACE(COALESCE(ST_AsText(${l.join.tb}.${s}),''),'"','\\\\"'),'"'`;
                            }
                        } else {
                            if (k == 0) {
                                return `'"${s}":"',REPLACE(COALESCE(${l.join.tb}.${s},''),'"','\\\\"'),'"'`;
                            } else {
                                return `',"${s}":"',REPLACE(COALESCE(${l.join.tb}.${s},''),'"','\\\\"'),'"'`;
                            }
                        }
                    })
                    select.push(`',"${l.join.tb}":{',${_.join(join_select, ',')},'}'`)
                }

                select = `'{',${_.join(select, ',')},'}'`


                return `WHEN '${l.when}' THEN (SELECT GROUP_CONCAT(CONCAT(${select})) as list FROM ${model} ${join}  WHERE ${model}.${help.get(l, 'foreignKey', _.camelCase(model) + 'Id')} = ${tbName}.${help.get(l, 'targetKey', refKey)})`
            }
        })
        $obj = `CASE ${$case} ${_.join($obj, " ")} END`
        // console.log($obj);

        this._case_select.push([seq.literal($obj), as])
        return this
    }
    offset(offset = 0) {
        if (!help.empty(offset)) {
            this._offset['offset'] = parseInt(offset);
        }
        return this
    }
    group(group = []) {
        if (!help.empty(group)) {
            if (_.isArray(group)) {
                this._group.group = _.merge(this._group.group, group);
            } else {
                this._group.group = _.merge(this._group.group, [group]);
            }
        }
        return this
    }
    valNull($is_null = false) {
        this._is_null = help.getBoolean($is_null);
        return this
    }
    async set_config($config = {}) {
        if (!help.empty(this._convert_type)) {

            var where = _.mapValues(this._where.where, (filter, $attr) => {
                if (_.indexOf(Object.keys(this._convert_type), $attr) >= 0) {
                    let filterKey = _.head(Object.keys(filter))
                    let filterVal = _.head(Object.values(filter))

                    let operation = _.head(Object.keys(help.filter(this._operation, ope => {
                        return ope == filterKey
                    })))
                    if (!help.empty(operation)) {
                        if (operation == 'BETWEEN') {
                            if (_.isArray(filterVal)) {
                                filter = [seq.where(
                                    seq.fn(this._convert_type[$attr], seq.col($attr)),
                                    '>=', filterVal[0]
                                ),
                                seq.where(
                                    seq.fn(this._convert_type[$attr], seq.col($attr)),
                                    '<=', filterVal[1]
                                )]
                            }
                        }
                    }
                } else {
                    let filterAt = {}
                    filterAt[$attr] = filter
                    filter = [filterAt]
                }

                return filter
            })
            where = help.filter(where, attr => {
                return _.isArray(attr)
            })
            where = _.values(where, true);

            this._where.where = { $and: where }
        }
        $config = await _.merge(this._where, $config)

        if (!_.isEmpty(this._include)) {
            $config.include = await _.uniqBy(_.concat(_.result(this._include, 'include', []), _.result($config, 'include', [])), 'as')
        }

        if (!_.isEmpty(this._params)) {
            if (help.empty(this._params.order)) {
                if (!_.isEmpty(this._order)) {
                    $config = await _.merge({ order: this._order }, $config)
                }
            }
            $config = await _.merge(this._params, $config)
        } else {
            if (!_.isEmpty(this._order)) {
                $config = await _.merge({ order: this._order }, $config)
            }
        }
        if (!_.isEmpty(this._limit)) {
            $config = await _.merge(this._limit, $config)
        }
        if (!_.isEmpty(this._offset)) {
            $config = await _.merge(this._offset, $config)
        }
        if (!_.isEmpty(this._case_select)) {
            if (help.empty(this._attributes.attributes)) {
                this._attributes.attributes = this.getAttributes()
            }
            for (let index = 0; index < this._case_select.length; index++) {
                if (!help.empty(this._case_select[index])) {
                    this._attributes.attributes.push(this._case_select[index])
                }
            }
        }
        if (!_.isEmpty(this._attributes)) {
            $config = await _.merge(this._attributes, $config)
        }
        if (!_.isEmpty(this._group)) {
            if (!help.empty(this._group.group)) {
                $config = await _.merge(this._group, $config)
            }
        }
        $config = help.filter($config)
        if (help.empty($config.subQuery)) {
            $config.subQuery = false
        }
        return $config;
    }
    async count($config = {}) {
        try {
            $config = await this.set_config($config)
            let r = await this._models.count($config)
            if (Array.isArray(r)) {
                return r.length
            } else {
                return r
            }
        } catch (error) {
            $config = await this.set_config($config)
            $config = help.except($config, ['distinct'])
            return await this._models.count($config)
        }
    }
    /**
     * 
     * @param {string} $field 
     * @param {Integer} $by 
     * @param {object} $config
     * @example
     * increment('field')
     * increment('field',5)
     * increment('field',{'where':{'id':1}})
     * increment('field',null,{'where':{'id':1}})
     * increment('field',5,{'where':{'id':1}})
     */
    async increment($field = '', $by = 1, $config = {}) {
        if (typeof $by == 'object') {
            $config = $by
            $by = 1
        }
        $config = await this.set_config($config)
        $config['by'] = $by
        return await this._models.increment($field, $config);
    }
    /**
    *
    * @param {string} $field
    * @param {Integer} $by
    * @param {object} $config
    * @example
    * decrement('field')
    * decrement('field',5)
    * decrement('field',{'where':{'id':1}})
    * decrement('field',null,{'where':{'id':1}})
    * decrement('field',5,{'where':{'id':1}})
    */
    async decrement($field = '', $by = 1, $config = {}) {
        if (typeof $by == 'object') {
            $config = $by
            $by = 1
        }
        $config = await this.set_config($config)
        $config['by'] = -1 - ($by - 1)
        return await this._models.increment($field, $config);
    }
    async get($config = {}) {
        $config = await this.set_config($config)
        return await this._models.findAll($config)
    }
    async toJson($config = {}) {
        $config = await this.set_config($config)

        var $respon = await this._models.findAll($config)
        $respon = JSON.stringify($respon)
        $respon = JSON.parse($respon)
        var valuesAs = []
        if (!help.empty(this._glob.model_as)) {
            valuesAs = Object.keys(_.head(this._glob.model_as))
        }

        $respon = _.chain($respon).mapValues((val, key) => {
            if (!help.empty(valuesAs)) {
                for (let index = 0; index < valuesAs.length; index++) {
                    if (_.has(val, valuesAs[index])) {
                        if (help.empty((_.get(val, valuesAs[index])))) {
                            let _default = _.has(this._as_default, valuesAs[index]) ? this._as_default[valuesAs[index]] : ''
                            val = _.setWith(val, valuesAs[index], _default, Object)
                        }
                    }
                }
            }
            if (!help.empty(this._as_case_when)) {
                for (const [$index, $var] of Object.entries(this._as_case_when)) {
                    if (help.testJSON(val[$var])) {
                        val[$var] = JSON.parse(val[$var])
                    } else {
                        try {
                            if (help.testJSON((val[$var].replace(/\n/g, "{{n}}")).replace(/\r/g, "{{r}}"))) {
                                val[$var] = JSON.parse((val[$var].replace(/\n/g, "{{n}}")).replace(/\r/g, "{{r}}"));
                                for (let [key, data] of Object.entries(val[$var])) {
                                    val[$var][key] = (data.replace(/{{n}}/g, "\n")).replace(/{{r}}/g, "\r")
                                }
                            }
                        } catch (error) {

                        }
                    }
                }
            }
            return val;
        }).values();

        $respon = JSON.stringify($respon)
        if (!help.empty(this._glob.model_as)) {
            let keys = Object.keys(_.head(this._glob.model_as))
            let values = Object.values(_.head(this._glob.model_as))
            for (let index = 0; index < keys.length; index++) {
                $respon = await $respon.replace(new RegExp(keys[index], 'g'), values[index])
            }
        }
        $respon = help.unique(JSON.parse($respon));
        $respon = tranform($respon);
        $respon = JSON.parse(JSON.stringify($respon))
        return $respon
    }
    async first($config = {}) {
        $config.limit = 1
        $config = await this.set_config($config)
        var $respon = await this._models.findAll($config)
        $respon = JSON.stringify($respon)
        $respon = JSON.parse($respon)
        $respon = _.head($respon)

        if (!help.empty($respon)) {
            $respon = JSON.stringify($respon)
            if (!help.empty(this._glob.model_as)) {
                let keys = Object.keys(_.head(this._glob.model_as))
                let values = Object.values(_.head(this._glob.model_as))
                for (let index = 0; index < keys.length; index++) {
                    $respon = await $respon.replace(new RegExp(keys[index], 'g'), values[index])
                }
            }
            $respon = JSON.parse($respon);
        }
        if (!help.empty(this._as_case_when)) {
            for (const [$index, $var] of Object.entries(this._as_case_when)) {
                if (help.testJSON($respon[$var])) {
                    $respon[$var] = JSON.parse($respon[$var])
                } else {
                    if (($respon[$var].replace(/\n/g, "{{n}}")).replace(/\r/g, "{{r}}")) {
                        $respon[$var] = JSON.parse(($respon[$var].replace(/\n/g, "{{n}}")).replace(/\r/g, "{{r}}"));
                        for (let [key, data] of Object.entries($respon[$var])) {
                            $respon[$var][key] = (data.replace(/{{n}}/g, "\n")).replace(/{{r}}/g, "\r")
                        }
                    }
                }
            }
        }
        return $respon
    }
    async firstField(field, $config) {
        if ($config)
            await this.set_config($config)
        return _.get(await this.select([field]).first(), field)
    }
    async pagination($config = {}) {
        var $page = this._current_page
        if (help.empty(this._params.limit) && help.empty($config.limit)) {
            $config.limit = 15;
        }
        if (_.isSet($config.page)) {
            if (!help.empty($config.page)) {
                $page = $config.page
            }
            delete $config.page
        }
        $config = await this.set_config($config)

        var $setting = $config
        var $limit = $setting.limit
        $setting = help.except($setting, [
            'limit',
            'offset',
        ])

        if (help.empty($setting.groupBy)) {
            // $setting.groupBy = 
        }
        // $setting.distinct = true
        // var $responTotel = await this._models.count($setting)
        // var $responTotel = await this.count(_.merge($setting, { distinct: true }))
        var $responTotel = await this.count(_.merge($setting, { distinct: true }))


        if (typeof $responTotel !== 'number') {
            if (_.get(_.head($responTotel), 'count', false)) {
                $responTotel = _.sumBy($responTotel, 'count');
            } else {
                $responTotel = $responTotel.length;
            }
        }
        var $page = help.paginations($responTotel, $limit, $page)

        $config.offset = help.getNumber($page.offset);
        $config.limit = help.getNumber($page.per_page);
        var $respon = await this.toJson($config);

        $page.data = $respon
        return $page
    }

    async paging(req, res, { searchFields, except, select, orderBy, where, join } = {}) {
        const page = parseInt(req.body.page) || 1
        const perPage = req.body.per_page || 20
        const search = req.body.search
        select = req._body('select', Array, select || [])
        except = req._body('except', Array, except || [])
        if (where)
            where = {
                $and: [where]
            }
        else
            where = {
                $and: []
            }

        let reqOrderBy = _.compact(req._body('order_by', Array))
        if (reqOrderBy.length > 0) {
            orderBy = reqOrderBy
                .map(o => /^\-/gmi.test(o) ? [o.replace(/^\-/, ''), 'desc'] : [o, 'asc'])
        } else if (!orderBy) {
            orderBy = [['updatedAt', 'asc']]
        }

        if (search) {
            let searchWhere = require('./searchBuilder')(search, req._body('search_fields', Array, searchFields || []))

            where.$and.push({ $or: searchWhere })
        }

        if (req._body('before', String)) {
            const before = req._body('before', String)
            where.$and.push({ [this.getPrimaryKey()]: { $lt: before } })
        }

        if (req._body('where', Object)) {

            let w = req._body('where', Object)
            this.paramsWhere(w)
            // if (w instanceof Array) {
            //     where.$and.push({ $and: w })
            // } else if (w instanceof Object) {
            //     where.$and.push(w)
            // }
        }

        if (where.$and.length == 1) {
            where = where.$and[0]
        }

        if (_.isEmpty(this._order)) {
            this.orderBy(orderBy)
        }
        this
            .select(req._body('select', Array, select || []), false)
            .offset(perPage * (page - 1))
            .limit(perPage > 0 ? perPage : 0)
            .group(req.body.group)

        if (!help.empty(except)) {
            this.except(except)
        }

        join && await join(this)

        if (perPage >= 0) {
            const total = await this.count({ where })

            const totalPage = Math.ceil(total / perPage)

            // header

            res.set('X-Page', page)
            res.set('X-Per-Page', perPage)
            res.set('X-Total', total)
            res.set('X-Total-Pages', totalPage)

            if (page + 1 <= totalPage)
                res.set('X-Next-Page', page + 1)
            if (page - 1 >= 1)
                res.set('X-Prev-Page', page - 1)

        }

        // body
        let data = collect(await this.toJson({ where })).map(r => {
            if (!help.empty(select)) {
                r = help.only(r, select)
            }
            if (!help.empty(except)) {
                r = help.except(r, except)
            }
            return r
        }).all()

        if (perPage == -1) {
            res.set('X-Total', data.length)
        }

        res.json(data)
    }

    async scrolling(req, res, { searchFields, except } = {}) {
        const limit = parseInt(req.body.limit) || 20
        const search = req.body.search
        var orderBy = _.merge({ order: this._order }, [])
        let where = {
            $and: []
        }

        let reqOrderBy = _.compact(req._body('order_by', Array))
        if (reqOrderBy.length > 0) {
            orderBy = reqOrderBy
                .map(o => /^\-/gmi.test(o) ? [o.replace(/^\-/, ''), 'desc'] : [o, 'asc'])
        } else if (!orderBy) {
            orderBy = [['updatedAt', 'asc']]
        }


        if (req._body('before', String)) {
            const before = req._body('before', String)
            where.$and.push({ [this.getPrimaryKey()]: { $lt: before } })
        }

        if (search) {
            let $or = []
            for (let f of req._body('search_fields', Array, searchFields || [])) {
                $or.push({
                    [f]: {
                        $like: '%' + search + '%'
                    }
                })
            }
            where.$and.push({ $or })
        }

        if (req._body('before', String)) {
            const before = req._body('before', String)
            where.$and.push({ [this.getPrimaryKey()]: { $lt: before } })
        }

        if (req._body('where', Object)) {
            let w = req._body('where', Object)
            if (w instanceof Array) {
                where.$and.push({ $and: w })
            } else if (w instanceof Object) {
                where.$and.push(w)
            }
        }

        if (where.$and.length == 1) {
            where = where.$and[0]
        }

        let records = await this
            .except(except)
            .orderBy(orderBy)
            .limit(limit)
            .toJson({ where })

        // header

        res.set('X-limit', limit)

        if (records.length == 0) {
            res.set('X-Has-Next', 0)
        } else if (records.length < limit) {
            res.set('X-Has-Next', 0)
        } else {
            const record = _.last(records)
            res.set(
                'X-Has-Next',
                (
                    await this
                        .orderBy(orderBy)
                        .offset(limit)
                        .limit(1)
                        .firstField(this.getPrimaryKey())
                ) != undefined ? 1 : 0
            )
        }

        // body
        res.data = records
        return records
    }
}

module.exports = classQuery