lunr-language-jp
==================

A Japanese tokenizer and stopwords for Lunr JavaScript library

## Installation

```sh
npm install --save lunr-language-jp
```

## Usage

```js
var lunr = global.lunr = require('lunr')
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.multi')(lunr)
require('lunr-language-jp')(lunr)
lunr.tokenizer = lunr.jp.tokenizer
```

