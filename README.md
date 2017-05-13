# write-file-to-socket

Write a file to & read a file from a socket.

```  sh
npm install write-file-to-socket
```

or install globally to use the CLI:

``` sh
npm install -g write-file-to-socket
```

## Example
server.js:
``` js
var WFTS = require('write-file-to-socket')
var wfts = new WFTS({
  port: 4801,
  file: 'hello-world.txt'
})
wfts.serve()
```

receiver.js
``` js
var WFTS = require('write-file-to-socket')
var wfts = new WFTS({
  port: 4801,
  file: 'hola-mundo.txt',
})
wfts.pull()
```
## Usage
There are *lots* of ways to send files to other people. But occasionally
there might be a time that you are at a computer wanting to share a file
with another person at a computer next to you. And maybe the usual methods for
sending a file just aren't cutting it: too big to send via Slack, pain to log into
Dropbox, AirDrop isn't finding you (??!). All you wanna do is pipe a file over to
them a la netcat:

``` sh
$ cat my-file.txt | nc -l 4000
```
which is probably what you should end up using. But now can also do with this
module. :raised_hands:

## methods
#### var wfts = require('write-file-to-socket')(opts)
options are `port`, `host`, `file`. Only required is `file` for serving.
Can take an absolute path but defaults to the current working directory.
``` js
var opts = { port: 4000, file: '/path/to/a/file.txt'}
wfts.serve()
// serving that file at localhost:4000
```
#### wfts.serve()
serves a file from the port as given in `opts`.

#### wfts.pull([cb])
reads a file from the port and host given opts and writes it to the file path
given. If no file path is set in `opts` then writes a file called `wfts-file` to
the current working directory.
Provides an optional callback that is run after the file transfer is complete.
``` js
wfts.pull(function () { console.log('just wrote a file!') })
```
# License
MIT
