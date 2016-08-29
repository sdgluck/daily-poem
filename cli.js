#!/usr/bin/env node
'use strict'

const ora = require('ora')
const meow = require('meow')
const logUpdate = require('log-update')

const getDailyPoem = require('./api')

meow(`
  Usage
    $ daily-poem
`)

const spinner = ora()

setInterval(() => logUpdate(spinner.frame()), 50)

getDailyPoem()
  .then((poem) => {
    const poemContent = poem.content
      .split(/\n/).join('\n  ')

    const poemAuthor = poem.author
      .replace(/\s+/, ' ')

    const maxLineLength = poem.content
      .split(/\n/).reduce((max, str) => str.length > max ? str.length : max, 0)

    const separator = new Array(maxLineLength)
      .fill('-').join('')

    logUpdate('\n' +
      `  "${poem.title}"\n` +
      `  by ${poemAuthor}\n` +
      `  ${separator}\n\n` +
      `  ${poemContent}\n\n` +
      `  (${poem.url})`
    )
  })
  .catch((err) => console.log('A wild error appeared!\n' + err))
  .then(() => process.exit())
