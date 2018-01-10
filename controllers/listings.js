import listingService from '../services/listingService';

export const findAllListings = async(req, res, next) => {
  const listings = await listingService.getAllListings();
  res.send(listings);
}

export const findListingById = async(req, res, next) => {
  const id = req.params.id;
  const listing = await listingService.getListing(id);
  res.send(listing);
}