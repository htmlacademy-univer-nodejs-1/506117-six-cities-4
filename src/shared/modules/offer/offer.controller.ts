import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/common.js';
import { SingleOfferRdo } from './rdo/single-offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferRequest } from './type/update-offer-request.type.js';
import { PreviewOfferRdo } from './rdo/preview-offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getAll });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.getSingle });
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/premiums', method: HttpMethod.Get, handler: this.getPremiums });
    this.addRoute({ path: '/favourites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/favourites/:id', method: HttpMethod.Post, handler: this.addFavorite });
    this.addRoute({ path: '/favourites/:id', method: HttpMethod.Delete, handler: this.removeFavorite });
  }

  public async getAll(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(PreviewOfferRdo, offers);
    this.ok(res, responseData);
  }

  public async getSingle({ params }: Request, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.findById(id);
    this.ok(res, fillDTO(SingleOfferRdo, offer));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const existsOffer = await this.offerService.findByTitle(body.title);

    if (existsOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with title "${body.title} exists."`,
        'OfferController'
      );
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(SingleOfferRdo, result));
  }

  public async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    const { id } = params;
    const updatedOffer = await this.offerService.updateById(id as string, body);
    this.ok(res, fillDTO(SingleOfferRdo, updatedOffer));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.deleteById(id);
    this.noContent(res, offer);
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favorites = await this.offerService.findFavorites();
    this.ok(res, fillDTO(PreviewOfferRdo, favorites));
  }

  public async getPremiums({ query }: Request, res: Response): Promise<void> {
    const { city } = query;
    if (city) {
      const offers = await this.offerService.findPremiumsByCity(city as string);
      this.ok(res, fillDTO(PreviewOfferRdo, offers));
    } else {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'OfferController'
      );
    }
  }

  public async addFavorite({ params }: Request, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.findById(id);

    if (offer) {
      const result = await this.offerService.addFavorite(id);
      this.ok(res, fillDTO(SingleOfferRdo, result));
    } else {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (offer) {
      const result = await this.offerService.removeFavorite(id);
      this.ok(res, fillDTO(SingleOfferRdo, result));
    } else {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }
  }
}
