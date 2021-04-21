const $this = this
const path = require('path')
var fs = require('fs')
  , _ = require('lodash')
  , collect = require('collect.js')
const seq = require('../db')
const config = require('../config');
const url = require('url')
const moment = require('moment')
const classQuery = require('./classQuery')
// const mergeJson = require('./mergeJson')
const ResponseError = require('../utils/ResponseError')
const shell = require('shelljs')

exports.shuffle = function (arr, seeds = new Date()) {
  function shuffle(array, seed) {                // <-- ADDED ARGUMENT
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed                                     // <-- ADDED LINE
    }

    return array;
  }

  function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  return shuffle(arr, seeds)
}
exports.checkFiles = async function (params, projectDir) {
  shell.cd(projectDir)
  let f = shell.find(params.replace(/\.[^\.]*/gmi, '') + '.*').stdout.split(/\n/gmi)[0]
  return f
}
exports.treeToList = (listData, children = 'children') => {
  try {
    var array = []
    if (!$this.empty(listData)) {
      for (const element of listData) {
        if (!$this.empty(element[children])) {
          let childrenList = _.isPlainObject(element[children]) ? [element[children]] : element[children]
          array.push($this.treeToList(childrenList, children))
        }
        array.push($this.except(element, [children]))
      }
    }
    return _.flattenDeep(array, true);
  } catch (error) {
    throw error
  }
}
exports.replaceLast = (input, find, replaceWith) => {
  if (!input || !find || !replaceWith || !input.length || !find.length || !replaceWith.length) {
    // returns input on invalid arguments
    return input;
  }

  const lastIndex = input.lastIndexOf(find);
  if (lastIndex < 0) {
    return input;
  }

  return input.substr(0, lastIndex) + replaceWith + input.substr(lastIndex + find.length);
}
exports.strLimit = (str, length, chr) => {
  chr = chr || '…';
  return str.length >= length ? str.substr(0, length - chr.length) + chr : str;
}
exports.strFirst = (str, find) => {
  var regex = new RegExp(`^${find}`);
  if (!regex.test(str)) {
    str = `${find}${str}`
  }
  return str
}
exports.strLast = (str, find) => {
  var regex = new RegExp(`${find}$`);
  if (!regex.test(str)) {
    str = `${str}${find}`
  }
  return str
}
var findFiles = function (folder, pattern = /.*/, callback) {
  var flist = [];

  fs.readdirSync(folder).map(function (e) {
    var fname = path.join(folder, e);
    var fstat = fs.lstatSync(fname);
    if (fstat.isDirectory()) {
      // don't want to produce a new array with concat
      Array.prototype.push.apply(flist, findFiles(fname, pattern, callback));
    } else {
      let filename = $this.pathinfo(fname).filename
      // console.log(pattern, fname, pattern.test(fname));
      if (pattern.test(filename)) {
        // console.log(filename, pattern.test(filename));
        flist.push(fname);
        if (callback) {
          callback(fname);
        }
      }
    }
  });
  return flist;
};
exports.findFile = (req, find) => {
  var pathdir = $this.get(req, 'path', '')
  var filename = $this.get(req, 'name', '')
  var host = $this.get(req, 'host', '')
  var get = ''
  var regex = new RegExp(`^${filename}\\..*$`, 'g');
  var set = new RegExp(/\\/, 'g');
  get = findFiles(pathdir, regex)
  get = _.map(get, f => {
    return host + '/' + f.replace(set, '/')
  })
  return get
}
exports.flattenDeep = (data, find) => {
  function getPathHelper(collection, newCollection, path, level) {
    return _.reduce(collection, function (newCollection, item) {
      path += (path ? '.' : '') + item[find];
      newCollection.push(
        _(item)
          .tap(_.partial(getPathHelper, item.children || [], newCollection, path, level + 1))
          .omit('children')
          .set('pathname', path)
          .set('level', level)
          .value()
      );
      return newCollection;
    }, newCollection);
  }

  function getPath(collection) {
    return _.sortBy(getPathHelper(collection, [], '', 0), 'pathname');
  }

  data = _.map(getPath(data), r => { return r[find] })
  return data
}


function falsyValue(item) {
  if (Array.isArray(item)) {
    if (item.length) {
      return false;
    }
  } else if (item !== undefined && item !== null && (typeof item === 'undefined' ? 'undefined' : typeof (item)) === 'object') {
    if (Object.keys(item).length) {
      return false;
    }
  } else if (item) {
    return false;
  }

  return true;
}

