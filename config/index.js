const { env } = process;
let envFile = '.env';

if (env.NODE_ENV) {
  switch (env.NODE_ENV.toString().trim()) {
    case 'development':
      envFile = '.dev.env';
      break;
    case 'prod':
      envFile = '.env';
      break;
    default:
      envFile = '.dev.env';
      break;
  }
} else {
  env.NODE_ENV = 'development';
  envFile = '.dev.env';
}

// Load env variables from file based on NODE_ENV
require('dotenv').config({ path: `./${envFile}`, silent: true });

const envConfigs = {
  host: env.HOST,
  port: env.PORT,
  mongodbUserUri: "mongodb+srv://userone:dbUserPassword@cluster0.ku6cdjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//   `mongodb+srv://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`;
}

module.exports = {...envConfigs};