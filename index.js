
require('dotenv');
const Express = require("express");
const cors = require("cors");
const { port } = require('./config');
const { connections } = require('./config/database');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');
const cron = require('node-cron');

const app = Express();
app.use(cors());
app.use(Express.json());

// API routes
app.use(routes);

const cronService = require("./services/cron");

cron.schedule('0 0 * * *', () => {
  cronService.updateColumnsInTasks();
}, {
  scheduled: true,
  timezone: "America/Toronto"
});

app.get('/', (req, res) => {
  res.send('working server');
});

// Error Middlewares
app.use(errorHandler.methodNotAllowed);
app.use(errorHandler.genericErrorHandler);

// let database;
app.listen(port, () =>  {
  console.log(`Server is listening on port ${port}...`);
})

const closeHandler = () => {
  Object.values(connections).forEach((connection) => connection.close());

  server.close(() => {
    console.log('Server is stopped succesfully');
    process.exit(0); /* eslint-disable-line */
  });
};

process.on('SIGTERM', closeHandler);
process.on('SIGINT', closeHandler);