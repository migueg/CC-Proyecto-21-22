
const {config} = require('dotenv').config();


export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || 'localhost',
    baseURL: process.env.URL || 'workwith-api/v1',
    routesCV: process.env.ROUTES_CV || 'routes'
  });