import LCPPassphrases from "./lcp_passphrases";
import OPDSAvailability from "./opds_availability";
import OPDSCopies from "./opds_copies";
import OPDSHolds from "./opds_holds";
import OPDSIndirectAcquisition from "./opds_indirect_acquisition";
import OPDSLink, { OPDSLinkArgs } from "./opds_link";
import OPDSPrice from "./opds_price";

// class that represents acquisition links
// extending basic OPDSLink features
export default class OPDSAcquisitionLink extends OPDSLink {

  // base URL for the acquisition links
  static BASE_REL = "http://opds-spec.org/acquisition";

  // generic relation URL for acquisition
  static GENERIC_REL = OPDSAcquisitionLink.BASE_REL;

  // define other acquisition link relations
  static BORROW_REL = OPDSAcquisitionLink.BASE_REL + "/borrow";
  static BUY_REL = OPDSAcquisitionLink.BASE_REL + "/buy";
  static OPEN_ACCESS_REL = OPDSAcquisitionLink.BASE_REL + "/open-access";
  static SAMPLE_REL = OPDSAcquisitionLink.BASE_REL + "/sample";
  static SUBSCRIBE_REL = OPDSAcquisitionLink.BASE_REL + "/subscribe";

   // define array containing all relation URLs for acquisition
  static RELS = [
    OPDSAcquisitionLink.BORROW_REL,
    OPDSAcquisitionLink.BUY_REL,
    OPDSAcquisitionLink.GENERIC_REL,
    OPDSAcquisitionLink.OPEN_ACCESS_REL,
    OPDSAcquisitionLink.SAMPLE_REL,
    OPDSAcquisitionLink.SUBSCRIBE_REL
  ];

  // OPDSAcquisitionLink special properties
  availability: OPDSAvailability;
  copies: OPDSCopies;
  holds: OPDSHolds;
  indirectAcquisitions: OPDSIndirectAcquisition[];
  passphrases: LCPPassphrases;
  prices: OPDSPrice[];

  // inits the OPDSAcquisitionLink with given arguments
  constructor(args: OPDSAcquisitionLinkArgs) {
    super(args);
  }
}

// define interface for OPDSAcquisitionLink, which
// extends the normal properties of OPDSLinkArgs
// to include additional fields
export interface OPDSAcquisitionLinkArgs extends OPDSLinkArgs {
  availability: OPDSAvailability;
  copies: OPDSCopies;
  holds: OPDSHolds;
  indirectAcquisitions: OPDSIndirectAcquisition[];
  passphrases: LCPPassphrases;
  prices: OPDSPrice[];
}
