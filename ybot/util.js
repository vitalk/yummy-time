'use strict';

const util = {

  /**
   * Returns only unique elements from iterator.
   *
   * @return {Array}
   */
  unique(iter) {
    const seen = [];
    return iter.filter((obj) => {
      if (seen.indexOf(obj) !== -1) {
        return false;
      }

      seen.push(obj);
      return true;
    });
  },

  /**
   * Returns only elements which contains unique attribute from iterable.
   *
   * @return {Array}
   */
  uniqueBy(iter, attr) {
    const seen = [];
    return iter.filter((obj) => {
      const value = obj[attr];
      if (seen.indexOf(value) !== -1) {
        return false;
      }

      seen.push(value);
      return true;
    });
  },

  /**
   * Transform passed relative URL into the absolute one.
   *
   * @return {String}
   */
  normalizeUrl(url, baseUrl) {
    return (url.startsWith('/') ? `${baseUrl}${url}` : url);
  },

  /**
   * Normalize URLs, e.g.
   *
   *  - remove duplicates entry
   *  - transform relative URLs into the absolute ones
   *  - remove any URLs which don’t start with base URL.
   */
  normalizeUrls(baseUrl, urls) {
    return util.unique(urls
      .map((url) => util.normalizeUrl(url, baseUrl))
      .filter((url) => url.startsWith(baseUrl)));
  }
};

module.exports = util;
