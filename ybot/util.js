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
   * Normalize URLs, e.g.
   *
   *  - remove duplicates entry
   *  - remove any URLs which don’t start with base URL.
   */
  normalizeUrls(baseUrl, urls) {
    return util.unique(urls.filter((url) => url.startsWith(baseUrl)));
  }
};

module.exports = util;
