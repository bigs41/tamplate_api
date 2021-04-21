const _ = require('lodash')
const jwt = require('../utils/jwt')
const help = require('../utils/helpers')
var io;

function createInstance(server) {
  const CONF = require('../config')

  io = require('socket.io')(server, {
    transports: ['websocket'],
    path: '/api/socket.io',
    pingInterval: CONF.SOCKET_IO.PING_INTERVAL
  })
  const redis = require('socket.io-redis')
  if (CONF.REDIS_URL)
    io.adapter(redis(CONF.REDIS_URL));

  io.on('connection', function (socket) {
    let token = _.get(socket, 'handshake.query.token')

    if (token) {
      try {
        const payload = jwt.verify(token)
        const userId = _.get(payload, 'user.id')
        socket.join('user-' + userId)
      } catch (e) {
      }
    }
    socket.on('sendMessage', function (socket) {
      console.log(socket);
    })
    socket.on('disconnect', function (socket) {
    })
  })

  return io
}

module.exports = (function () {
  return {
    getInstance: function (server) {
      if (!io) {
        io = createInstance(server);
      }
      return io;
    },
    socket: io,
    async sendTotalUnreadNotifications(userId) {
      return io.to('user-' + userId)
        .emit(
          'commit',
          'totalNotification',
          await help.query('notification')
            .where('userId', userId)
            .where('isRead', '0')
            .count()
        )
    }
  };
})()