// define class that represents OPDS links
// (links used in OPDS standard)
export default class OPDSLink {
  href: string;
  rel: string;
  type: string;
  title: string;
  role: string;

  constructor(args: OPDSLinkArgs) {
    // copy the arguments given as parameter
    //  to class properties
    Object.assign(this, args);
  }
}

// interface that defines
// the arguments for the OPDSLink class.
// Only href is required.
export interface OPDSLinkArgs {
  href: string;
  type?: string;
  title?: string;
  rel?: string;
  role?: string;
}