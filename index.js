
const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
var cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))
  
  // http.createServer(function(req, res) {
    //   httpProxy.web(req, res, { target: 'http://localhost:8080/' });
    // }).listen(4000)
    
    app.all('/reviews', (req, res) => {
      proxy.web(req, res, { target: 'http://localhost:8080' })
    })
    
    app.all('/api/getimageurls', (req, res) => {
      proxy.web(req, res, { target: 'http://localhost:3001'})
    })
    
    app.all('/images/:id', (req, res) => {
      proxy.web(req, res, { target: 'http://localhost:3000'})
    })
    
    
    app.listen(port, () => console.log(`Running on port: ${port}`))
