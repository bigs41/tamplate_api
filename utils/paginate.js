const Url = require('url-parse')
const originalUrl = require('original-url')

module.exports = function (req, res, paginate) {
  let url = originalUrl(req).raw
  res.set('X-Total', paginate.totalDocs)
  res.set('X-Total-Pages', paginate.totalPages || 1)
  res.set('X-Per-Page', paginate.limit)
  res.set('X-Page', paginate.page || 1)
  res.set('X-Prev-Page', paginate.prevPage)
  res.set('X-Next-Page', paginate.nextPage)

  let linkUrl = new Url(url)
  let prevUrl = new Url(url, true)
  prevUrl.query = { ...prevUrl.query, page: paginate.prevPage, per_page: paginate.limit }

  let nextUrl = new Url(url, true)
  nextUrl.query = { ...nextUrl.query, page: paginate.nextPage, per_page: paginate.limit }

  let firstUrl = new Url(url, true)
  firstUrl.query = { ...firstUrl.query, page: 1 }

  let lastUrl = new Url(url, true)
  lastUrl.query = { ...lastUrl.query, page: paginate.totalPages }

  res.set('Link', `<${linkUrl.toString()}>; \
rel="prev"${paginate.hasPrevPage ? `, <${prevUrl.toString()}>` : ``}; \
rel="next"${paginate.hasNextPage ? `, <${nextUrl.toString()}>` : ``}; \
rel="first", <${firstUrl.toString()}>; \
rel="last", <${lastUrl.toString()}>; `)

  res.data = paginate.docs
}