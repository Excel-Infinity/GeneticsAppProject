import { run as runSelection } from "./geneflow.js";
import { Chart } from "chart.js";
import { create_pool_chart } from "../charts/bar.js";
import { get_rand, setup_inputs } from "../common.js";

const form = document.forms[0];

const [
	ind_input,
	p_input,
	aa_input,
	Aa_input,
	AA_input,
	flow_input,
	num_gens_input,
	seed_input
] = setup_inputs(form);

const start_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("start-graph"));
const end_canvas   = /** @type {HTMLCanvasElement} */ (document.getElementById("end-graph"));

/** @type {Chart | null} */
var start_chart = null;

/** @type {Chart | null} */
var end_chart = null;

form.addEventListener("submit", event => {
	event.preventDefault();

	if (start_chart === null || end_chart === null) {
		start_chart = create_pool_chart(start_canvas);
		end_chart = create_pool_chart(end_canvas);
	}

	const ind = parseFloat(ind_input.value);
	const p = parseFloat(p_input.value);
	const aa_amount = parseFloat(aa_input.value);
	const Aa_amount = parseFloat(Aa_input.value);
	const AA_amount = parseFloat(AA_input.value);
	const num_gens = parseFloat(num_gens_input.value);
    const flow_rate = parseFloat(flow_input.value);
	const rand = get_rand(seed_input);
	const frequency = [aa_amount, Aa_amount, AA_amount];

	const gens = runSelection(ind, p, num_gens, flow_rate, frequency, rand);
	const last_gen = gens[gens.length - 1];
	start_chart.config.data.datasets[0].data = gens[0];
	end_chart.config.data.datasets[0].data = last_gen;

	start_chart.update();
	end_chart.update();
});
