const test = require('tape')
const ram = require('random-access-memory')
const fs = require('fs')
const wfts = require('../')

test('sends file', function (t) {
  t.plan(4)
  var server = new wfts({port: 3000, file: 'test/hello.txt'})
  var client = new wfts({port: 3000, file: 'test/world.txt'})
  server.serve()
  client.pull(pullCallback)

  function pullCallback () {
    fs.lstat('test/world.txt', function (err, stat) {
      t.equal(err, null)
        t.ok(stat.isFile(), 'makes a file')
    })

    fs.readFile('./test/world.txt', function (err, data) {
      t.equal(err, null)
      t.same(data.toString(), 'hello world\n', 'target data matches source')
    })
  }
})
