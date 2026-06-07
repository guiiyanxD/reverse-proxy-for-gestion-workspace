const express = require('express');
const cors = require('cors');
const {createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(['/api', '/auth'], createProxyMiddleware ({
	target: 'http://uhqu8rqq4t33xe1c0012wvrb.155.133.27.31.sslip.io',
	changeOrigin: true,
	pathRewrite: {
        '^/api': ''
    },
	onProxyReq: (proxyReq, req, res) => {
        if (req.method === 'OPTIONS') {
            res.status(200).send();
        }
    }
}));

app.use('/graphql', createProxyMiddleware({
	target: 'http://usermanagement-prod.eba-pdsbyyjq.us-east-1.elasticbeanstalk.com',
	changeOrigin: true,
	onProxyReq: (proxyReq) => {
		proxyReq.removeHeader('origin');
		proxyReq.removeHeader('referer');
	}
}));

app.listen(3000, ()=>console.log('Proxy corriendo en el puerto 3000'));
