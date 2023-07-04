const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()
const port = 9000

app.use(cors())

app.use('/', createProxyMiddleware({
  target: 'https://yourappname.metered.live',
  changeOrigin: true,
  cookieDomainRewrite: 'yourappname.metered.live',
  headers: {
    'Host': 'yourappname.metered.live',
    'Referer': 'https://yourappname.metered.live',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
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