import { inject, injectable } from 'inversify';
import { CommandParser } from './command-parser.js';
import { Command } from './command/command.interface.js';
import { Component } from '../shared/types/component.enum.js';
import { Logger } from '../shared/libs/logger/logger.interface.js';

type CommandsRecord = Record<string, Command>;

@injectable()
export class CLIApp {
  private commands: CommandsRecord = {};

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    public readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandsArr: Command[]): void {
    commandsArr.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} already added`);
      }
      this.commands[command.getName()] = command;
    });

    this.logger.info(`Registered commands: ${this.commands}`);
  }

  public getDefaultCommand(): Command {
    if (!Object.hasOwn(this.commands, this.defaultCommand)) {
      throw Error('Default command is not registered');
    }

    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processCommand(argv: string[]): void {
    const commandData = CommandParser.parseArgv(argv);
    const [commandName] = Object.keys(commandData);
    const command = this.getCommand(commandName);
    const commandParams = commandData[commandName];

    this.logger.info(`Start executing command: ${commandName} with params: ${commandParams}`);
    command.execute(...commandParams);
    this.logger.info(`${commandName} executed successfully`);
  }
}
