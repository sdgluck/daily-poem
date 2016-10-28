'use strict'

const jsdom = require('jsdom')

function open (url) {
  return new Promise((resolve, reject) => {
    jsdom.env({
      url,
      done: (err, window) => err
        ? reject(err)
        : resolve(window.document.querySelector.bind(window.document))
    })
  })
}

module.exports = function () {
  return open('http://poems.com/').then(($) => {
    const poemUrl = $('#daily_content')
      .querySelector('strong')
      .querySelector('a').href

    return open(poemUrl).then(($) => ({
      url: poemUrl,
      title: $('#page_title').textContent.trim(),
      author: $('#byline').querySelector('a').innerHTML.trim(),
      content: $('#poem').textContent.trim()
    }))
  })
}