function filterObject(func, items) {
  var result = {};
  Object.keys(items).forEach(function (key) {
    if (func) {
      if (func(items[key], key)) {
        result[key] = items[key];
      }
    } else if (!falsyValue(items[key])) {
      result[key] = items[key];
    }
  });

  return result;
}

function filterArray(func, items) {
  if (func) {
    return items.filter(func);
  }
  var result = [];
  for (var i = 0; i < items.length; i += 1) {
    var item = items[i];
    if (!falsyValue(item)) {
      result.push(item);
    }
  }
  return result;
}
/** 
 *ฟังก์ชันกรองข้อมูล
 * @param {Array|Object} items ข้อมูล
 * @param {function} fn ฟังก์ชันกรอง
**/
exports.filter = (items, fn) => {
  var func = fn || false;
  var filteredItems = null;
  if (Array.isArray(items)) {
    filteredItems = filterArray(func, items);
  } else {
    filteredItems = filterObject(func, items);
  }
  return filteredItems;
}


exports.get = (items, key, defaultData) => {
  return !$this.empty(_.get(items, key)) ? _.get(items, key, defaultData) : defaultData;
}
exports.betweed = (now, start, end) => {
  var date = moment(now, "YYYY-MM-DD");
  var startDate = moment(start, "YYYY-MM-DD");
  var endDate = moment(end, "YYYY-MM-DD");


  if (date.isBefore(endDate)
    && date.isAfter(startDate)
    || (date.isSame(startDate) || date.isSame(endDate))
  ) {
    return true
  } else {
    return false
  }
}

exports.fiscalYear = (nows = '') => {
  let now = !$this.empty(nows) ? moment(nows).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss')
  let month = moment(now).format('MM')
  month = $this.getNumber(month)
  let year = moment(now).format('YYYY')
  year = $this.getNumber(year)
  if (month >= 10 && month <= 12) {
    year = year + 1
  }
  if (!$this.empty(year)) {
    year = $this.getNumber(year)
  }
  return year
}
/**
 * @example 
 * help.durationTime(row.startTime,row.endTime,'minutes')
 * help.durationTime(row.startTime,row.endTime,'hours')
 * help.durationTime(row.startTime,row.endTime,'days')
 * help.durationTime(row.startTime,row.endTime,'year')
 */
exports.durationTime = (startTime, endTime, get = 'milliseconds') => {
  var date1 = new Date(startTime).getTime();
  var date2 = new Date(endTime).getTime();
  var data = {}
  data["milliseconds"] = date2 - date1;
  data["minutes"] = Math.floor(data["milliseconds"] / 60000);
  data["hours"] = Math.floor(data["minutes"] / 60);
  data["days"] = Math.floor(data["hours"] / 24);
  data["year"] = Math.floor(data["days"] / 365);
  return data[get]
}
exports.convertMiliseconds = (miliseconds, format, isMiliseconds = true) => {
  if ($this.empty(isMiliseconds)) {
    miliseconds = (miliseconds * 1000)
  }

  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));
  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);
  switch (format) {
    case 's':
      return total_seconds;
    case 'm':
      return total_minutes;
    case 'h':
      return total_hours;
    case 'd':
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
};

exports.reqJson = function (obj = {}, item = []) {
  for (const object of item) {
    if (!$this.empty(obj[object])) {
      if (typeof obj[object] == 'string') {
        obj[object] = $this.reqJsonConverte(obj[object])
      }
    }
  }
  return obj
}
exports.reqJsonConverte = function (obj = {}) {
  if (!$this.empty(obj)) {
    if (typeof obj == 'string') {
      if ($this.testJSON(obj)) {
        obj = JSON.parse(obj)
      } else {
        obj = (obj).split(',')
      }
    }
  }
  return obj;
}
exports.listObj = function (obj = {}, key = '', fig = '') {
  if (_.isString(key)) {
    var list = $this.only(obj, [key])
    delete obj[key]
    return $this.loopObj(list, obj)
  } else {
    var setKey = []
    for (const iterator of key) {
      setKey.push(iterator)
    }
    var list = $this.only(obj, setKey)
    for (const iterator of key) {
      delete obj[iterator]
    }
    return $this.loopObj(list, obj, fig)
  }
}
exports.loopObj = function (listdata = {}, obj = {}, fig = '') {

  key = Object.keys(listdata)
  list = Object.values(listdata)

  var data = []
  var get = []
  var lengthList = !$this.empty(fig) ? list[_.indexOf(key, fig)].length : _.maxBy(list, function (o) { return o.length; }).length
  for (let index = 0; index < lengthList; index++) {
    data.push(obj)
  }
  data = JSON.parse(JSON.stringify(data))
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    for (let i = 0; i < key.length; i++) {
      const sort = key[i];
      item[sort] = list[i][index]
    }
    get.push(item)
  }

  return get;
}


