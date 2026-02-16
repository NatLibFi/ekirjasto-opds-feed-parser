import LCPPassphrases, { LCPPassphrasesArgs } from "./lcp_passphrases";
import NamespaceParser from "./namespace_parser";
import Xml2jsOutputParser from "./xml2js_output_parser";

// PassphrasesParser class extends Xml2jsOutputParser to parse LCP passphrases
  // Example of XML structure used for LCP passphrases in Acquisition links
  //  ...
  //    <lcp:hashed_passphrase>5e884898da28047151d0e56f8dc6292773603d0d</lcp:hashed_passphrase>
  //    <lcp:unhashed_passphrase>SecretPassphrase</lcp:unhashed_passphrase>
  //  ...
export default class PassphrasesParser extends Xml2jsOutputParser<LCPPassphrases> {

  // Function that parses the given XML tag
  // and extracts LCP passphrases from it
  parse(tag: any): LCPPassphrases {

    const hashedPassphrase = this.extractPassphrase(tag, "hashed_passphrase");
    const unhashedPassphrase = this.extractPassphrase(tag, "unhashed_passphrase");

    // return passphrases
    return this.createLCPPassphrases(hashedPassphrase, unhashedPassphrase);
  }

  // Helper function that extracts passphrase content from the XML tag
  private extractPassphrase(tag: any, subtagName: string): string {

    // get the prefix for the LCP namespace from the prefixes map
    // Note: this should be just string "lcp:"
    const lcpPrefix = this.prefixes[NamespaceParser.LCP_URI];

    // return the string content
    return this.parseSubtagContent(tag, lcpPrefix + subtagName);
  }

  // Helper function that creates an LCPPassphrases instance
  // from the parsed data given as parameter
  private createLCPPassphrases(
    hashedPassphrase: string | undefined,
    unhashedPassphrase: string | undefined
  ): LCPPassphrases {

    // create an LCPPassphrasesArgs object
    // that holds the extracted data
    const lcpPassphrasesArgs: LCPPassphrasesArgs = {
      hashedPassphrase: hashedPassphrase,
      unhashedPassphrase: unhashedPassphrase
    };

    // return a new LCPPassphrases instance
    // that is created using lcpPassphrasesArgs
    // (there's a constructor init method for this)
    return new LCPPassphrases(lcpPassphrasesArgs);
  }

}
