var net = require('net')
var fs = require('fs')
var path = require('path')
const through = require('through2')
const FILE = process.argv[2]
const HOST = process.argv[3] || 'localhost'
const fsw = fs.createWriteStream(FILE, { flags: 'w', defaultEncoding: 'utf8', autoClose: true })

var c = net.connect(4801, HOST, () => {
  c.pipe(through(write))
    .pipe(fsw).on('finished', end)
})

c.on('end', () => {
  console.log('connection ended')
  c.destroy()
  c.end()
})

c.on('error', (err) => {
  console.error(err)
  process.exit(1)
})

function write (buf, enc, done) {
  this.push(buf.toString())
  done()
}

function end(done) {
  done()
  process.exit(0)
}
