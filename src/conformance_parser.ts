import Conformance, { ConformanceArgs } from "./conformance";
import Xml2jsOutputParser from "./xml2js_output_parser";

// this class extends Xml2jsOutputParser
// to handle parsing of conformance accessibility data
export default class ConformanceParser extends Xml2jsOutputParser<
  Conformance
  > {

  // parse function gets a tag <conformance>
  // and extracts Conformance data from it
  parse(tag: any): Conformance {

    // extract the 'conformsTo' value from the tag
    // using the helper function.
    const conformsTo = this.extractConformsTo(tag);

    // return new Conformance instance
    return this.createConformance(conformsTo);
  }

  // helper function to extract the 'conformsTo' value from the tag
  private extractConformsTo(tag: any): string | undefined {
    // Use the existing method to parse the subtag content
    return this.parseSubtagContent(tag, "conformsTo");
  }

  // helper function to create a Conformance instance
  // from the extracted conformsTo element
  private createConformance(conformsTo: string | undefined): Conformance {

    // create a ConformanceArgs object
    // to hold the extracted data
    const conformanceArgs: ConformanceArgs = { conformsTo };

    // return a new Conformance instance
    // using the collected arguments
    return new Conformance(conformanceArgs);
  }
}
