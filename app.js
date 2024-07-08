const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()
const port = 9000

app.use(cors())

app.use('/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.removeHeader('X-Forwarded-For')
    proxyReq.removeHeader('Via')
    proxyReq.removeHeader('X-Real-IP')
    proxyReq.removeHeader('X-Forwarded-Host')
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.16(0x1800103e) NetType/WIFI Language/en-us')
    console.log(new Date())
  },
}));

app.listen(port, () => {
  const host = 'localhost'
  console.log(`启动成功：http://${host}:${port}`)
})