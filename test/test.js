const test = require('tape')
const fs = require('fs')
const Wfts = require('../')

test('sends file', function (t) {
  t.plan(4)
  var server = new Wfts({port: 3000, file: 'test/hello.txt'})
  var client = new Wfts({port: 3000, file: 'test/world.txt'})
  server.serve()
  client.pull(function () {
    fs.lstat('test/world.txt', function (err, stat) {
      t.equal(err, null)
      t.ok(stat.isFile(), 'makes a file')
    })

    fs.readFile('test/world.txt', function (err, data) {
      t.equal(err, null)
      t.same(data.toString(), 'hello world\n', 'target data matches source')
    })
  })
})

test.onFinish(function () {
  fs.unlink('test/world.txt', function (err) {
    if (err) throw err
  })
})
