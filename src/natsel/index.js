import { run as runSelection } from "./natsel.js";
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
const aa_chance_input = /** @type {HTMLInputElement} */  (document.getElementById("hr-chance"));
const Aa_chance_input = /** @type {HTMLInputElement} */  (document.getElementById("he-chance"));
const AA_chance_input = /** @type {HTMLInputElement} */  (document.getElementById("hd-chance"));
const num_gens_input  = /** @type {HTMLInputElement} */  (document.getElementById("num-gens"));

const start_canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("start-graph"));
const end_canvas   = /** @type {HTMLCanvasElement} */ (document.getElementById("end-graph"));

/** @type {Chart | null} */
var start_chart = null;

/** @type {Chart | null} */
var end_chart = null;

// Note: the other inputs should be added back here

run_button.addEventListener("click", () => {
	if (!allValid(ind_input, p_input, aa_chance_input, Aa_chance_input, AA_chance_input)) {
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
	const aa_chance = parseFloat(aa_chance_input.value);
	const Aa_chance = parseFloat(Aa_chance_input.value);
	const AA_chance = parseFloat(AA_chance_input.value);
	const num_gens = parseFloat(num_gens_input.value);
	const chances = [aa_chance, Aa_chance, AA_chance];

	const gens = runSelection(ind, p, num_gens, chances);
	const last_gen = gens[gens.length - 1];
	start_chart.config.data.datasets[0].data = gens[0];
	end_chart.config.data.datasets[0].data = last_gen;

	start_chart.update();
	end_chart.update();
});
