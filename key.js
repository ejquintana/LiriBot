console.log('this is loaded');

var Twitter = require('twitter');

var twitterKeys = new Twitter({
  consumer_key: 'DK10crS1roPG7gzjiu7fVBcbx',
  consumer_secret: 'kdQwszdinVuoXR3Qfq6zH55oYE8rrxHRuSPyM2c3FCJPRlVigc',
  access_token_key: '912039062243905536-2c1ggquMN5vMtN2xUpR9OKImm6UgtzW',
  access_token_secret: 'ChHMjfv3Icjx9Fr6vFSOgF0fdclMjLYiBDzbuMHHGrZoa',
});

module.exports = twitterKeys;