'use strict';

module.exports = {
  db: `mongodb://${process.env.YUMMY_USER}:${process.env.YUMMY_PASSWORD}@ds011382.mlab.com:11382/yummydb`,
  port: process.env.PORT || 3000,
  originURL: 'https://yummy-time.herokuapp.com',
  secret: 'secret',
  google: {
    // eslint-disable-next-line max-len
    clientID: process.env.GOOGLE_CLIENTID || '1071029381615-tucu38j7kboh2kk4f8tj9br832gihl03.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'mAgQY2Z9TPJzFGEGkQjU1-37',
    callbackURL: 'https://yummy-time.herokuapp.com'
  },
  smtp: 'smtps://yummytime.test%40gmail.com:yandex-shri-minsk-2016@smtp.gmail.com',
  systemEmail: '"YummyBot" <https://yummy-time.herokuapp.com>'
};