/** 
 *ฟังก์ชัน only เลือกข้อมูลที่ต้องการใน Object
 * @param {Object} Object ข้อมูล
 * @param {Array} keys ที่ต้องการดึงจากข้อมูล
**/
exports.only = (obj, keys = []) => {
  var filtered = {}
  keys = $this.reqJsonConverte(keys)
  if (Array.isArray(obj)) {
    filtered = $this.filter(obj, item => keys.indexOf(item) !== -1)
  } else if (!$this.empty(keys)) {
    keys.forEach(key => {
      if (typeof key === 'object') {
        let keyIndex = _.head(key)
        let keyValue = _.last(key)
        if (obj.hasOwnProperty(keyIndex)) {
          filtered[keyValue] = obj[keyIndex]
        }
      } else {
        if (obj.hasOwnProperty(key)) {
          filtered[key] = obj[key]
        }
      }
    })
  }
  return filtered
}
/** 
 *ฟังก์ชัน only เลือกข้อมูลที่ต้องการใน Object
 * @param {Object} Object ข้อมูล
 * @param {Array} keys ที่ไม่ต้องการดึงจากข้อมูล
**/
exports.except = (obj, keys = [], list = false) => {

  if (!$this.empty(list)) {
    var output = []
    for (const [_key, _Object] of Object.entries(obj)) {
      output[_key] = $this.except(_Object, keys)
    }
    return output
  }

  // const properties = keys;
  var properties = keys;
  var groupProperties = _.map(properties, key => {
    var type = 'string'
    if (key !== undefined) {
      var patt = new RegExp(".");
      if (patt.test(key)) {
        var keyMatches = []
        let _key = key.split('.')

        for (let index = 0; index < _key.length; index++) {
          const element = _key[index];
          keyMatches[index] = keyMatches[element] || element
        }
      }
      if (keyMatches.length == 1) {
        keyMatches = _.head(keyMatches)
      } else {
        type = 'array'
      }
    }
    return !$this.empty(keyMatches) ? { type, key: keyMatches } : { type, key: key }
  })
  // console.log(groupProperties)

  if (Array.isArray(obj)) {
    const collection = obj
      .filter(item => properties.indexOf(item) === -1);

    return collection;
  }

  const collection = {};

  Object.keys(obj).forEach((property) => {
    let properString = $this.filter(groupProperties, group => {
      return group.type == 'string';
    })
    properString = $this.map(properString, group => group.key)
    if (properString.indexOf(property) === -1) {
      collection[property] = obj[property];
    }
    let properArray = $this.filter(groupProperties, group => {
      return group.type == 'array';
    })
    for (const group of properArray) {
      let setKey = $this.except(group.key, _.head(group.key))
      setKey = $this.map(setKey, k => {
        var patt = new RegExp(",");
        if (typeof k == 'string') {
          if ($this.testJSON(k)) {
            k = JSON.parse(k)
          } else if (patt.test(k)) {
            k = k.split(',')
          }
        }
        return k
      })
      if (typeof _.head(setKey) == 'object') {
        setKey = _.head(setKey)
      }
      collection[_.head(group.key)] = $this.except(obj[_.head(group.key)], setKey)
    }
  });

  return collection;
}
exports.isEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
exports.validate = (input, has = [], fn = 'list') => {
  let now = new Date().getTime();

  let inputMap = {}

  for (let index = 0; index < has.length; index++) {
    const element = has[index];
    if (!$this.empty(input[element])) {
      inputMap[element] = input[element]
    } else {
      inputMap[element] = 'noData' + now
    }
  }
  inputMap = _.join(_.keys($this.filter(inputMap, filter => {
    return filter == 'noData' + now
  })), ',')
  if ($this.empty(inputMap)) {
    return false;
  }
  if (typeof fn == 'function') {
    return _.head(_.map([inputMap], fn))
  } else {
    return inputMap
  }
}

