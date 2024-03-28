const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()
const port = 9000

app.use(cors())

app.use('/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  headers: {
    'X-Forwarded-For': '',
    'Via': '',
    'X-Real-IP': '',
    'X-Forwarded-Host': '',
    // 'Accept-Encoding': '',
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(+new Date())
    },
    proxyRes: (proxyRes, req, res) => {
      console.log(+new Date())
    },
    error: (err, req, res) => {
      /* handle error */
    },
  },
}));

app.listen(port, () => {
  console.log(`启动成功，端口：${port}`)
})