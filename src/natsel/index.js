import { run as runSelection } from "./natsel.js";
import { Chart } from "chart.js";
import { create_pool_chart } from "../charts/bar.js";
import { get_rand, setup_inputs, update_progress_chart } from "../common.js";
import { create_progress_chart } from "../charts/line.js";

const form = document.forms[0];
setup_inputs(form);
const form_elems = form.elements;

const ind_input       = /** @type {HTMLInputElement} */ (form_elems.namedItem("ind"));
const p_input         = /** @type {HTMLInputElement} */ (form_elems.namedItem("p"));
const aa_chance_input = /** @type {HTMLInputElement} */ (form_elems.namedItem("hr-chance"));
const Aa_chance_input = /** @type {HTMLInputElement} */ (form_elems.namedItem("he-chance"));
const AA_chance_input = /** @type {HTMLInputElement} */ (form_elems.namedItem("hd-chance"));
const num_gens_input  = /** @type {HTMLInputElement} */ (form_elems.namedItem("num-gens"));
const seed_input      = /** @type {HTMLInputElement} */ (form_elems.namedItem("seed"));

const start_canvas    = /** @type {HTMLCanvasElement} */ (document.getElementById("start-graph"));
const progress_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("progress-graph"));

/** @type {Chart | null} */
var start_chart = null;

/** @type {Chart | null} */
var progress_chart = null;

start_canvas.height = 0;
progress_canvas.height = 0;

form.addEventListener("submit", event => {
	event.preventDefault();

	if (start_chart === null || progress_chart === null) {
		start_chart = create_pool_chart(start_canvas);
		progress_chart = create_progress_chart(progress_canvas);
	}

	const ind = parseFloat(ind_input.value);
	const p = parseFloat(p_input.value);
	const aa_chance = parseFloat(aa_chance_input.value);
	const Aa_chance = parseFloat(Aa_chance_input.value);
	const AA_chance = parseFloat(AA_chance_input.value);
	const num_gens = parseFloat(num_gens_input.value);
	const chances = [aa_chance, Aa_chance, AA_chance];
	const rand = get_rand(seed_input);

	const gens = runSelection(ind, p, num_gens, chances, rand);

	update_progress_chart(gens, progress_chart);
	start_chart.config.data.datasets[0].data = gens[0];
	start_chart.update();
});
