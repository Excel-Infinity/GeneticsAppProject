// @ts-check

function create_canvas() {
    var canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;

    document.body.appendChild(canvas);

    return canvas;
}

class PopulationBarGraph {
    static #BAR_LABEL_HEIGHT = 20;
    static #BAR_TOP_PADDING  = 20;
    #numRecessive;
    #numHeterozygous;
    #numDominant;

    /**
     * @param {number} numRecessive    the number of homozygous-recessive individuals
     * @param {number} numHeterozygous the number of heterozygous individuals
     * @param {number} numDominant     the number of homozygous-dominant individuals
     */
    constructor(numRecessive, numHeterozygous, numDominant) {
	this.#numRecessive = numRecessive;
	this.#numHeterozygous = numHeterozygous;
	this.#numDominant = numDominant;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx the canvas context to draw on
     * @param {number} width  the width of the drawing-area
     * @param {number} height the height of the drawing-area
     */
    draw_graph(ctx, width, height) {
	const base_y = height - PopulationBarGraph.#BAR_LABEL_HEIGHT;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height);

	ctx.textAlign = "center";
	ctx.textBaseline = "middle"

	const bar_heights = this.#get_heights(base_y - PopulationBarGraph.#BAR_TOP_PADDING);

	this.#draw_bar(ctx, bar_heights.aa, "aa", this.#numRecessive, width / 4, base_y);
	this.#draw_bar(ctx, bar_heights.Aa, "Aa", this.#numHeterozygous, width / 2, base_y);
	this.#draw_bar(ctx, bar_heights.AA, "AA", this.#numDominant, 3 * width / 4, base_y);

	ctx.beginPath();
	ctx.moveTo(0, base_y);
	ctx.lineTo(width, base_y);
	ctx.stroke();
    }

    /**
     * @param {number} max_height the max height that the bars can be
     */
    #get_heights(max_height) {
	const max_bar_height = Math.max(this.#numRecessive, this.#numHeterozygous, this.#numDominant);

	return {
	    aa: this.#numRecessive    / max_bar_height * max_height,
	    Aa: this.#numHeterozygous / max_bar_height * max_height,
	    AA: this.#numDominant     / max_bar_height * max_height
	};
    }

    /**
     * @param {CanvasRenderingContext2D} ctx the canvas context to draw on
     * @param {number} height the height of the bar
     * @param {string} label  the label of the bar
     * @param {number} amount the numeric value associated with the bar
     * @param {number} x      the x-pos of the bar's center
     * @param {number} y      the y-pos of the bar's base
     */
    #draw_bar(ctx, height, label, amount, x, y) {
	const bar_width = 16;

	ctx.fillStyle = "blue";
	ctx.fillRect(x - bar_width / 2, y - height, bar_width, height);

	ctx.fillStyle = "#000";
	ctx.fillText(label, x, y + PopulationBarGraph.#BAR_LABEL_HEIGHT / 2);
	ctx.fillText(amount.toString(), x, PopulationBarGraph.#BAR_LABEL_HEIGHT / 2);
    }
}

function main() {
    const canvas = create_canvas();
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: false, willReadFrequently: false });

    if (ctx === null) {
	console.log("Oh no! null :(");
	return;
    }

    var bar_graph = new PopulationBarGraph(500, 1000, 750);
    bar_graph.draw_graph(ctx, canvas.width, canvas.height);
}

main();
