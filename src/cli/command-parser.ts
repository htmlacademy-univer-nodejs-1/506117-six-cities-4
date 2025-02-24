type ParsedArgs = Record<string, string[]>;

export class CommandParser {
  public static parseArgv(argv: string[]): ParsedArgs {
    const args: ParsedArgs = {};

    let curArg = '';
    for (const arg of argv) {
      if (arg.startsWith('--')) {
        curArg = arg;
        args[curArg] = [];
      } else if (curArg) {
        args[curArg].push(arg);
      }
    }

    return args;
  }
}
