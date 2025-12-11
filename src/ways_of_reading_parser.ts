import WaysOfReading, { WaysOfReadingArgs } from "./ways_of_reading";
import Xml2jsOutputParser from "./xml2js_output_parser";

// this class extends Xml2jsOutputParser
// to handle parsing of ways of reading accessibility data
export default class WaysOfReadingParser extends Xml2jsOutputParser<
  WaysOfReading
> {

  // parse function gets a tag <waysOfReading>
  // and extracts Conformance information from it.
  parse(tag: any): WaysOfReading {

    // extract an array of features
    // from the 'feature' subtags in the tag
    const featuresArray = this.extractFeatures(tag["feature"]);

    // return new WaysOfReading instance
    return this.createWaysOfReading(featuresArray);
  }

  // helper function to extract features from the 'feature' subtags
  private extractFeatures(featureSubtags: any[]): string[] {

    // first check that featureSubtags is defined and is an array
    if (!featureSubtags || !Array.isArray(featureSubtags)) {
      return [];
    }

    // then extract the feature element contents from subtags,
    // mapping each subtag to its content
    return featureSubtags.map(subtag => subtag["_"]);
  }

  // helper function to create a WaysOfReading instance
  // from the extracted feature elements
  private createWaysOfReading(features: string[]): WaysOfReading {

    // create a WaysOfReadingArgs object
    // to hold the extracted data
    const waysOfReadingArgs: WaysOfReadingArgs = { features };

    // return a new WaysOfReading instance
    // using the collected arguments
    // (there's a constructor init method for this)
    return new WaysOfReading(waysOfReadingArgs);
  }

}
