const http = require('http')
const fs = require('fs')
const crypto = require('crypto')
const jsonstream = require('JSONStream')

function respond500 (res) {
  return (err) => {
    console.error(err)
    res.statusCode = 500;
    res.end(`An error occurred: ${err.message}`)
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  
  if (/\/trades\/?/.test(req.url)) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    fs.createReadStream(__dirname + '/../assets/data.json')
      .pipe(jsonstream.parse('*', (trade) => {
        trade.id = crypto.createHmac('sha256', 'DF8enCXZCJeIJFf')
          .update(trade.LiquidityProvider + trade.Client)
          .digest('hex')
        return trade
      }))
      .pipe(jsonstream.stringify())
      .pipe(res)
  } else {
    res.statusCode = 404
    res.end('Nothing found.')
  }
})

server.listen(8090)

console.log('Server listening on 8090')
