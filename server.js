const express = require('express');
const cors = require('cors');
const {createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', createProxyMiddleware ({
	target: 'http://uhqu8rqq4t33xe1c0012wvrb.155.133.27.31.sslip.io',
	changeOrigin: true,
	onProxyReq: (proxyReq, req, res) => {
        if (req.method === 'OPTIONS') {
            res.status(200).send();
        }
    }
}));

app.listen(3000, ()=>console.log('Proxy corriento en el puerto 3000'));
