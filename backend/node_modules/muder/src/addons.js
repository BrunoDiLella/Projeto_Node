// var moment = require('moment');

var addons = {
  num: function(val) {
    return +val;
  },
  // timestamp: function(val) {
  //   if (+val + '' === val) {
  //     return +val;
  //   }
  //   return +moment(val).format('x') || 0;
  // },
  bool: function(val) {
    if (val === '0' || val === 'false') {
      return false;
    }
    return !!val;
  }
};

module.exports = addons;
