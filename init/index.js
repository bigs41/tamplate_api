const Sequelize = require('sequelize')
const CONF = require('../config')
const log = require('../utils/log')
const _ = require('lodash')
const argv = require('yargs').argv
const fs = require('fs');
const path = require('path')
const debug = require('debug')('init')

let p

module.exports = function (force = argv.forceInit, data = true) {
    return p = new Promise(async r => {
        p && await p

        debug(`create database \`${CONF.DB_NAME}\``)
        // await seq.query(`CREATE DATABASE IF NOT EXISTS \`${CONF.DB_NAME}\` character set UTF8mb4 collate utf8mb4_unicode_ci`)

        const mysql = require('mysql2/promise');
        try {
            const connection = await mysql.createConnection({
                host: CONF.DB_HOST,
                user: CONF.DB_USER,
                password: CONF.DB_PASS
            });
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${CONF.DB_NAME}\` character set UTF8mb4 collate utf8mb4_unicode_ci`)
        } catch (e) {
            console.warn('can not create database if not exists')
        }

        let hasInitData = force
        seq = await require('../db')

        let tables = _.compact((await seq.query(`SHOW tables`))[0].map(d => d[Object.keys(d)[0]]).filter(d => d != 'sessions'))

        if (force && tables.length > 0) {
            await seq.query("SET FOREIGN_KEY_CHECKS = 0")

            log.info(`drop tables`)
            await seq.query(`DROP TABLE IF EXISTS ${tables.map(d => '`' + d + '`').join(', ')}`)
            tables = []

            await seq.query("SET FOREIGN_KEY_CHECKS = 1")
        }

        debug(tables.length)
        if (tables.length <= 0) {
            try {
                log.info('create table')
                hasInitData = true
                var queries = fs.readFileSync(path.resolve(__dirname, 'schema.sql'), 'utf8')
                await seq.query(queries)
            } catch (e) {
                console.error('can not create schema')
                process.exit(1)
            }
        }

        if (hasInitData && data) {
            var queries = fs.readFileSync(path.resolve(__dirname, 'data.sql'), 'utf8')
            await seq.query(queries)

            await require('../models')
            log.info('init-data')
            await require('./init-data')
        }
        r()
    })
}

if (process.argv[1] == __filename) {
    module.exports(argv[0])
        .then(() => process.exit(0))
        .catch(e => {
            console.error(e)
            process.exit(1)
        })
}