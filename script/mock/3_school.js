const moment = require('moment-timezone')
const bcrypt = require('../../utils/bcrypt')
const _ = require('lodash')

module.exports = (async (SCHOOL_TOTAL = 100) => {
  const CONF = require('../../config')
  await CONF.initialize()
  await require('../../models')
  const seq = require('../../db')
  const help = require('../../utils/helpers')

  const t = await seq.transaction()
  try {
    await seq.query('SET FOREIGN_KEY_CHECKS=0;', { transaction: t })

    const School = seq.models.moe_school

    const faker = require('faker/locale/en')

    faker.seed(1)

    const addresses = await help.query('moe_address').select(['id']).toJson()

    const schools = []

    for (let i = schools.length; i < SCHOOL_TOTAL; i++) {
      const userId = i
      schools.push({
        nameTh: faker.company.companyName(),
        // nameEn: faker.locale('th').company.companyName(),
        // belongsTo
        addressId: faker.random.arrayElement(addresses).id
      })
    }

    for (let s of schools) {
      s.nameEn = s.nameTh
    }

    await School.destroy({
      where: {},
      truncate: true,
      transaction: t
    })
    await School.bulkCreate(schools, { transaction: t })

    await seq.query('SET FOREIGN_KEY_CHECKS=1;', { transaction: t })
    t.commit()
  } catch (err) {
    t.rollback()
    throw err
  }
})()