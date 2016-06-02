'use strict';

function loaderPlugin(schema) {
  /**
   * Load an instance
   *
   * @param {Object} options
   * @param {Function} callback
   * @api private
   */
  // eslint-disable-next-line no-param-reassign
  schema.statics.load = function load(options, callback) {
    const select = options.select || 'name';
    return this.findOne(options.criteria)
      .select(select)
      .exec(callback);
  };

  /**
   * Load an instance or create a new one.
   *
   * @param {Object} options
   * @param {Function} callback
   * @api private
   */
  // eslint-disable-next-line no-param-reassign
  schema.statics.loadOrCreate = function loadOrCreate(options, callback) {
    return this.load(options, (err, obj) => {
      if (!obj) {
        // eslint-disable-next-line no-param-reassign
        obj = new this(options.criteria);

        if (options.attrs) {
          for (const prop in options.attrs) {
            if ({}.hasOwnProperty.call(options.attrs, prop)) {
              // eslint-disable-next-line no-param-reassign
              obj[prop] = options.attrs[prop];
            }
          }
        }

        // eslint-disable-next-line no-shadow
        return obj.save((err) => callback(err, obj));
      }

      return callback(err, obj);
    });
  };
}

module.exports = loaderPlugin;
