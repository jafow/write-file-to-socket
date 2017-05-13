const net = require('net')
const fs = require('fs')
const path = require('path')

module.exports = WFTS

function WFTS (options) {
  if (!(this instanceof WFTS)) return new WFTS(options)
  if (!options) options = {}
  this.PORT = options.port || 4000
  this.host = options.host || 'localhost'
  this.file = toPath(options.file)
}

WFTS.prototype.serve = function serve () {
  const server = net.createServer((socket) => {
    socket.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })

    socket.on('end', () => {
      server.emit('close')
      server.close()
    })

    fs.createReadStream(this.file).pipe(socket)
  })

  server.listen(this.PORT)
}

WFTS.prototype.pull = function pull (cb) {
  if (!cb) cb = noop
  const fsw = fs.createWriteStream(this.file, 'utf8')

  const socket = net.connect(this.PORT, this.host, () => {
    socket.pipe(fsw).on('finish', cb)
  })

  socket.on('end', () => {
    socket.destroy()
    socket.unref().end()
  })

  socket.on('error', (err) => {
    console.error(err)
    cb(err)
    process.exit(1)
  })
}

function toPath (p) {
  if (!p) return 'wfts-file'
  if (!/\/d+/.test(p)) return path.join(__dirname, p)
  return p
}

function noop () {
}
