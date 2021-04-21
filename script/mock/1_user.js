const moment = require('moment-timezone')
const bcrypt = require('../../utils/bcrypt')
const _ = require('lodash')

module.exports = (async (USER_TOTAL = 1000) => {
  const CONF = require('../../config')
  await CONF.initialize()
  await require('../../models')
  const seq = require('../../db')
  const help = require('../../utils/helpers')

  const t = await seq.transaction()
  try {
    await seq.query('SET FOREIGN_KEY_CHECKS=0;', { transaction: t })

    const User = seq.models.moe_user

    const faker = require('faker/locale/en')
    faker.seed(1)

    let password = bcrypt.hash('123456')

    const users = []

    for (let i = users.length; i < USER_TOTAL; i++) {
      const userId = i
      users.push({
        userId,
        userType: faker.random.arrayElement(['ประชาชน'])
      })
    }

    for (let user of users) {
      user.idCard = ('0000000000000' + user.userId).slice(-13)
      user.email = faker.internet.email();
      user.password = user.password || password
    }

    await User.destroy({
      where: {},
      truncate: true,
      transaction: t
    })
    await User.bulkCreate(users, { transaction: t })

    await seq.query('SET FOREIGN_KEY_CHECKS=1;', { transaction: t })
    t.commit()
  } catch (err) {
    t.rollback()
    throw err
  }
})()