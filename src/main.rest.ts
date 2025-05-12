import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest-application.js';
import { Component } from './shared/types/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

function bootstrap() {
  const appContainer = new Container();

  createRestApplicationContainer(appContainer);
  createUserContainer(appContainer);
  createOfferContainer(appContainer);
  createCommentContainer(appContainer);

  const app = appContainer.get<RestApplication>(Component.RestApplication);

  app.init();
}

bootstrap();
