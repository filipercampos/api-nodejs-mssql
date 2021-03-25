'use strict';

module.exports.toFirstCase = function (text, upper = true) {
    if (!(text) || text == null) {
        return "";
    }
    var words = text.split(" ");
    var w = words[0];

    if (upper)
        words[0] = w[0].toUpperCase() + w.slice(1);
    else
        words[0] = w[0].toLowerCase() + w.slice(1);

    return words.join(" ");
}
