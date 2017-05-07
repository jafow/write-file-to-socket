var WFTS = require('./')
var wfts = new WFTS({
  port: 4801,
  file: 'hello.txt'
})

wfts.serve()
// serving `hello.txt` on port 4801


