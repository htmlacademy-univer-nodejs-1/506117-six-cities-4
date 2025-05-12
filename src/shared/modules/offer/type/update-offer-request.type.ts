import { Request } from 'express';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';

export type UpdateOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>;
