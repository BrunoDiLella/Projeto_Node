var addons = require('./addons');
var helper = require('./helper');

module.exports = {
  _map: function _map (source, mapper) {
    var result, self = this;
    if (mapper === '') return source;
    if (helper.is.Empty(mapper) && typeof mapper !== 'function' && typeof mapper !== 'number') return mapper;
    if ( mapper instanceof Array) {
      result = [];
      mapper.forEach(function (ref) {
        if (typeof ref === 'string') {
          result.push(self._map(source, ref));
        } else {
          result.push(self._zipObject(helper.mapValues(ref, function (val){
            return self._map(source,val);
          })));
        }
      });
      return helper.flattenDeep(result);
    }
    if (typeof mapper === 'object') {
      result = {};
      helper.keys(mapper).forEach(function (key){
        result[key] = self._map(source, mapper[key]);
      });
      return result;
    }
    if (typeof mapper === 'string') {
      if (/\[\]/.test(mapper)) {
        return this._dig(source, mapper);
      }
      return this._channel (source, mapper);
    }
    if (typeof mapper === 'function') {
      return mapper(source);
    }
    if (typeof mapper === 'number') {
      return mapper;
    }
    return mapper;
  },
  /**
   * to zip the object
   * input: {a: [1,2,3], b: [4,5,6], c:1}
   * output: [{a:1,b:4,c:1}, {a:2,b:5,c:1}, {a:3,b:6,c:1}]
  */
  _zipObject: function _zipObject(ob) {
    var result = [], values, keys, keysLen, i, j, tmp, len = 0;
    keys = helper.keys(ob);
    keysLen = keys.length;
    values = helper.values(ob);

    for (j =0; j < values.length; j++) {
      len = Math.max(len, typeof values[j]!=='string'&&values[j].length || 0);
    }
    for (j = 0; j < len; j++) {
      tmp = {};
      for (i = 0; i< keysLen; i++){
        tmp[keys[i]] = ob[keys[i]].shift ? ob[keys[i]].shift()||'' : ob[keys[i]];
      }
      result.push(tmp);
    }
    return result;
  },

  /**
   * transform the mapper contains [] to array
   * input: key1.keyarray[].key2
   * output: [key1.keyarray[0].key2, key1.keyarray[1].key2,... ]
  */
  _dig: function _dig(source, mapper) {
    var result = [], self = this, sourceChildArray, mapperChild;
    sourceChildArray = this._map(source, mapper.substr(0, mapper.indexOf('[]')));
    mapperChild = mapper.substr(mapper.indexOf('[]')+3);

    sourceChildArray.forEach(function (sourceChild) {
      result.push(self._map(sourceChild, mapperChild));
    });
    return result;
  },

  /**
   * get the value of passing object
  */
  _channel: function _channel (source, ref) {
    var addOn, result;
    if (!ref) return source;
    addOn = addons[ref.split('|')[1]];
    result =  ref.split('|').length === 2 ? helper.get(source,ref.split('|')[0]) : helper.get(source,ref);
    result = result === undefined ? '' : result;
    return addOn ? addOn(result) : result;
  }
};
