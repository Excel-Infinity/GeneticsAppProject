import { generate_pool } from "./gene-pool.js";

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


const pool_button = document.getElementById('pool-button');
const ind_input = document.getElementById('ind');
const p_input = document.getElementById('p');
const bar_graph = document.getElementById("bar-graph");
const predictive_graph = document.getElementById("predictive-graph");

// Note: the other inputs should be added back here

pool_button.addEventListener("click", () => {
	if (!allValid(ind_input, p_input)) {
		// Temp. error-checking
		alert(":( Invalid inputs");
		return;
	}

	const ind = parseInt(ind_input.value);
	const p = parseFloat(p_input.value);
	const q = 1 - p;

	const gene_pool = generate_pool(p, ind);
	bar_graph.values = [gene_pool.num_recessive, gene_pool.num_heterozygous, gene_pool.num_dominant];
	predictive_graph.values = [q * q * ind, 2 * p * q * ind, p * p * ind].map(Math.round);
});
