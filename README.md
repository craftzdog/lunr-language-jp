lunr-language-jp
==================

A Japanese tokenizer and stopwords for Lunr JavaScript library, utilizing:

 * [TinySegmenter - Super compact Japanese tokenizer](http://chasen.org/~taku/software/TinySegmenter/) by Taku Kudo <taku@chasen.org>

This library is based on [lunr-languages' japanese module](https://github.com/MihaiValentin/lunr-languages/blob/master/lunr.ja.js) with improved stopwords.

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

## License

MIT. Developed by Takuya Matsuyama <hi@craftz.dog>
