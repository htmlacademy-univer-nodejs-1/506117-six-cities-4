import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { DefaultOfferService } from './default.offer-service.js';
import { types } from '@typegoose/typegoose';

export function createOfferContainer(appContainer: Container) {
  appContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  appContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
}
