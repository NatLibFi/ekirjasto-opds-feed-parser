import Accessibility, { AccessibilityArgs } from "./accessibility";
import Conformance from "./conformance";
import ConformanceParser from "./conformance_parser";
import WaysOfReading from "./ways_of_reading";
import WaysOfReadingParser from "./ways_of_reading_parser";
import Xml2jsOutputParser from "./xml2js_output_parser";

// AccessibilityParser class extends Xml2jsOutputParser
// to handle parsing of accessibility data
export default class AccessibilityParser extends Xml2jsOutputParser<
  Accessibility
> {

  // function parse is given a tag as parameter
  // (it should be the XML element <accessibility>)
  // and extracts accessibility details from it.
  parse(tag: any): Accessibility {

    const conformance = this.parseConformance(tag);
    const waysOfReading = this.parseWaysOfReading(tag);

    return this.createAccessibility(conformance, waysOfReading);
  }

  // helper function to parse the 'conformance' subtag
  private parseConformance(tag: any): Conformance {

    // first create instance of the ConformanceParser
    // and define the subtag's name from <conformance>
    const subtagName = "conformance";
    const subtagParser = new ConformanceParser(this.prefixes);

    // then extract conformance metadata from XML using the parser
    return this.parseSubtag(
      tag,
      subtagName,
      subtagParser
    );
  }

  // helper function to parse the 'waysOfReading' subtag
  private parseWaysOfReading(tag: any): WaysOfReading {

    // first create a instance of the WaysOfReadingParser
    // and define the subtag's name from <waysOfReading>
    const subtagName = "waysOfReading";
    const subtagParser = new WaysOfReadingParser(this.prefixes);

    // then extract ways of reading metadata from XML using the parser
    return this.parseSubtag(
      tag,
      subtagName,
      subtagParser
    );
  }

  // helper function that creates an Accessibility instance
  // from the parsed data given as parameter
  private createAccessibility(
    conformance: Conformance,
    waysOfReading: WaysOfReading
  ): Accessibility {

    // create an AccessibilityArgs object
    // that holds the extracted data
    const accessibilityArgs: AccessibilityArgs = {
      conformance: conformance,
      waysOfReading: waysOfReading,
    };

    // return a new Accessibility instance
    // that is created using accessibilityArgs
    // (there's a constructor init method for this)
    return new Accessibility(accessibilityArgs);
  }

}