exports.unique = (items, key) => {
  let collection;

  if (key === undefined) {
    collection = items
      .filter((element, index, self) => self.indexOf(element) === index);
  } else {
    collection = [];

    const usedKeys = [];

    for (let iterator = 0, length = items.length;
      iterator < length; iterator += 1) {
      let uniqueKey;
      if (typeof key === 'function') {
        uniqueKey = key(items[iterator]);
      } else {
        uniqueKey = items[iterator][key];
      }

      if (usedKeys.indexOf(uniqueKey) === -1) {
        collection.push(items[iterator]);
        usedKeys.push(uniqueKey);
      }
    }
  }

  return collection;
};
/** 
 * ดูข้อมูลเส้นทางพื้นฐาน
 * @param {String} path เพิ่มเส้นทาง
**/
exports.collapse = function (items) {
  return [].concat(...items);
}

/** Usage:
  * @example
  * helper.buildTree(Array, {
    *       idKey: 'id',
    *       parentKey: 'parent',
    *       childrenKey: 'children'
    * })
     */
exports.buildTree = (data, options) => {
  options = options || {};
  var ID_KEY = options.idKey || 'id';
  var PARENT_KEY = options.parentKey || 'parent';
  var CHILDREN_KEY = options.childrenKey || 'children';

  var tree = [],
    childrenOf = {};
  var item, id, parentId;
  for (var i = 0, length = data.length; i < length; i++) {
    item = data[i];
    id = item[ID_KEY];
    parentId = item[PARENT_KEY] || 0;
    // ทุกรายการอาจมีลูก
    childrenOf[id] = childrenOf[id] || [];
    // ริเริ่มเด็ก ๆ
    item[CHILDREN_KEY] = childrenOf[id];
    if (parentId != 0) {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || [];
      // push it into its parent's children object
      childrenOf[parentId].push(item);
    } else {
      tree.push(item);
    }
  };
  return tree;
}

exports.map = function (items, fn) {
  if (Array.isArray(items)) {
    return new this.constructor(items.map(fn));
  }

  const collection = {};

  Object.keys(items).forEach((key) => {
    collection[key] = fn(items[key], key);
  });

  return new this.constructor(collection);
};
// exports.classJson = (...args) => {
//   return new mergeJson(...args)
// }
exports.merge = (items, value) => {
  let arrayOrObject = value;

  if (typeof arrayOrObject === 'string') {
    arrayOrObject = [arrayOrObject];
  }

  if (Array.isArray(items) && Array.isArray(arrayOrObject)) {
    return new this.constructor(items.concat(arrayOrObject));
  }

  const collection = JSON.parse(JSON.stringify(items));

  Object.keys(arrayOrObject).forEach((key) => {
    collection[key] = arrayOrObject[key];
  });

  return new this.constructor(collection);
};

function nestedValue(mainObject, key) {
  try {
    return key.split('.').reduce((obj, property) => obj[property], mainObject);
  } catch (err) {
    return null;
  }
}
function buildKeyPathMap(items) {
  const keyPaths = {};

  items.forEach((item, index) => {
    function buildKeyPath(val, keyPath) {
      if (typeof val === 'object') {
        Object.keys(val).forEach((prop) => {
          buildKeyPath(val[prop], `${keyPath}.${prop}`);
        });
      }

      keyPaths[keyPath] = val;
    }

    buildKeyPath(item, index);
  });

  return keyPaths;
};
exports.pluck = function (items, value, key) {
  if (value.indexOf('*') !== -1) {
    const keyPathMap = buildKeyPathMap(items);
    console.log(keyPathMap)
    const keyMatches = [];

    if (key !== undefined) {
      const keyRegex = new RegExp(`0.${key}`, 'g');
      const keyNumberOfLevels = `0.${key}`.split('.').length;

      Object.keys(keyPathMap).forEach((k) => {
        const matchingKey = k.match(keyRegex);

        if (matchingKey) {
          const match = matchingKey[0];

          if (match.split('.').length === keyNumberOfLevels) {
            keyMatches.push(keyPathMap[match]);
          }
        }
      });
    }

    const valueMatches = [];
    const valueRegex = new RegExp(`0.${value}`, 'g');
    const valueNumberOfLevels = `0.${value}`.split('.').length;


    Object.keys(keyPathMap).forEach((k) => {
      const matchingValue = k.match(valueRegex);

      if (matchingValue) {
        const match = matchingValue[0];

        if (match.split('.').length === valueNumberOfLevels) {
          valueMatches.push(keyPathMap[match]);
        }
      }
    });

    if (key !== undefined) {
      const collection = {};

      items.forEach((item, index) => {
        collection[keyMatches[index] || ''] = valueMatches;
      });

      return new this.constructor(collection);
    }

    return new this.constructor([valueMatches]);
  }

  if (key !== undefined) {
    const collection = {};

    items.forEach((item) => {
      if (nestedValue(item, value) !== undefined) {
        collection[item[key] || ''] = nestedValue(item, value);
      } else {
        collection[item[key] || ''] = null;
      }
    });

    return new this.constructor(collection);
  }
  return $this.map(items, (item) => {
    if (nestedValue(item, value) !== undefined) {
      return nestedValue(item, value);
    }
    return null;
  });
};



