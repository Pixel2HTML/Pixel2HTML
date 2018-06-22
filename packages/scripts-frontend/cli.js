#!/usr/bin/env node

const { compiler } = require('./dist/common.js')
const args = process.argv.slice(2)

const commands = [
  'development',
  'production',
  'debug',
]

// Find the first right command
const scriptIndex = args.findIndex(
  x => commands.includes(x)
)

// The right command or the first one...
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

switch (script) {
  case 'development':
    compiler('development')
    break
  case 'production':
    compiler('production')
    break
  case 'debug':
    compiler('debug')
    break
  default:
    console.log('Unknown command "' + script + '"')
    console.log('Available commands are:')
    commands.map(c => { console.log(c) })
    break
}
