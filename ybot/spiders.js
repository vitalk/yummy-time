'use strict';

const EburgerSpider = require('./spiders/eburger');
const CityFoodSpider = require('./spiders/city-food');

module.exports = [
  new EburgerSpider,
  new CityFoodSpider
];
