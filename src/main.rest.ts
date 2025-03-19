import { Container } from 'inversify';
import { RestApplication } from './rest/rest-application.js';
import { Config, RestConfig } from './shared/libs/config/index.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { Component } from './shared/types/component.enum.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';

function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);

  app.init();
}

bootstrap();
