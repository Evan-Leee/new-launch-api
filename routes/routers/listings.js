import express from 'express';
import { findAllListings, findListingById } from '../../controllers/listings';
const router = express.Router();

router.get('/', findAllListings);

router.get('/:id', findListingById);

export default router;