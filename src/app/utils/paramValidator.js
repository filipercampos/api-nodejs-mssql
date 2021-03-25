const _ = require('lodash');

module.exports = {

    /**
     * Get simple value from objet or .value
     * Check object is null or undefined
     * @param {Object to be verified} o 
     */
    toParamValue(o, defaultValue) {

        const validateValue = function (value) {
            if (!_.isNil(value)) {
                return value;
            }
            return null;
        }

        if (_.isNil(o)) {
            return validateValue(defaultValue);
        }
        //variables body
        else if (_.isNil(o.path)) {
            if (o == 'null') {
                return null;
            }
            return o;
        }
        else if (_.isNil(o.value)) {
            return validateValue(defaultValue);
        }
        //variables get
        else {
            if (o.value === 'null') {
                return null;
            }
            return o.value;
        }
    }

}

