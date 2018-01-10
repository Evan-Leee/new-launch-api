import homepageRouter from './routers/homepage';
import listingRouter from './routers/listings';
export default (app) => {
  app.use('/', homepageRouter);
  app.use('/listings', listingRouter);
}