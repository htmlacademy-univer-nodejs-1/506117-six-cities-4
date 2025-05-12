import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findByTitle(title: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreate(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incrementCommentsCount(id: string, rate: number): Promise<DocumentType<OfferEntity> | null>;
  findNew(count: number): Promise<DocumentType<OfferEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]>;
  exists(docId: string): Promise<boolean>;
  findFavorites(): Promise<DocumentType<OfferEntity>[] | null>;
  findPremiumsByCity(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  addFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFavorite(offerId: string): Promise<DocumentType<OfferEntity> | null>
}
