const invalid_class = "checked-invalid";

/**
 * @param {HTMLFormElement} form
 * @returns {HTMLInputElement[]}
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

export { setup_inputs };
