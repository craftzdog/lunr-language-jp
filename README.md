lunr-language-jp
==================

A Japanese tokenizer and stopwords for Lunr JavaScript library, utilizing:

 * [TinySegmenter - Super compact Japanese tokenizer](http://chasen.org/~taku/software/TinySegmenter/) by Taku Kudo <taku@chasen.org>

## Installation

```sh
npm install --save lunr-language-jp lunr-languages
```

## Usage

```js
var lunr = global.lunr = require('lunr')
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.multi')(lunr)
require('lunr-language-jp')(lunr)
lunr.tokenizer = lunr.jp.tokenizer
```

