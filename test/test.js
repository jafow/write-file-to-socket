const test = require('tape')
const ram = require('random-access-memory')
const fs = require('fs')
const wfts = require('../')

test('sends file', function (t) {
  t.plan(2)
  var file = ram(Buffer.from('hello world'))
  var server = new wfts({port: 3000, file: 'test/hello.txt'})
  var client = new wfts({port: 3000, file: 'test/world.txt'})
  server.serve()
  client.pull()

  fs.lstat('./test/world.txt', function (err, stat) {
    t.equal(null, err)
    t.ok(stat.isFile())
  })

})

test('file is same', function (t) {
  fs.readFile('./test/world.txt', function (err, d) {
    t.equal(null, err)
    t.deepEqual(Buffer.from('hello world'), d)
    t.end()
  })
})
