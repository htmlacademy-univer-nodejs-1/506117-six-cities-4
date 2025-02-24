#!/usr/bin/env node
import { HelpCommand, ImportCommand } from './cli/index.js';
import { CLIApp } from './cli/index.js';
import { VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApp();
  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);
  cliApp.processCommand(process.argv);
}

bootstrap();
