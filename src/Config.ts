
const {config} = require('dotenv').config();
import { Etcd3Config} from './Etcd3Config'
const etcd3 = new Etcd3Config(); 

if(process.env.CONFIG == 'distributed'){
  etcd3.put('PORT', '3000');
  etcd3.put('HOST', 'localhost');
  etcd3.put('URL', 'workwith-api/v1');
  etcd3.put('ROUTES_CV', 'routes');
  etcd3.put('ROUTES_OFFER', 'routes');
}

export default () => ({
    port: etcd3.get('PORT') || parseInt(process.env.PORT, 10) || 3000,
    host: etcd3.get('HOST')  || process.env.HOST || 'localhost',
    baseURL: etcd3.get('URL') || process.env.URL || 'workwith-api/v1',
    routesCV: etcd3.get('ROUTES_CV ') || process.env.ROUTES_CV || 'routes'
  });