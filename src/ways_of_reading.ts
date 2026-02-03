export default class WaysOfReading {
  features: Array<string> | undefined;

  constructor(args: WaysOfReadingArgs) {
    Object.assign(this, args);
  }
}

export interface WaysOfReadingArgs extends WaysOfReading {}
