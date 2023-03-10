import { calcGens as calcGensSelection } from "./natsel.js";
import BarGraphElem from "../bar-graph/bar-graph-elem.js"

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

const end_graph   = /** @type {BarGraphElem} */ (document.getElementById("end-graph"));
const start_graph = /** @type {BarGraphElem} */ (document.getElementById("start-graph"));

// Note: the other inputs should be added back here

run_button.addEventListener("click", () => {
	if (!allValid(ind_input, p_input, aa_chance_input, Aa_chance_input, AA_chance_input)) {
		// Temp. error-checking
		alert(":( Invalid inputs");
		return;
	}

	const ind = parseInt(ind_input.value);
	const p = parseFloat(p_input.value);
	const aa_chance = parseFloat(aa_chance_input.value);
	const Aa_chance = parseFloat(Aa_chance_input.value);
	const AA_chance = parseFloat(AA_chance_input.value);
	const num_gens = parseFloat(num_gens_input.value);
	const chances = [aa_chance, Aa_chance, AA_chance];

	const gens = calcGensSelection(ind, p, num_gens, chances);
	const last_gen = gens[gens.length - 1];
	start_graph.values = gens[0];
	end_graph.values = last_gen;
});
