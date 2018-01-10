import homepageRouter from './routers/homepage';

export default (app) => {
  app.use('/', homepageRouter);
}