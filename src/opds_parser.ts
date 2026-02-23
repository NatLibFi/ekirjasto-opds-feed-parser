import EntryParser from "./entry_parser";
import FeedParser from "./feed_parser";
import NamespaceParser from "./namespace_parser";
import OPDSEntry from "./opds_entry";
import OPDSFeed from "./opds_feed";
import xml2js = require("xml2js"); // XML to JavaScript object converter

// create an instance of xml2js.Parser
// with the 'xmlns' option set to true.
// This means that we want the xml2js parser to include
// the XML namespace (xmlns) when parsing
// the feed or entry XML string to object.
// Example of XML namespace:
//   xmlns:opds="http://opds-spec.org/2010/catalog"
let xmlParser = new xml2js.Parser({xmlns: true});

// create instance of NamespaceParser
// that will handle extracting prefixes from feed
let namespaceParser = new NamespaceParser();

// Define OPDSParser class for parsing OPDS feeds and entries
export default class OPDSParser {

  // Function that parses an XML string given as parameter
  // returns a Promise with either an OPDSFeed or an OPDSEntry
  parse(XMLString: string): Promise<OPDSFeed | OPDSEntry> {

    return new Promise<OPDSFeed | OPDSEntry>((resolve, reject) => {

      // convert the XML string into a object with xmlParser
      xmlParser.parseString(XMLString, (error, result) => {

        // check if something went wrong in parsing
        if (error) {
          // reject promise with error
          reject(error);

        // if we are here, parsing was succesful
        } else {

          // check if the parsed result contains a feed
          if (result.feed) {
            let prefixes = namespaceParser.prefixes(result.feed);
            let feedParser = new FeedParser(prefixes);
            let opdsFeed = feedParser.parse(result.feed);
            // resolve promise with feed
            resolve(opdsFeed);

          // check if the parsed result contains an entry
          } else if (result.entry) {
            let prefixes = namespaceParser.prefixes(result.entry);
            let entryParser = new EntryParser(prefixes);
            let opdsEntry = entryParser.parse(result.entry);
            // resolve promise with entry
            resolve(opdsEntry);

          // if we are here, no feed or entry was found
          } else {
            // reject promise with message
            reject("No feed found");
          }
        }

      });

    });

  }

}
