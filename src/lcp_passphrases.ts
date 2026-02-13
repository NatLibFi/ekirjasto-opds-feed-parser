// Define the LCPPassphrases class
// for the LCP passphrases found in the OPDS feed.
// LCPPasshprases has two optional properties:
// - hashedPassphrase stores the base64-encoded value of the hashed passphrase
// - unhashedPassphrase stores the unhashed version of passphrase
export default class LCPPassphrases {
  // these properties can be strings or be undefined
  hashedPassphrase?: string;
  unhashedPassphrase?: string;

  // This constructor is used when
  // we are initializing a new LCPPassphrases object
  // with the given parameters
  constructor(args?: {
    hashedPassphrase?: string;
    unhashedPassphrase?: string;
  }) {
    if (args) {
      this.hashedPassphrase = args.hashedPassphrase;
      this.unhashedPassphrase = args.unhashedPassphrase;
    }
  }

 }
  // LCPPassphrasesArgs is an interface
  // that extends the LCPPassphrases class
  // and allows it to inherit its properties.
  export interface LCPPassphrasesArgs extends LCPPassphrases {}
