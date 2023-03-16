import { parse_decimal_int, parse_decimal_float } from "./number-parsing.js";

/**
 * Checks each input to see if its value is within its range. If the input has
 * the attribute "data-num-type" set to "i", its value will be parsed as an
 * integer. Otherwise, its value will be parsed as a float. Its range is
 * specified with the attributes "min" and "max".
 *
 * @param {...HTMLInputElement} inputs the inputs to validate
 *
 * @returns {boolean} whether or not the inputs are all valid
 */
function validate_number_inputs(...inputs) {
	for (const input of inputs) {
		const is_int = input.dataset.numType === "i";
		const parser = is_int ? parse_decimal_int : parse_decimal_float;

		const min = parser(input.min);
		const max = parser(input.min);
		const value = parser(input.value);

		if (isNaN(value)) {
			return false;
		}

		if ((value < min && !isNaN(min)) || (value > max && !isNaN(max))) {
			return false;
		}
	}

	return true;
}

export { validate_number_inputs };
