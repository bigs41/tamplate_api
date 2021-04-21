const CONF = require('./config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const log = require('./utils/log')
const numCPUs = require('os').cpus().length
const exitHook = require('async-exit-hook')
const debug = require('debug')('seq')
const cls = require('cls-hooked')
const namespace = cls.createNamespace('seq')
const _ = require('lodash')

Sequelize.useCLS(namespace)
const seqConfig = {
  host: CONF.DB_HOST,
  dialect: CONF.DB_DIALECT,
  directory: CONF.DB_DIRECTORY,
  pool: {
    max: 5,
    min: 0
  },
  port: CONF.DB_PORT,
  // logging: (() => {
  //   switch (env) {
  //     case 'production': return false
  //     case 'test': return log.debug
  //     default: return console.log
  //   }
  // })(),
  logging: function (sqlStr) {
    debug(sqlStr.replace(/^Executing \(default\): /, ''))
  },
  timezone: 'Etc/GMT-7',
  freezeTableName: true,
  operatorsAliases: {
    $and: Op.and,
    $is: Op.is,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like,
    $notLike: Op.notLike,
    $not: Op.not,
    $notin: Op.notIn,
    $ne: Op.ne,
    $in: Op.in,
    $btw: Op.between,
    $notbtw: Op.notBetween,
    $col: Op.col
  },
  timestamps: false,
  dateStrings: true,
  dialectOptions: {
    multipleStatements: true,
    dateStrings: true,
    decimalNumbers: true
  },
}

const seq = new Sequelize(CONF.DB_NAME, CONF.DB_USER, CONF.DB_PASS, seqConfig)

{
  const queryGenerator = seq.getQueryInterface().QueryGenerator
  const oldSelectFromTableFragment = queryGenerator.selectFromTableFragment;

  queryGenerator.selectFromTableFragment = function (options, model, attributes, tables, mainTableAs) {

    var baseFragment = oldSelectFromTableFragment.apply(this, arguments);

    var fragment = options.tag
      ? (`${baseFragment}/*TAG:${options.tag}*/`)
      : baseFragment
      ;

    return (fragment);
  };
}

exitHook(async done => {
  seq.close()
    .then(() => {
      log.info('close database connection')
      process.nextTick(() => {
        done()
      })
    })
    .catch(e => {
      console.error(e)
      done()
    })
})

module.exports = seq;