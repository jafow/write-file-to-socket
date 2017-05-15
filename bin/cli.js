#!/usr/bin/env node

const WFTS = require('../')
const argv = require('minimist')(process.argv.slice(2))

const command = argv._[0];
const options = {
  file: argv._[1],
  port: argv.p,
  host: argv.h,
}
if (argv.help) {
  console.log('usage: wfts <command> [file] [-p PORT] [-h host] [--help] \n')
  console.log('example: \n')
  console.log('Serve a file on default host and port (localhost:4000)\n')
  console.log('\t$ wfts serve my-file.txt\n')
  console.log('Receive a file on host 10.1.2.3 and port 3333 and save it to the' +
      ' current working directory as "my-received-file.txt"\n')
  console.log('\t$ wfts pull my-received-file.txt -h 10.1.2.3 -p 3333\n')
  process.exit(0)
}
new WFTS(options)[command]()
