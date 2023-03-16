// This is the worst thing I have ever done
const int_regex = /^\s*[+-]?0*(?:[1-9]_?(?:\d_?)*\d|\d)\s*$/;
const float_regex = /^\s*[+-]?(?:0*(?:[1-9]_?(?:\d_?)*\d|\d)(?:\.(?:(?:\d_?)*\d)?)?|\.(?:\d_?)*\d)(?:[eE][+-]?0*(?:[1-9]_?(?:\d_?)+|\d))?\s*$/;
const underscore_regex = /_/g;


/**
 * @param {string} text the text to parse as an integer
 *
 * @returns {number} the number parsed, or NaN if text does not encode a valid integer
 */
function parse_decimal_int(text) {
	if (!int_regex.test(text)) return NaN;
	return parseInt(text.replace(underscore_regex, ""));
}

/**
 * @param {string} text the text to parse as an integer
 *
 * @returns {number} the number parsed, or NaN if text does not encode a valid float
 */
function parse_decimal_float(text) {
	if (!float_regex.test(text)) return NaN;
	return parseFloat(text.replace(underscore_regex, ""));
}

export { parse_decimal_int, parse_decimal_float };
