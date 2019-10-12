var helper = require('./helper');
var fn = require('./functions');
var addons = require('./addons');


var muder =  function (source, mapper, addon) {
  var result = {};
  if (!helper.is.Empty(addon)){
    helper.assign(addons, addon);
  }
  helper.keys(mapper).forEach(function (key) {
    result[key] = fn._map(source, mapper[key]);
  });
  return result;
};

module.exports = muder;
