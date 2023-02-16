// @ts-check

import BarGraphElement from "./bar-graph-elem.js";

/**
 * @param {string} input_id
 */
function get_float_input_value(input_id) {
    const input = /** @type {HTMLInputElement} */ (document.getElementById(input_id));

    return parseFloat(input.value);
}

function update() {
    const bar_graph = /** @type {BarGraphElement} */ (document.getElementById("bar-graph"));

    const new_values = [
        get_float_input_value("numRecessive"),
        get_float_input_value("numHeterozygous"),
        get_float_input_value("numDominant")
    ];

    bar_graph.values = new_values;
}

const update_button = /** @type {HTMLButtonElement} */ (document.getElementById("update-button"));
update_button.addEventListener("click", update);
