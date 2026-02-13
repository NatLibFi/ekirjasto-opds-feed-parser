// import the PrefixMap type for type-checking
import PrefixMap from "./prefix_map";

// create constants for URIs used in our feed
// for example the OPDS_URI found in our feed XML
// is like this: xmlns:opds="http://opds-spec.org/2010/catalog"
export default class NamespaceParser {
  static ATOM_URI = "http://www.w3.org/2005/Atom";
  static DC_URI = "http://purl.org/dc/terms/";
  static FH_URI = "http://purl.org/syndication/history/1.0";
  static OPDS_URI = "http://opds-spec.org/2010/catalog";
  static OPEN_SEARCH_URI = "http://a9.com/-/spec/opensearch/1.1/";
  static OPF_URI = "http://www.idpf.org/2007/opf";
  static SCHEMA_URI = "http://schema.org/";
  static THR_URI = "http://purl.org/syndication/thread/1.0";

  // create an array with all the URIs
  static URIS = [
    NamespaceParser.ATOM_URI,
    NamespaceParser.DC_URI,
    NamespaceParser.FH_URI,
    NamespaceParser.OPDS_URI,
    NamespaceParser.OPEN_SEARCH_URI,
    NamespaceParser.OPF_URI,
    NamespaceParser.SCHEMA_URI,
    NamespaceParser.THR_URI
  ];

  // Function that maps the URIs found in the feed
  // to their prefixes.
  // The feed is given as parameter.
  // Returns a map of type PrefixMap.
  // For example if the given feed contains uri for OPDS
  // then this function returns a map object
  //    {
  //      "http://opds-spec.org/2010/catalog": "opds:"
  //    }
  // This prefixes function is used when parsing
  // both opds feeds and entry feeds,
  // check the OPDSParser function 'parse' for more details.
  //
  prefixes(feed: any): PrefixMap {

    // first create a empty map object
    // that we will use to store the results
    let prefixMap: PrefixMap = {};

    // get raw namespaces from the feed object
    let rawNamespaces = Object
      .keys(feed["$"] || {}) // if no keys found, just use empty object
      .map((key) => feed["$"][key]); // map every key with value

    // go through all the URIs defined in the URIs list
    NamespaceParser.URIS.forEach((uri) => {

      // find the raw namespace that matches the uri
      let namespace = rawNamespaces.find((rawNamespace) => {
        return rawNamespace.value === uri;
      });

      // init prefix as empty string
      let prefix = "";

      // if namespace was found
      // extract the actual prefix
      if (namespace) {
        prefix = namespace.local;
        if (prefix.length > 0) {
          prefix += ":";
        }
      }

      // add the URI and its corresponding prefix
      // to the prefixMap
      prefixMap[uri] = prefix;
    });

    // finally return the filled prefixMap
    return prefixMap;
  }

}