const SequelizeAuto = require('sequelize-auto-v3')
const mysqldump = require('mysqldump');
const conf = require('../config')
const path = require('path')
const shell = require('shelljs')
const _ = require('lodash')
const fs = require('fs')
const seq = require('../db')

shell.rm('-rf', [path.resolve(__dirname, '../models')])
var auto = new SequelizeAuto(conf.DB_NAME, conf.DB_USER, conf.DB_PASS, {
  host: conf.DB_HOST,
  port: conf.DB_PORT,
  directory: path.resolve(__dirname, '../models'),
  // skipTables: [/^_.*$/, /^\-.*$/, 'ml_user_copy', /.*_copy$/gmi, 'sessions'],
  dialect: conf.DB_DIALECT
});
const schemaFile = path.resolve(__dirname, '../init/schema.sql')

auto.run(async function (err) {
  if (err) throw err;

  const tables = _.compact((await seq.query(`SHOW tables`))[0].map(d => d[Object.keys(d)[0]]).filter(d => d != 'sessions'))
  await mysqldump({
    connection: {
      host: conf.DB_HOST,
      user: conf.DB_USER,
      password: conf.DB_PASS,
      database: conf.DB_NAME,
      port: conf.DB_PORT,
    },
    dump: {
      lockTables: true,
      tables,
      data: false,
      schema: {
        autoIncrement: false
      },
      trigger: false
    },
    dumpToFile: schemaFile
  })

  const data = fs.readFileSync(schemaFile, 'utf8');
  const result = data.replace(/utf8mb4_0900_ai_ci/gmi, 'utf8mb4_general_ci');
  fs.writeFileSync(schemaFile, result, 'utf8');

  shell.rm('-rf', ['models/-*', 'models/_*'])

  try {
    shell.exec('git add models')
    shell.exec('git add init/schema.sql')
  } catch (e) { }

  process.exit(0)
});