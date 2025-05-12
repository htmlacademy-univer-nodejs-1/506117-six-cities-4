import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { PREMIUM_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public findByTitle(title: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ title }).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.find().populate(['authorId']).exec();
    return offers;
  }

  public async deleteById(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(id).exec();
  }

  public async updateById(
    id: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
  }

  public async incrementCommentsCount(
    id: string,
    newRate: number
  ): Promise<DocumentType<OfferEntity> | null> {
    await this.offerModel.updateOne(
      { _id: id },
      [
        {
          $set: {
            commentsNum: { $add: ['$commentsNum', 1] },
            rate: {
              $divide: [
                {
                  $add: [
                    { $multiply: ['$rate', '$commentsNum'] },
                    newRate,
                  ],
                },
                { $add: ['$commentsNum', 1] },
              ],
            },
          },
        },
      ]
    ).exec();

    return this.offerModel.findById(id).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({
        createAt: SortType.Down,
      })
      .limit(count)
      .populate(['authorId'])
      .exec();
  }

  public async findDiscussed(
    count: number
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({
        createAt: SortType.Down,
      })
      .limit(count)
      .populate(['authorId'])
      .exec();
  }

  public async exists(docId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: docId })) !== null;
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await OfferModel.create(dto);
    this.logger.info(`Created offer with title: ${dto.title} ${result}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).populate(['authorId']).exec();
  }

  public async findOrCreate(
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity>> {
    const existedOffer = await this.offerModel
      .findOne({ title: dto.title })
      .populate(['authorId'])
      .exec();

    if (existedOffer) {
      return existedOffer;
    }

    return (await this.create(dto)).populate('authorId');
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({ isFavorite: true })
      .populate('authorId')
      .exec();
  }

  public async findPremiumsByCity(
    city: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.Down })
      .limit(PREMIUM_OFFER_COUNT)
      .populate('authorId')
      .exec();
  }

  public async addFavorite(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { isFavourite: true }, { new: true })
      .populate('authorId')
      .exec();
  }

  public async removeFavorite(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { isFavourite: false }, { new: true })
      .populate('authorId')
      .exec();
  }
}
