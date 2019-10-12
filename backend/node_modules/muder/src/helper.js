var is = (function () {
  var is = {};
  ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
    is[name] = function (obj) {
      return Object.prototype.toString.call(obj) === '[object '+name+']';
    };
  });
  is.Array = function (obj) {
    return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]';
  };
  is.Object = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  is.Empty = function (value) {
    if (value === null) return true;
    if (is.Array(value) || is.String(value)) return value.length === 0;
    return _keys(value).length === 0;
  };
  return is;
}());

function _keys(obj) {
    if (!is.Object(obj) || typeof obj === 'function') return [];
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
}
function _values(obj) {
  var values = [];
  _keys(obj).forEach(function (key) {
    values.push(obj[key]);
  });
  return values;
}
function assign(obj, targetObj) {
  if (Object.assign) return Object.assign(obj, targetObj);
  var targetKeys = _keys(targetObj);
  targetKeys.forEach(function (key) {
    obj[key] = targetObj[key];
  });
  return obj;
}
function get(obj, chain) {
  var result, scope = obj;
  chain = (chain||'').split('.');
  while (chain.length && scope) {
    var key = chain.shift();
    if (Object.hasOwnProperty.call(scope,key) && !is.Array(scope) && !is.String(scope)) {
      scope = scope[key];
    } else {
      scope = void(0);
    }
  }
  return scope;
}
function mapValues(obj,cb) {
  var result = {};
  _keys(obj).forEach(function (key) {
    result[key] = (cb(obj[key]));
  });
  return result;
}

function flattenDeep(array) {
  var result = [];
  array.forEach(function (value) {
    if (is.Array(value)) {
      result = result.concat(flattenDeep(value));
    } else {
      result.push(value);
    }
  });
  return result;
}

module.exports =  {
  is: is,
  assign: assign,
  keys: _keys,
  values: _values,
  mapValues: mapValues,
  flattenDeep: flattenDeep,
  get: get
};
