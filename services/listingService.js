import listingModel from '../dao/solr/listings';

export const getAllListings = async() => {
  const listingCollection = await listingModel.search();
  return {
    number: listingCollection.response.numFound,
    listings: listingCollection.response.docs
  };
}

export const getListing = async(id) => {
  const listingCollection = await listingModel.search(id);
  return listingCollection;
}