import { run } from "./geneticdrift.js";
import { create_pool_chart } from "../charts/bar.js";
import { Chart } from "chart.js";
import { setup_inputs } from "../common.js";

const form = document.forms[0];
const [
	ind_input,
	p_input,
	gens_input,
	seed_input
] = setup_inputs(form);

const results_canvas    = /** @type {HTMLCanvasElement} */ (document.getElementById("results-graph"));
const predictive_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("predictive-graph"));

/** @type {Chart | null} */
let results_chart = null;

/** @type {Chart | null} */
let predictive_chart = null;

results_canvas.height = 0;
predictive_canvas.height = 0;

form.addEventListener("submit", event => {
	event.preventDefault();

	if (results_chart === null || predictive_chart === null) {
		results_chart = create_pool_chart(results_canvas);
		predictive_chart = create_pool_chart(predictive_canvas);
	}

	const ind = parseFloat(ind_input.value);
	const p = parseFloat(p_input.value);
	const q = 1 - p;
	const gens = parseFloat(gens_input.value);
	const seed = parseFloat(seed_input.value);

	const gene_pool = run(ind, p, gens, seed);
	results_chart.config.data.datasets[0].data
		= [gene_pool[gene_pool.length - 1][0], gene_pool[gene_pool.length - 1][1], gene_pool[gene_pool.length - 1][2]];
	predictive_chart.config.data.datasets[0].data
		= [q * q * ind, 2 * p * q * ind, p * p * ind].map(Math.round);

	results_chart.update();
	predictive_chart.update();
});
