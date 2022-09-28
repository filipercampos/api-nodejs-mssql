module.exports = {
  isEmpty(array) {
    array = _validateArray(array);
    return array.length === 0;
  },
  isNotEmpty(array) {
    array = _validateArray(array);
    return array.length !== 0;
  },
  toFirst(array) {
    array = _validateArray(array);
    return array.length > 0 ? array[0] : null;
  },
  toLast(array) {
    array = _validateArray(array);
    return array.length > 0 ? array[array.length - 1] : null;
  },
  clear(array) {
    array = _validateArray(array);
    while (array.length > 0) array.pop(array);
  },
  toArray(result) {
    return _validateArray(result);
  },

  /**
   * Accepts the array and key (string)
   *
   * @param Array array
   * @param string key
   * @returns {Array} Array
   */
  groupBy(array, key) {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  },
};

function _validateArray(result) {
  if (result.recordset) {
    array = result.recordset;
  } else {
    array = Array.isArray(result) ? result || [] : [];
  }
  return array;
}
