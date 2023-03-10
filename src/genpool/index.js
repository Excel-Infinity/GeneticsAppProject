import { generate_pool } from "./gene-pool.js";
import { create_pool_chart } from "./create-chart.js";
import { Chart } from "chart.js";

/**
 * @param {HTMLInputElement[]} inputs
 */
function allValid(...inputs) {
    for (const input of inputs) {
        if (parseFloat(input.value) < parseFloat(input.min) || parseFloat(input.value) > parseFloat(input.max)) {
            return false;
        }
    }

    return true;
}

const switcher = /** @type {HTMLElement} */ (document.querySelector('#theme-button'));

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('light-theme')) {
        switcher.textContent = 'Dark Theme';
    } else {
        switcher.textContent = 'Light Theme';
    }
    console.log('Theme switched');
});


const pool_button       = /** @type {HTMLButtonElement} */ (document.getElementById('pool-button'));
const ind_input         = /** @type {HTMLInputElement} */  (document.getElementById('ind'));
const p_input           = /** @type {HTMLInputElement} */  (document.getElementById('p'));
const results_canvas    = /** @type {HTMLCanvasElement} */ (document.getElementById("results-graph"));
const predictive_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("predictive-graph"));

/** @type {Chart | null} */
var results_chart = null;

/** @type {Chart | null} */
var predictive_chart = null;

results_canvas.height = 0;
predictive_canvas.height = 0;

pool_button.addEventListener("click", () => {
	if (!allValid(ind_input, p_input)) {
		// Temp. error-checking
		alert(":( Invalid inputs");
		return;
	}

	if (results_chart === null) {
		results_chart = create_pool_chart(results_canvas);
	}

	if (predictive_chart === null) {
		predictive_chart = create_pool_chart(predictive_canvas);
	}

	const ind = parseInt(ind_input.value);
	const p = parseFloat(p_input.value);
	const q = 1 - p;

	const gene_pool = generate_pool(p, ind);
	results_chart.config.data.datasets[0].data
		= [gene_pool.num_recessive, gene_pool.num_heterozygous, gene_pool.num_dominant];
	predictive_chart.config.data.datasets[0].data
		= [q * q * ind, 2 * p * q * ind, p * p * ind].map(Math.round);

	results_chart.update();
	predictive_chart.update();
});
