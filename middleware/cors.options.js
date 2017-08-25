let config = require('../config');
module.exports = {
  getCORSoptions: () => {
    return {
      origin: function(origin, callback) {
        let isWhitelisted = config.originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
      },
      credentials: true,
    };
  },
};