/** 
 * ดูข้อมูลเส้นทางพื้นฐาน
 * @param {String} path เพิ่มเส้นทาง
**/
exports.basePath = function (pathadd = '') {
  return path.resolve(__dirname, '../' + pathadd);
}
/** 
 * แปลงขนาดไบต์
 * @param {Integer} path จำนวนขนาดเป็น Bytes
**/
exports.formatBytes = function (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
/** 
 * เช็คเส้นทางพื้นฐาน หากไม่มี ระบบจะสร้างแฟ้มที่ระบุให้
 * @param {String} path เริ่มต้นเส้นทางที่ root path ของ project
**/
exports.checkPath = function (pathStore = '') {
  let p = pathStore.replace($this.basePath(), '')
  let p_l = _.last(p.split(/(\\|\/)/g))
  if (p_l.match(/\w+[.]+\w/g)) {
    p = p.replace(p_l, '')
  }
  $this.createDir('./' + p)
  return $this.basePath(p + p_l)
}


/** 
 * ดูข้อมูล AUTO_INCREMENT
 * @param {String} table ชื่อตารางฐานข้อมูล หรือ ตัวแปรของ Model
**/
exports.next = async function (table = '', dbname = '') {
  if (typeof table != 'string') {
    table = table.getTableName();
  }
  if (!dbname) {
    dbname = config.DB_NAME;
  }
  var Data = await seq.query({
    query: `SELECT  AUTO_INCREMENT
        FROM    information_schema.TABLES
        WHERE   (TABLE_SCHEMA = '${dbname}'  AND TABLE_NAME = '${table}')`
  });
  Data = JSON.parse(JSON.stringify(Data))
  // return Data
  return $this.isAutoIncrement(Data).AUTO_INCREMENT
}
/** 
 * @param {Object} data  ข้อมูล json
**/
exports.isAutoIncrement = function (data) {
  if (!data) {
    return {}
  }
  if (!data.AUTO_INCREMENT) {
    data = _.head(data)
    data = $this.isAutoIncrement(data)

  }
  return data;
}
/** 
 * ระบบจะสร้างแฟ้มที่ระบุหากไม่มี
 * @param {String} path สิ่งนี้จะสร้าง dir ที่กำหนดเส้นทางเช่น './folder/subfolder'
**/
exports.createDir = (dir) => {
  const splitPath = dir.split('/');
  splitPath.reduce((path, subPath) => {
    let currentPath;
    if (subPath != '.') {
      currentPath = path + '/' + subPath;
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
    }
    else {
      currentPath = subPath;
    }
    return currentPath
  }, '')
}
/**
 * ลบไดเรกทอรี recursively
 * @param {string} path
 */
exports.rimraf = (path, rmdir = false) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    if (rmdir) {
      fs.rmdirSync(path);
    }
  }
}

/** 
 * ค้นหาที่อยู่ไฟล์
 * @param {String} folder กำหนดเส้นทางเช่น './folder/subfolder'
 * @param {String} pattern กำหนดเงือนไข /.js/
 * @param {Function} callback กำหนดการแสดงผล
**/
exports.fromDir = function (folder, pattern = /.*/, callback) {
  var flist = [];

  fs.readdirSync(folder).map(function (e) {
    var fname = path.join(folder, e);
    var fstat = fs.lstatSync(fname);
    if (fstat.isDirectory()) {
      //     // don't want to produce a new array with concat
      Array.prototype.push.apply(flist, $this.fromDir(fname, pattern, callback));
    } else {
      if (pattern.test(fname)) {
        flist.push(fname);
        if (callback) {
          callback(fname);
        }
      }
    }
  });
  return flist;
}
/** 
 * เช็คข้อมูลหรือตัวแปร ว่า empty
 * @param {String} mixed_var ข้อมูลหรือตัวแปรที่ต้องการเช็ค
**/
exports.empty = (mixed_var) => {
  if (!mixed_var || mixed_var == '0') {
    return true;
  }
  if (typeof mixed_var == 'object') {
    for (var k in mixed_var) {
      return false;
    }
    return true;
  }
  return false;
}
/** 
 * เช็คข้อมูลว่า รูปแบบ json หรือสามารถแปลเป็น json ได้หรือไม่
 * @param {String} text ข้อมูลที่ต้องการเช็ค
**/
exports.testJSON = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  try {
    if (typeof JSON.parse(text) == 'object') {
      return true;
    }
    return false;
  }
  catch (error) {
    return false;
  }
}

