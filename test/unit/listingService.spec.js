import { ListingService } from '../../services/listingService';
import listing from '../../dao/solr/listings';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import sinon from 'sinon';
chai.use(chaiAsPromised);
const {expect} = chai;

describe('Listing Service', () => {
  describe('#getAllListings', () => {
    const baseResponse = {
      response: {
        numFound: 1,
        docs: [
          {name: 'listing'}
        ]
      },
      responseHeader: {
        status: 0
      }
    }
    it('should return all listings get from solr', async() => {
      sinon.stub(listing, 'search').callsFake(() => baseResponse);
      const listingService = new ListingService(listing);
      const result = await listingService.getAllListings();
      listing.search.restore();
      expect(result).to.deep.equal({
        number: 1,
        listings: [{name: 'listing'}]
      })
    })

    it('should throw error when the solr status is not 0', async() => {
      const errorResponse = Object.assign(baseResponse, {responseHeader: {status:1}});
      sinon.stub(listing, 'search').callsFake(() => errorResponse);
      const listingService = new ListingService(listing);
      expect(listingService.getAllListings()).to.eventually
      .be.rejectedWith('Solr search error!').and.be.an.instanceOf(Error);
      listing.search.restore();
    })
  })
  
})