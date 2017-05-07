const net = require('net')
const fs = require('fs')
const path = require('path')

module.exports = WFTS

function WFTS (options) {
  this.PORT = options.port || 4000
  this.host = options.host || 'localhost'
  this.file = toPath(options.file)
  this.cmd = options.cmd
}

WFTS.prototype.serve = function serve () {
  const server = net.createServer((socket) => {
    socket.on('end', close)
    socket.on('error', (err) => {
      throw err
    })

    fs.createReadStream(this.file).pipe(socket)
  })

  server.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })

  server.on('close', close)
  server.listen(this.PORT)
}

WFTS.prototype.pull = function pull () {
  const fsw = fs.createWriteStream(this.file, 'utf8')

  const socket = net.connect(this.PORT, this.host, () => {
    socket.pipe(fsw).on('finished', () => { console.log('hooo')})
  })

  socket.on('end', () => {
    console.log('transfer complete')
    socket.destroy()
    socket.end()
  })

  socket.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
}

function toPath(p) {
  if (!/\/d+/.test(p)) return path.join(__dirname, p)
  return p
}

function close () {
  console.log('client disconnected')
  process.exit(0)
}

