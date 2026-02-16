import chai = require("chai");
import NamespaceParser from "../src/namespace_parser";
import PassphrasesParser from "../src/passphrases_parser";
import PrefixMap from "../src/prefix_map";

let expect = chai.expect;

// Passphrases parsing test for LCP passphrases

describe("PassphrasesParser", () => {
  let passphrasesParser: PassphrasesParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    prefixes[NamespaceParser.LCP_URI] = "lcp:";
    passphrasesParser = new PassphrasesParser(prefixes);
  });

  describe("#parse", () => {

    it("extracts hashed and unhashed passphrase attributes if available", () => {

      const passphrasesTag = {
        "lcp:hashed_passphrase": [
            {"_": "5e884898da28047151d0e56f8dc6292773603d0d"}
        ],
        "lcp:unhashed_passphrase": [
            {"_": "SecretPassphrase"}
        ]
      };

      const result = passphrasesParser.parse(passphrasesTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("hashedPassphrase");
      expect(result.hashedPassphrase).to.equals("5e884898da28047151d0e56f8dc6292773603d0d");
      expect(result).to.have.property("unhashedPassphrase");
      expect(result.unhashedPassphrase).to.equals("SecretPassphrase");
    });

    it("extracts hashed passphrase attribute", () => {

      const passphrasesTag = {
        "lcp:hashed_passphrase": [
            {"_": "5e884898da28047151d0e56f8dc6292773603d0d"}
        ]
      };

      const result = passphrasesParser.parse(passphrasesTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("hashedPassphrase");
      expect(result.hashedPassphrase).to.equals("5e884898da28047151d0e56f8dc6292773603d0d");
      expect(result).to.have.property("unhashedPassphrase");
      expect(result.unhashedPassphrase).to.be.undefined;
    });

    it("extracts unhashed passphrase attribute", () => {

      const passphrasesTag = {
        "lcp:unhashed_passphrase": [
            {"_": "SecretPassphrase"}
        ]
      };

      const result = passphrasesParser.parse(passphrasesTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("hashedPassphrase");
      expect(result.hashedPassphrase).to.be.undefined;
      expect(result).to.have.property("unhashedPassphrase");
      expect(result.unhashedPassphrase).to.equals("SecretPassphrase");
    });

    it("extracts only hashed and unhashed passphrase attributes", () => {

      const passphrasesTag = {
        "lcp:hashed_passphrase": [
            {"_": "5e884898da28047151d0e56f8dc6292773603d0d"}
        ],
        "lcp:hashed_potatoes": [
            {"_": "Crispy on the outside and soft on the inside"}
        ],
        "lcp:unhashed_passphrase": [
            {"_": "SecretPassphrase"}
        ]
      };

      const result = passphrasesParser.parse(passphrasesTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("hashedPassphrase");
      expect(result.hashedPassphrase).to.equals("5e884898da28047151d0e56f8dc6292773603d0d");
      expect(result).to.have.property("unhashedPassphrase");
      expect(result.unhashedPassphrase).to.equals("SecretPassphrase");
      expect(result).not.to.have.property("hashedPotatoes");
    });

  });

});