const shelljs = require('shelljs')
const path = require('path')

shelljs.cd(path.resolve(__dirname, '../../app'))
shelljs.exec('yarn generate', { silent: false })


shelljs.cd(path.resolve(__dirname, '../'))
shelljs.exec('docker build .', { silent: false })
