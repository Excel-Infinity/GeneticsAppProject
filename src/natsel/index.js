import { calcGens as calcGensSelection } from "./natsel.js";

function allValid() {
    var args = arguments;
    for (var i = 0; i < args.length; i++) {
        if (parseFloat(args[i].value) < parseFloat(args[i].min) || parseFloat(args[i].value) > parseFloat(args[i].max)) {
            return false;
        }
    }
    return true;
}

const switcher = document.querySelector('.theme-button');

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

/** @type {HTMLButtonElement} */
const run_button = document.getElementById('run-button');

/** @type {HTMLInputElement} */
const ind_input = document.getElementById('ind');
/** @type {HTMLInputElement} */
const p_input = document.getElementById('p');
/** @type {HTMLInputElement} */
const aa_chance_input = document.getElementById('hr-chance');
/** @type {HTMLInputElement} */
const Aa_chance_input = document.getElementById('he-chance');
/** @type {HTMLInputElement} */
const AA_chance_input = document.getElementById('hd-chance');
/** @type {HTMLInputElement} */
const num_gens_input = document.getElementById('num-gens');

const end_graph = document.getElementById("end-graph");
const start_graph = document.getElementById("start-graph");

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
