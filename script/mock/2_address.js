const moment = require('moment-timezone')
const bcrypt = require('../../utils/bcrypt')
const _ = require('lodash')

module.exports = (async (ADDRESS_TOTAL = 100) => {
  const CONF = require('../../config')
  await CONF.initialize()
  await require('../../models')
  const seq = require('../../db')
  const help = require('../../utils/helpers')

  const t = await seq.transaction()
  try {
    await seq.query('SET FOREIGN_KEY_CHECKS=0;', { transaction: t })

    const Address = seq.models.moe_address

    const faker = require('faker/locale/en')

    faker.seed(1)


    const addresss = []

    for (let i = addresss.length; i < ADDRESS_TOTAL; i++) {
      const userId = i
      addresss.push({
        houseCode: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        number: faker.random.number({ min: 1, max: 200 }),
        villageNo: faker.random.number({ min: 1, max: 20 }),
        alley: faker.name.findName(),
        lane: faker.name.findName(),
        road: faker.name.findName(),
        subDistrict: faker.name.findName(),
        district: faker.name.findName(),
        province: faker.name.findName(),
        postalCode: faker.random.number({ min: 1e5, max: 10e5 - 1 })
      })
    }

    await Address.destroy({
      where: {},
      truncate: true,
      transaction: t
    })
    await Address.bulkCreate(addresss, { transaction: t })

    await seq.query('SET FOREIGN_KEY_CHECKS=1;', { transaction: t })
    t.commit()
  } catch (err) {
    t.rollback()
    throw err
  }
})()