const path = require('path')
const find = require('find')

  ;
(async () => {
  var normalizedPath = __dirname

  function getIndex(name) {
    return parseInt(name.replace(/^([0-9]+)_.*/gmi, '$1'))
  }

  const files = find
    .fileSync(normalizedPath)
    .filter(f => /[0-9]+_/gmi.test(f))
    .sort((a, b) => {
      return getIndex(path.basename(a)) > getIndex(path.basename(b)) ? 1 : -1
    })

  for (let file of files) {
    await require(file)
  }

  process.exit(0)
})()