import { run } from "./geneticdrift.js";
import { create_pool_chart } from "../charts/bar.js";
import { Chart } from "chart.js";
import { get_rand, setup_inputs, update_progress_chart } from "../common.js";
import { create_progress_chart } from "../charts/line.js";

const form = document.forms[0];
setup_inputs(form);
const form_elems = form.elements;

const ind_input  = /** @type {HTMLInputElement} */ (form_elems.namedItem("ind"));
const p_input    = /** @type {HTMLInputElement} */ (form_elems.namedItem("p"));
const gens_input = /** @type {HTMLInputElement} */ (form_elems.namedItem("gens"));
const seed_input = /** @type {HTMLInputElement} */ (form_elems.namedItem("seed"));

const progress_canvas   = /** @type {HTMLCanvasElement} */ (document.getElementById("progress-graph"));
const predictive_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("predictive-graph"));

/** @type {Chart | null} */
let progress_chart = null;

/** @type {Chart | null} */
let predictive_chart = null;

progress_canvas.height = 0;
predictive_canvas.height = 0;

form.addEventListener("submit", event => {
	event.preventDefault();

	if (progress_chart === null || predictive_chart === null) {
		progress_chart = create_progress_chart(progress_canvas);
		predictive_chart = create_pool_chart(predictive_canvas);
	}

	const ind = parseFloat(ind_input.value);
	const p = parseFloat(p_input.value);
	const q = 1 - p;
	const gens = parseFloat(gens_input.value);
	const rand = get_rand(seed_input);

	const gene_pool = run(ind, p, gens, rand);
	update_progress_chart(gene_pool, progress_chart);
	
	predictive_chart.config.data.datasets[0].data
		= [q * q * ind, 2 * p * q * ind, p * p * ind].map(Math.round);

	predictive_chart.update();
});