/** 
 * paginations
 * @param {String} text ข้อมูลที่ต้องการเช็ค
**/
exports.range = (start, stop, step) => {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }
  if (typeof step == 'undefined') {
    step = 1;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }
  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}
exports.paginations = ($total = 0, $per_page = 15, $current_page = 1) => {
  var $first_page = 1,
    $last_page = Math.ceil($total / $per_page),
    $list_page = collect(_.concat($this.range($first_page, $last_page), [$last_page])).unique().all(),
    $next_page = _.indexOf($list_page, $current_page + 1) >= 0 ? $current_page + 1 : 0,
    $prev_page = _.indexOf($list_page, $current_page - 1) >= 0 ? $current_page - 1 : 0,
    $offset = !$this.empty(($current_page - 1) >= 0) ? ($current_page - 1) * $per_page : 0,
    $to = ($current_page * $per_page),
    $paging = {
      'total': $total,
      'current_page': $current_page,
      'per_page': $per_page,
      'first_page': $first_page,
      'last_page': $last_page,
      'next_page': $next_page,
      'prev_page': $prev_page,
      'offset': $offset,
      'to': $to < $total ? $to : $total,
      'list_page': $list_page
    }

  return $paging
}

exports.path_info = ($path) => {
  var $regex = /((?:[^/]*\/)*)(.*)([.].*)|((?:[^/]*\/)*)(.*)/g
  var $info = $regex.exec($path)
  $info = $this.filter($info)
    , $zip = ['fullpath', 'path', 'name']
  if (_.result($info, '[3]', false)) {
    $zip.push('ext')
  }
  $info = _.zipObject($zip, $info)
  $info['path'] = ($info['path']).replace(/^\//, '')
  $info['path'] = ($info['path']).replace(/\/$/, '')
  if (!$this.empty($info['ext'])) {
    $info['ext'] = ($info['ext']).replace(/[.]/, '')
    $info['filename'] = $info['ext'] ? `${$info['name']}.${$info['ext']}` : ''
  }
  return $info
}
exports.pathinfo = (fp) => {
  var info = {};
  var abs = path.resolve(fp);

  if (!fs.existsSync(abs)) {
    return url.parse(fp);
  }
  info.abspath = abs;
  info.abs = info.abspath;
  info.isAbsolute = path.isAbsolute ? path.isAbsolute(fp) : undefined;
  info.dirname = path.dirname(abs);
  info.extname = path.extname(abs);
  info.filename = path.basename(abs);
  info.basename = path.basename(abs, info.extname);
  info.separator = info.sep = path.sep;
  info.delimiter = path.delimiter;

  return info;
}

/** 
 * isNumber Valid
 * @param {String} text ข้อมูลที่ต้องการเช็คว่าเป็นตัวเลขหรือไม่
**/
exports.isNumber = (s) => {
  const str = ('' + s).trim();
  if (str.length === 0) return false;
  return !isNaN(+str);
}
exports.isNumeric = (value) => {
  return _.isNumber(value) || (!_.isEmpty(value) && !_.isNaN(value));
}
exports.getNumber = (s) => {
  if ($this.isNumeric(s)) {
    if (typeof s === 'string') {
      s = parseInt(s)
    }
  }
  return s;
}

exports.isBool = (s) => {
  var boolValue = s.toLowerCase() == 'true' ? true : false;
  return boolValue;
}
exports.isDate = (value) => {
  switch (typeof value) {
    case 'number':
      return true;
    case 'string':
      return !isNaN(Date.parse(value));
    case 'object':
      if (value instanceof Date) {
        return !isNaN(value.getTime());
      }
    default:
      return false;
  }
}
exports.thaiMonth = (value) => {
  var monthNamesThai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"];
  var monthNamesEng = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  var numMonth = 0;

  if ($this.isNumber(value)) {
    numMonth = typeof value == 'string' ? parseInt(value) + 1 : value + 1;
  } else if (_.indexOf(monthNamesEng, value) >= 0) {
    numMonth = _.indexOf(monthNamesEng, value) + 1
  }
  if (!$this.empty(numMonth)) {
    return monthNamesThai[numMonth - 1];
  } else {
    return value;
  }
}
exports.getNull = (value) => {
  if (typeof value == 'string') {
    return value.toUpperCase() == 'NULL'
  }
  return _.isNull(value)
}
exports.getBoolean = (value) => {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}
exports.getAgeFromBirthday = (birthday) => {
  if (birthday) {
    var totalMonths = moment().diff(birthday, 'months');
    var years = parseInt(totalMonths / 12);
    var months = totalMonths % 12;
    if (months !== 0) {
      return parseFloat(years + '.' + months);
    }
    return years;
  }
  return null;
}
/** 
 * get days In Year or days In Month 
 * @param {String|Integer} year ปี
 * @param {String|Integer} month เดือน
**/
exports.daysInMonth = (year, month = 0) => {
  var day = 0
  if (typeof year == 'string') {
    if ($this.isNumber(year)) {
      year = parseInt(year)
    }
  }
  if (!$this.empty(month)) {
    if (typeof month == 'string') {
      if ($this.isNumber(month)) {
        month = parseInt(month)
      }
    }
    day = new Date(year, month, 0).getDate();
  } else {
    for (var i = 1; i < 13; i++) {
      day = day + new Date(year, i, 0).getDate();
    }
  }
  return day;
}
exports.date = (dateString) => {
  if (typeof dateString == 'string') {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    var regEx1 = /^\d{2}-\d{2}-\d{4}$/;
    var regEx2 = /^\d{2}\/\d{2}\/\d{4}$/;

    if (dateString.match(regEx1)) {
      var matches = dateString.split('-')
      dateString = `${matches[2]}-${matches[1]}-${matches[0]}`
    }
    if (dateString.match(regEx2)) {
      var matches = dateString.split('/')
      dateString = `${matches[2]}-${matches[1]}-${matches[0]}`
    }
    if ($this.isNumber(dateString)) {
      dateString = parseInt(dateString)
    }
  }
  return moment(dateString)
}

exports.eachClass = ($data) => {
  var ini = {
    empty: false,
    except: []
  }
  var input = collect($data).map(input => {
    if (typeof input === 'string') {
      if ($this.testJSON(input)) {
        input = JSON.parse(input)
      }
    }
    return input
  }).all()
  var kkk = collect($data).map((r, k) => {
    if (typeof r === 'string') {
      if ($this.testJSON(r)) {
        r = JSON.parse(r)
      }
    }
    var data = {}
    data[k] = r
    return { key: k, val: r, data: data, len: _.isArray(r) ? r.length : 1 }
  })
    .values()
    .all()

  var max = collect(kkk).max('len')
  kkk = collect(kkk).where('len', max).first()
  var looper = kkk.len
  var attributes = Object.keys($data)
  var data_list = []
  for (let key = 0; key < looper; key++) {
    var lpAttr = {}
    for (let index = 0; index < attributes.length; index++) {
      if ($this.empty(ini.empty)) {
        lpAttr[attributes[index]] = _.isArray(input[attributes[index]]) ? input[attributes[index]][key] : input[attributes[index]];
      } else {
        lpAttr[attributes[index]] = _.isArray(input[attributes[index]]) ? !$this.empty(input[attributes[index]][key]) ? input[attributes[index]][key] : "" : !$this.empty(input[attributes[index]]) ? input[attributes[index]] : "";
      }
    }
    data_list[key] = lpAttr
  }
  return data_list
}

exports.query = ($model) => {
  const query = new classQuery($model)
  return query;
}

/**
 * assign organization relate.
 *
 * @param {$userId} [userId]- user id.
 * @param {$Ref} [Options]- Options config.
 * @example
 * await help.orgRelate(5,{groupId:1,relateTable:'survey',relateId:1})
 * await help.orgRelate(5,{groupId:1,positionId:1,relateTable:'survey',relateId:1})
 */

exports.orgRelate = async ($userId = null, $Ref = {}) => {
  var OrgRelate = $this.query('ml_organization_relate')
  var Relate = $this.query('ml_organization_relate')
  var data = {}
    , listId = []
  if (!$this.empty($userId)) {
    var user = $this.query('ml_organization_user')

    user.where('isAdmin', 'true')
    user.where('userId', $userId)
    if (!$this.empty($Ref.groupId)) {
      user.where('groupId', $Ref.groupId)
    }
    if (!$this.empty($Ref.positionId)) {
      user.where('positionId', $Ref.positionId)
    }
    data = await user.toJson()
    if ($this.empty(data)) {
      return []
    }
    if (data.lenght > 1) {
      return 'กรุณาระบุกอง'
    }
    data = _.head(data)
  }
  if (!$this.empty($Ref.groupId)) {
    data.groupId = $Ref.groupId
  }
  if (!$this.empty($Ref.positionId)) {
    data.positionId = $Ref.positionId
  }
  if ($this.empty(data)) {
    return []
  }



  if ($this.empty($Ref.relateTable) || $this.empty($Ref.relateId)) {
    return []
  }


  if (!$this.empty($Ref.relateTable)) {
    Relate.where('relateTable', $Ref.relateTable)
    Relate.relateTable = $Ref.relateTable
  }
  if (!$this.empty($Ref.relateId)) {
    Relate.where('relateId', $Ref.relateId)
    Relate.relateId = $Ref.relateId
  }

  if (!$this.empty(data.groupId)) {
    Relate.where('refTable', 'ml_organization_group')
    Relate.where('refId', data.groupId)
    Relate.refTable = 'ml_organization_group'
    Relate.refId = data.groupId
    let id = await Relate.createUpdate()
    listId = _.concat(listId, [id.dataValues])
  }
  if (!$this.empty(data.positionId)) {
    Relate.where('refTable', 'ml_organization_position')
    Relate.where('refId', data.positionId)
    Relate.refTable = 'ml_organization_position'
    Relate.refId = data.positionId
    let id = await Relate.createUpdate()
    listId = _.concat(listId, [id.dataValues])
  }
  return listId


}

exports.convertEnum = function ($model, obj) {
  let Model = seq.models[$model]
  for (let key of Object.keys(obj)) {
    if (_.has(Model, `fieldRawAttributesMap.${key}.values`) && Number.isInteger(obj[key])) {
      let arr = _.get(Model, `fieldRawAttributesMap.${key}.values`)
      obj[key] = arr[obj[key]]
    }
  }
  return obj
}

/**
 * insert or update
 */
exports.upsert = async function ($model, values, condition, options) {
  let Model = seq.models[$model]

  values = exports.convertEnum($model, values)

  let obj = condition && await Model
    .findOne({ where: condition, ...options })

  if (obj)
    return await Model.update(values, { where: condition, ...options });
  return await Model.create({ ...values, ...condition }, { returning: true, ignore: true, ...options });
}

exports.bulkUpdate = async function (model, values = [], condition = {}, options = {}, mapFunction = v => v) {
  function f1(arr) {
    let obj = {}
    for (let key of Object.keys(arr[0])) {
      obj[key] = arr.map(a => a[key])
    }
    return obj
  }

  let Model = seq.models[model]
  if (Array.isArray(values)) {
    values = values.map(mapFunction)
    let where = { $and: [seq.literal('1 = 1')] }
    if (condition) {
      where.$and.push(condition)
    }

    if (values.filter(v => v.id != 0).length > 0) {
      where.$and.push({
        id: {
          $not: {
            $in: values.filter(v => v.id).map(v => v.id)
          }
        }
      })
    }

    await Model.destroy({
      where,
      ...options
    })

    await Model.bulkCreate(values.map(v => ({ ...v, ...condition })), { ignoreDuplicates: true, ...options })
  } else {
    let _add = values._add || [],
      _remove = values._remove || [],
      _update = values._update || []
    if (_remove.length > 0) {
      await Model.destroy({
        where: {
          $and: [{
            ...f1(_remove.map(mapFunction)),
            // condition
          }]
        },
        ...options
      })
    }

    if (_add.length > 0) {
      await Model.bulkCreate(_add.map(mapFunction).map(v => exports.convertEnum(model, { ...v, ...condition, id: undefined })), {
        ignoreDuplicates: true, ...options
      })
    }

    if (_update.length > 0) {
      let p = []
      for (let d of _update.map(mapFunction)) {
        p.push(Model.update(exports.convertEnum(model, { ...d, ...condition }), { id: d.id, ...condition, ...options }))
      }
      await Promise.all[p]
    }
  }
}
