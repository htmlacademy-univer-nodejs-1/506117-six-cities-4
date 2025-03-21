#!/usr/bin/env node
import { GenerateCommand, HelpCommand, ImportCommand } from './cli/index.js';
import { CLIApp } from './cli/index.js';
import { VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApp();
  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);
  cliApp.processCommand(process.argv);
}

bootstrap();
