const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();
const cors = require('cors');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000' || 'http://localhost:3001' || 'http://141.144.204.231' || /^http:\/\/.*:3000$/,
  })
)

const app = express();
const port = 4000;

// Define the target URLs for your microservices
const service1Url = 'http://141.144.204.231:4001';
const inventoryService2Url = 'http://141.144.204.231:4002';

// Proxy requests for Service 1
app.use('/user', createProxyMiddleware({
  target: service1Url,
  changeOrigin: true,
  pathRewrite: {
    '^/userhandle': '', 
  },
}));

// Proxy requests for inventory management
app.use('/inventory', createProxyMiddleware({
  target: inventoryService2Url,
  changeOrigin: true,
  pathRewrite: {
    '^/inventoryservice': '', 
  },
}));

// Start the API Gateway server
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
