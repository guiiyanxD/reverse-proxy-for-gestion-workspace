const express = require('express');
const {createProxyMiddelware} = require('http-proxy-middelware');
const app = express();

app.use('/api', createProxyMiddelware({
	target: 'http://uhqu8rqq4t33xe1c0012wvrb.155.133.27.31.sslip.io',
	changeOrigin: true
}));

app.listen(3000, ()=>console.log('Proxy corriento en el puerto 3000'));
