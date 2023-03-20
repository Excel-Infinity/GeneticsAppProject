const invalid_class = "checked-invalid";

/**
 * @param {HTMLFormElement} form the form whose inputs to set up
 * @returns {HTMLInputElement[]} the inputs that were in the form
 */
function setup_inputs(form) {
	const obj_inputs = Array.prototype.filter.call(form.elements, e => e instanceof HTMLInputElement);
	const inputs = /** @type {HTMLInputElement[]} */ (obj_inputs);

	inputs.forEach(input => input.addEventListener("invalid", () => {
		input.classList.add(invalid_class);
	}));

	form.addEventListener("submit", () => {
		inputs.forEach(input => input.classList.remove(invalid_class))
	});

	return inputs;
}

/**
 * @param {number} a seed for random number generator
 * @returns {() => number} a function that returns a pseudorandom number between 0 and 1
 * @description https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 * @todo this should probably be replaced with something more suitable
 */
function mulberry32(a) {
    return function() {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/**
 * @param {HTMLInputElement} seed_input if seed_input is not empty, it is used to seed the generator
 * @returns {() => number} a function that returns a pseudorandom number
 */
function get_rand(seed_input) {
	const value = seed_input.value;
	if (value.length === 0) return Math.random;

	return mulberry32(parseInt(value));
}

export { setup_inputs, get_rand };
