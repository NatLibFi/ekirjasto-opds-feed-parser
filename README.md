# E-kirjasto OPDS feed parser

Javascript OPDS feed parser.

The National Library of Finland's fork of the [NYPL-Simplified/opds-feed-parser](https://github.com/NYPL-Simplified/opds-feed-parser).

Covers [OPDS 1.1 version](http://opds-spec.org/specs/opds-catalog-1-1-20110627/) and E-kirjasto specific additions and modifications.

## Usage

```sh
npm install @natlibfi/ekirjasto-opds-feed-parser
```

Example:

```js
import OPDSParser, { OPDSFeed, OPDSEntry } from "ekirjasto-opds-feed-parser";

const parser = new OPDSParser();

async function fetchOPDS(url: string): Promise<OPDSEntry | OPDSFeed> {
  const response = await fetch(url);
  const text = await response.text();
  
  try {
      // parse the text into an opds feed or entry
      return await parser.parse(text);
  } catch (error) {
      // handle error
  }
}
```

## Setup

Requires Node 20 or higher.

It is recommended to use [`nvm`](https://github.com/nvm-sh/nvm) to install different versions of Node needed on your machine.

## License

```text
Copyright © 2025 The New York Public Library, Astor, Lenox, Tilden Foundations and The National Library of Finland (Kansalliskirjasto)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
