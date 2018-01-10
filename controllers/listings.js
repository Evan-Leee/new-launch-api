import { getAllListings, getListing } from '../services/listingService';

export const findAllListings = async(req, res, next) => {
  const listings = await getAllListings();
  res.send(listings);
}

export const findListingById = async(req, res, next) => {
  const id = req.params.id;
  const listing = await getListing(id);
  res.send(listing);
}