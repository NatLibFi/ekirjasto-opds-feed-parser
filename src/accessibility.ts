// First import Conformance and WaysOfReading classes
// from the files were they are defined
import Conformance from "./conformance";
import WaysOfReading from "./ways_of_reading";

// Define the Accessibility class
export default class Accessibility {
  // these properties can be objects or be undefined
  conformance?: Conformance;
  waysOfReading?: WaysOfReading;

  // This constructor is used when
  // we are initializing a new Accessibility object
  // with the given parameters
  constructor(args?: {
    conformance?: Conformance;
    waysOfReading?: WaysOfReading;
  }) {
    if (args) {
      this.conformance = args.conformance;
      this.waysOfReading = args.waysOfReading;
    }
  }
}

// AccessibilityArgs is an interface
// that extends the Accessibility class
// and allows it to inherit its properties.
export interface AccessibilityArgs extends Accessibility {}
