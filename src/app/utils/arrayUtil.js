
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
    }
}

function _validateArray(result) {
    if (result.recordset) {
        array = result.recordset;
    } else {
        array = Array.isArray(result) ? result || [] : [];
    }
    return array;
}