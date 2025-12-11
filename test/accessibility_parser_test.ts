import AccessibilityParser from "../src/accessibility_parser";
import chai = require("chai");
import ConformanceParser from "../src/conformance_parser";
import fs = require("fs");
import OPDSParser, { OPDSEntry, OPDSFeed } from "../src";
import PrefixMap from "../src/prefix_map";
import WaysOfReadingParser from "../src/ways_of_reading_parser";

let expect = chai.expect;


// OPDS entry parsing test for accessibility

describe("EntryParser, AccessibilityParser, ConformanceParser and WaysOfReadingParser", () => {
  let opdsParser: OPDSParser;

  beforeEach(() => {
    opdsParser = new OPDSParser();
  });

  describe("#parse", () => {

   it("extract accessibility attribute from <accessibility>", (done) => {
      fs.readFile("test/files/accessibility.xml", "utf8", (error, data) => {
        if (error) {
          done(error);
        } else {
          let promise: Promise<OPDSFeed | OPDSEntry> = opdsParser.parse(data);
          promise.then((entry: OPDSEntry) => {
            expect(entry.title).to.equals("Accessibility XML test");
            expect(entry.accessibility).to.be.an("object");
            expect(entry.accessibility).to.have.property("waysOfReading");
            expect(entry.accessibility.waysOfReading).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
            expect(entry.accessibility.waysOfReading.features).to.include.members([
              "Appearance can be modified",
              "Has alternative text",
              "Not fully readable in read aloud or dynamic braille"
            ]);
            expect(entry.accessibility).to.have.property("conformance");
            expect(entry.accessibility.conformance).to.have.property("conformsTo", "This publication meets accepted accessibility standards");
          }).then(done, done);
        }
      });
    });

  });

});


// Accessibility parsing tests

