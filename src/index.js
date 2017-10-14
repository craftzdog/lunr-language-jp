/*!
 * Lunr languages, `Japanese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Chad Liu
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */
import TinySegmenter from './tiny_segmenter-0.2'
import stopWords from './stopwords.txt'

/**
 * Just return a value to define the module export.
 * This example returns an object, but the module
 * can return a function as the exported value.
 */
export default function (lunr) {
  /* throw error if lunr is not yet included */
  if (typeof lunr === 'undefined') {
    throw new Error('Lunr is not present. Please include / require Lunr before this script.')
  }

  /* throw error if lunr stemmer support is not yet included */
  if (typeof lunr.stemmerSupport === 'undefined') {
    throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.')
  }

  /* register specific locale function */
  lunr.jp = function () {
    this.pipeline.reset()
    this.pipeline.add(
      lunr.jp.stopWordFilter,
      lunr.jp.stemmer
    )
    // change the tokenizer for japanese one
    lunr.tokenizer = lunr.jp.tokenizer
  }
  var segmenter = new TinySegmenter()

  lunr.jp.tokenizer = function (obj) {
    if (!arguments.length || obj == null || typeof obj === 'undefined') return []
    if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

    var str = obj.toString().toLowerCase().replace(/^\s+/, '')

    for (var i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1)
        break
      }
    }

    var segs = segmenter.segment(str)
    return segs.filter(function (token) {
      return !!token
    })
      .map(function (token) {
        return token
      })
  }

  /* lunr stemmer function */
  lunr.jp.stemmer = (function () {
    /* TODO japanese stemmer  */
    return function (word) {
      return word
    }
  })()

  lunr.Pipeline.registerFunction(lunr.jp.stemmer, 'stemmer-jp')
  lunr.jp.wordCharacters = '一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９'

  /* stop word filter function */
  lunr.jp.stopWordFilter = function (token) {
    if (!token.match(/^[ぁ-ん]{1,2}$/)) {
      return token
    }
    if (lunr.jp.stopWordFilter.stopWords.indexOf(token) === -1) {
      return token
    }
  }

  lunr.jp.stopWordFilter.stopWords = new lunr.SortedSet()
  lunr.jp.stopWordFilter.stopWords.length = 135

  // The space at the beginning is crucial: It marks the empty string
  // as a stop word. lunr.js crashes during search when documents
  // processed by the pipeline still contain the empty string.
  // stopword for japanese is from http://www.ranks.nl/stopwords/japanese
  lunr.jp.stopWordFilter.stopWords.elements = stopWords.split('\n')
  lunr.Pipeline.registerFunction(lunr.jp.stopWordFilter, 'stopWordFilter-jp')
}
