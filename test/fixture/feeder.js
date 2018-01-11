import solr from 'solr-client';
import data from './testData.json';
import bluebird from 'bluebird';

(async() => {
  const HOST = '127.0.0.1';
  const PORT = '8983';

  const feedListings = async() => {
    const listingClient = bluebird.promisifyAll(solr.createClient({
      host: HOST,
      port: PORT,
      core: 'listings'
    }));
    let listings;
    try {
      listings = await listingClient.searchAsync(listingClient.createQuery().q('*:*'));
      if (listings.response.numFound) {
        await listingClient.deleteByQueryAsync('*:*');
      }
      await listingClient.addAsync(data.listings);
      await listingClient.commitAsync();
    } catch (e) {
      throw new Error(e);
    }
  };
  await feedListings();
})();
