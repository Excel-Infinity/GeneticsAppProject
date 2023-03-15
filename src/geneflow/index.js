import { run as runSelection } from "./geneflow.js";
import { Chart } from "chart.js";
import { create_pool_chart } from "../charts/bar.js";

/**
 * @param {HTMLInputElement[]} inputs
 */
function allValid(...inputs) {
    for (var i = 0; i < inputs.length; i++) {
        if (parseFloat(inputs[i].value) < parseFloat(inputs[i].min) || parseFloat(inputs[i].value) > parseFloat(inputs[i].max)) {
            return false;
        }
    }
    return true;
}

const switcher = /** @type {HTMLElement} */ (document.getElementById("theme-button"));

switcher.addEventListener("click", function() {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("light-theme")) {
        switcher.textContent = "Dark Theme";
    } else {
        switcher.textContent = "Light Theme";
    }
    console.log("Theme switched");
});


const run_button      = /** @type {HTMLButtonElement} */ (document.getElementById("run-button"));
const ind_input       = /** @type {HTMLInputElement} */  (document.getElementById("ind"));
const p_input         = /** @type {HTMLInputElement} */  (document.getElementById("p"));
const aa_input = /** @type {HTMLInputElement} */  (document.getElementById("gen-aa"));
const Aa_input = /** @type {HTMLInputElement} */  (document.getElementById("gen-Aa"));
const AA_input = /** @type {HTMLInputElement} */  (document.getElementById("gen-AA"));
const flow_input = /** @type {HTMLInputElement} */  (document.getElementById("flow-rate"));
const num_gens_input  = /** @type {HTMLInputElement} */  (document.getElementById("num-gens"));
const seed_input      = /** @type {HTMLInputElement} */  (document.getElementById("seed"));

const start_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("start-graph"));
const end_canvas   = /** @type {HTMLCanvasElement} */ (document.getElementById("end-graph"));

/** @type {Chart | null} */
var start_chart = null;

/** @type {Chart | null} */
var end_chart = null;

// Note: the other inputs should be added back here

run_button.addEventListener("click", () => {
	if (!allValid(ind_input, p_input, aa_input, Aa_input, AA_input, flow_input)) {
		// Temp. error-checking
		alert(":( Invalid inputs");
		return;
	}

	if (start_chart === null || end_chart === null) {
		start_chart = create_pool_chart(start_canvas);
		end_chart = create_pool_chart(end_canvas);
	}

	const ind = parseInt(ind_input.value);
	const p = parseFloat(p_input.value);
	const aa_amount = parseFloat(aa_input.value);
	const Aa_amount = parseFloat(Aa_input.value);
	const AA_amount = parseFloat(AA_input.value);
	const num_gens = parseFloat(num_gens_input.value);
    const flow_rate = parseFloat(flow_input.value);
	const seed = parseInt(seed_input.value);
	const frequency = [aa_amount, Aa_amount, AA_amount];

	const gens = runSelection(ind, p, num_gens, flow_rate, frequency, seed);
	const last_gen = gens[gens.length - 1];
	start_chart.config.data.datasets[0].data = gens[0];
	end_chart.config.data.datasets[0].data = last_gen;

	start_chart.update();
	end_chart.update();
});
