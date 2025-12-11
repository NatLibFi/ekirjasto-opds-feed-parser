export default class Conformance {
  conformsTo: string | undefined;

  constructor(args: ConformanceArgs) {
    Object.assign(this, args);
  }
}

export interface ConformanceArgs extends Conformance {}
