#!/usr/bin/env node
import { Container } from 'inversify';
import { GenerateCommand, HelpCommand, ImportCommand } from './cli/index.js';
import { CLIApp } from './cli/index.js';
import { VersionCommand } from './cli/index.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { Component } from './shared/types/component.enum.js';
import { createCliAppContainer } from './cli/cli-app.container.js';

function bootstrap() {
  const appContainer = new Container();

  createCliAppContainer(appContainer);
  createUserContainer(appContainer);
  createOfferContainer(appContainer);

  const cliApp = appContainer.get<CLIApp>(Component.CliApplication);
  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    appContainer.get<ImportCommand>(Component.ImportCommand),
    new GenerateCommand()
  ]);
  cliApp.processCommand(process.argv);
}

bootstrap();
