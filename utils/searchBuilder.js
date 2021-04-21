const _ = require('lodash')

module.exports = function (str, attrs = []) {
  let words = _.compact(str.match(/((\+|\-)?"[^"]*("))|((\+|\-)?[^ "]*())/gm))
  const r = []

  words = words.map(w => w.replace(/^(\+|-)?"?|"$/gmi, '$1'))

  for (let a of attrs) {
    let l = []
    for (let w of words.filter(w => /^"|^[^+-]/gmi.test(w))) {
      l.push({ $like: '%' + w + '%' })
    }
    for (let w of words.filter(w => /^\+/gmi.test(w))) {
      l.push({ $like: '%' + w.replace(/^\+/gmi, '') + '%' })
    }
    for (let w of words.filter(w => /^\-/gmi.test(w))) {
      l.push({ $notLike: '%' + w.replace(/^\-/gmi, '') + '%' })
    }
    if (l.length > 0)
      r.push({ [a]: { $and: l } })
  }
  
  return r
}