describe("AccessibilityParser", () => {
  let accessibilityParser: AccessibilityParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    accessibilityParser = new AccessibilityParser(prefixes);
  });

  describe("#parse", () => {

    it("extracts conformance attribute", () => {

      const accessibilityTag = {
        "conformance": [{
          "conformsTo": [
            {"_": "This publication meets accepted accessibility standards"}
          ]
        }],
      };

      const result = accessibilityParser.parse(accessibilityTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("conformance");
      expect(result.conformance).to.have.property("conformsTo", "This publication meets accepted accessibility standards");
      expect(result).to.have.property("waysOfReading");
      expect(result.waysOfReading).to.be.null;
    });

    it("extracts ways of reading attribute", () => {

      const accessibilityTag = {
        "waysOfReading": [{
          "feature": [
            {"_": "Appearance can be modified"},
            {"_": "Has alternative text"},
            {"_": "Not fully readable in read aloud or dynamic braille"}
          ]
        }],
      };

      const result = accessibilityParser.parse(accessibilityTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("waysOfReading");
      expect(result.waysOfReading).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
      expect(result.waysOfReading.features).to.include.members([
        "Appearance can be modified",
        "Has alternative text",
        "Not fully readable in read aloud or dynamic braille"
      ]);
      expect(result).to.have.property("conformance");
      expect(result.conformance).to.be.null;
    });

    it("extracts conformance and ways of reading attributes", () => {

      const accessibilityTag = {
        "conformance": [{
          "conformsTo": [
            {"_": "This publication meets accepted accessibility standards"}
          ]
        }],
        "waysOfReading": [{
          "feature": [
            {"_": "Appearance can be modified"},
            {"_": "Has alternative text"},
            {"_": "Not fully readable in read aloud or dynamic braille"}
          ]
        }]
      };

      const result = accessibilityParser.parse(accessibilityTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("conformance");
      expect(result.conformance).to.have.property("conformsTo", "This publication meets accepted accessibility standards");
      expect(result).to.have.property("waysOfReading");
      expect(result.waysOfReading).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
      expect(result.waysOfReading.features).to.include.members([
        "Appearance can be modified",
        "Has alternative text",
        "Not fully readable in read aloud or dynamic braille"
      ]);

    });

    it("extracts only conformance and ways of reading attributes", () => {

      const accessibilityTag = {
        "conformance": [{
          "conformsTo": [
            {"_": "This publication meets accepted accessibility standards"}
          ]
        }],
        "waysOfReading": [{
          "feature": [
            {"_": "Appearance can be modified"},
            {"_": "Has alternative text"},
            {"_": "Not fully readable in read aloud or dynamic braille"}
          ]
        }],
        "hazards": [{
          "feature": [
            {"_": "Sounds"},
            {"_": "Motion simulation"},
            {"_": "Flashing content"}
          ]
        }]
      };

      const result = accessibilityParser.parse(accessibilityTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("conformance");
      expect(result.conformance).to.have.property("conformsTo", "This publication meets accepted accessibility standards");
      expect(result).to.have.property("waysOfReading");
      expect(result.waysOfReading).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
      expect(result.waysOfReading.features).to.include.members([
        "Appearance can be modified",
        "Has alternative text",
        "Not fully readable in read aloud or dynamic braille"
      ]);
      expect(result).not.to.have.property("hazards");
    });

    it("extracts conformance and ways of reading attributes if available", () => {

      const accessibilityTag = {};

      const result = accessibilityParser.parse(accessibilityTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("conformance");
      expect(result).to.have.property("waysOfReading");
      expect(result.conformance).to.be.null;
      expect(result.waysOfReading).to.be.null;
    });

    it("extracts only conformance and ways of reading from accessibility if available", () => {

      const accessibilityTag = {
        "hazards": [{
          "feature": [
            {"_": "Sounds"},
            {"_": "Motion simulation"},
            {"_": "Flashing content"}
          ]
        }]
      };

      const result = accessibilityParser.parse(accessibilityTag);

      expect(result).to.be.an("object");
      expect(Object.keys(result)).to.have.lengthOf(2);
      expect(result).to.have.property("conformance");
      expect(result).to.have.property("waysOfReading");
      expect(result).not.to.have.property("hazards");
      expect(result.conformance).to.be.null;
      expect(result.waysOfReading).to.be.null;
    });

  });

});


// Conformance parsing tests

describe("ConformanceParser", () => {
  let conformanceParser: ConformanceParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    conformanceParser = new ConformanceParser(prefixes);
  });

  describe("#parse", () => {

    it("extracts conformsTo attribute", () => {

      const conformanceTag = {
        "conformsTo": [
          {
            "_": "This publication meets accepted accessibility standards"
          }
        ]
      };

      const result = conformanceParser.parse(conformanceTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("conformsTo", "This publication meets accepted accessibility standards");
    });

    it("extracts conformsTo attribute including empty strings", () => {

      const conformanceTag = {
        "conformsTo": [
          {
            "_": ""
          }
        ]
      };

      const result = conformanceParser.parse(conformanceTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("conformsTo", "");
    });

    it("extracts only conformsTo attribute", () => {

      const conformanceTag = {
        "conformsTo": [
          {
            "_": "This publication meets accepted accessibility standards"
          }
        ],
        "certifier": [
          {
            "_": "The publication was certified by Certifier"
          }
        ]
      };

      const result = conformanceParser.parse(conformanceTag);

      expect(result).to.be.an("object");
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(result).to.have.property("conformsTo", "This publication meets accepted accessibility standards");
      expect(result).not.to.have.property("certifier");
    });

    it("extracts conformsTo attribute if available", () => {

      const conformanceTag = {};

      const result = conformanceParser.parse(conformanceTag);

      expect(result).to.be.an("object");
      expect(result.conformsTo).to.be.undefined;
    });

    it("extracts only conformsTo attribute if available", () => {

      const conformanceTag = {
        "certifier": [
          {
            "_": "The publication was certified by Certifier"
          }
        ]
      };

      const result = conformanceParser.parse(conformanceTag);

      expect(result).to.be.an("object");
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(result).to.have.property("conformsTo");
      expect(result.conformsTo).to.be.undefined;
      expect(result).not.to.have.property("certifier");
    });

  });
});


// Ways of reading parsing tests

describe("WaysOfReadingParser", () => {
  let waysOfReadingParser: WaysOfReadingParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    waysOfReadingParser = new WaysOfReadingParser(prefixes);
  });

  describe("#parse", () => {

   it("extracts waysOfReading attribute", () => {

      const waysOfReadingTag = {
        "feature": [
          {
            "_": "Appearance can be modified"
          },
          {
           "_": "Has alternative text"
          },
          {
           "_": "Not fully readable in read aloud or dynamic braille"
          }
        ]
      };

      const result = waysOfReadingParser.parse(waysOfReadingTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
      expect(result.features).to.include.members([
        "Appearance can be modified",
        "Has alternative text",
        "Not fully readable in read aloud or dynamic braille"
      ]);
    });

    it("extracts waysOfReading attribute including empty strings", () => {

      const waysOfReadingTag = {
        "feature": [
          {
            "_": "Appearance can be modified"
          },
          {
           "_": ""
          },
          {
           "_": "Not fully readable in read aloud or dynamic braille"
          }
        ]
      };

      const result = waysOfReadingParser.parse(waysOfReadingTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
      expect(result.features).to.include.members([
        "Appearance can be modified",
        "",
        "Not fully readable in read aloud or dynamic braille"
      ]);
    });

    it("extracts only waysOfReading attribute", () => {

      const waysOfReadingTag = {
        "feature": [
          {
            "_": "Appearance can be modified"
          },
          {
           "_": "Has alternative text"
          },
          {
           "_": "Not fully readable in read aloud or dynamic braille"
          }
        ],
        "additionalAccessibilityInformation": [
          {
            "_": "High contrast between foreground text and background"
          }
        ]
      };

      const result = waysOfReadingParser.parse(waysOfReadingTag);

      expect(result).to.be.an("object");
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(result).to.have.property("features").that.is.an("array").that.has.lengthOf(3);
      expect(result.features).to.include.members([
        "Appearance can be modified",
        "Has alternative text",
        "Not fully readable in read aloud or dynamic braille"
      ]);
      expect(result).not.to.have.property("additionalAccessibilityInformation");
    });

    it("extracts waysOfReading attribute if available", () => {

      const waysOfReadingTag = {};

      const result = waysOfReadingParser.parse(waysOfReadingTag);

      expect(result).to.be.an("object");
      expect(result).to.have.property("features").that.is.an("array").that.has.lengthOf(0);
    });

    it("extracts only waysOfReading attribute if available", () => {

      const waysOfReadingTag = {
        "additionalAccessibilityInformation": [
          {
            "_": "High contrast between foreground text and background"
          }
        ]
      };

      const result = waysOfReadingParser.parse(waysOfReadingTag);

      expect(result).to.be.an("object");
      expect(Object.keys(result)).to.have.lengthOf(1);
      expect(result).to.have.property("features").that.is.an("array").that.has.lengthOf(0);
      expect(result).not.to.have.property("additionalAccessibilityInformation");
    });

  });

});
