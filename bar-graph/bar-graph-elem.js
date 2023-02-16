// @ts-check

import { draw_graph, update_graph } from "./bar-graph.js";

class BarGraphElement extends HTMLElement {
    /** @type {CanvasRenderingContext2D} */
    #ctx;

    /** @type {number[]} */
    #values;

    /** @type {string[]} */
    #labels;

    get width() {
        const attr = this.getAttribute("width");

        if (attr === null) {
            return 400;
        }

        return parseInt(attr);
    }

    /**
     * @param {number} width the width of the element
     */
    set width(width) {
        this.setAttribute("width", width.toString());
        this.#ctx.canvas.width = width;
        this.#update(this.#values);
    }

    get height() {
        const attr = this.getAttribute("height");

        if (attr === null) {
            return 300;
        }

        return parseInt(attr);
    }

    /**
     * @param {number} height the width of the element
     */
    set height(height) {
        this.setAttribute("height", height.toString());
        this.#ctx.canvas.height = height;
        this.#update(this.#values);
    }

    get values() {
        return this.#values.slice();
    }

    /**
     * @param {number[]} values the new labels
     */
    set values(values) {
        const prev_values = this.#values;
        this.#values = values.slice();
        this.#update(prev_values);
    }

    get labels() {
        return this.#labels.slice();
    }

    /**
     * @param {string[]} labels the new labels
     */
    set labels(labels) {
        this.#labels = labels.slice();
        this.#update(this.#values);
    }

    constructor() {
        super();

        const shadow = this.attachShadow({mode: "open"});

        const canvas = document.createElement("canvas");

        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.border = "1px solid black";

        shadow.appendChild(canvas);
        this.#ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));

        const valuesAttr = this.getAttribute("values");

        if (valuesAttr === null) {
            this.#values = [];
        } else {
            this.#values = valuesAttr.split(",").map(parseFloat);
        }

        const labelsAttr = this.getAttribute("labels");

        if (labelsAttr === null) {
            this.#labels = this.#values.map(num => num.toString());
        } else {
            this.#labels = labelsAttr.split(",");
        }

        this.redraw();
    }

    /**
     * @param {number} index
     * @param {number} new_value
     */
    set_value(index, new_value) {
        const prev_values = this.#values.slice();
        this.#values[index] = new_value;
        this.#update(prev_values);
    }

    /**
     * @param {number} index
     * @param {string} new_label
     */
    set_label(index, new_label) {
        this.#labels[index] = new_label;
        this.#update(this.#values);
    }

    /**
     * @param {number[]} prev_values
     */
    #update(prev_values) {
        update_graph(this.#ctx, this.#ctx.canvas.width, this.#ctx.canvas.height, this.#values, prev_values, this.#labels);
    }

    redraw() {
        draw_graph(this.#ctx, this.#ctx.canvas.width, this.#ctx.canvas.height, this.#values, this.#labels);
    }
}

customElements.define("bar-graph", BarGraphElement);

export default BarGraphElement;
