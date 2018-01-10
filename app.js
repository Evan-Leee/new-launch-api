import express from 'express';
import bodyParser from 'body-parser';
import setRoutes from './routes';
import logger from 'morgan';

const app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setRoutes(app);

app.use('*', (req, res, next) => {
  res.status(404).send('Not Found this api!');
})


export default app;
