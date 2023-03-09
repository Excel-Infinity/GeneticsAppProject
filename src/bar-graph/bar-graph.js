// @ts-check

/**
 * @typedef {Object} BarGraphDisplayProperties
 * @property {number} label_height the height of the labels section of the bar graph
 * @property {number} top_padding  the padding at the top of the bar graph, where the values are drawn
 * @property {number} bar_width    the width of the bars
 * @property {string} bar_style    the fillStyle of the bars
 * @property {string} foreground_style the fillStyle and strokeStyle of the text and horiznotal line
 */

/**
 * @type {Readonly<BarGraphDisplayProperties>}
 */
const default_bar_graph_display_properties = Object.freeze({
    label_height: 20,
    top_padding: 20,
    bar_width: 16,
    bar_style: "blue",
    foreground_style: "#FFF"
});

/**
 * @param {CanvasRenderingContext2D} ctx the canvas context to draw on
 * @param {number} height the height of the bar
 * @param {string} label  the label of the bar
 * @param {number} amount the numeric value associated with the bar
 * @param {number} x      the x-pos of the bar's center
 * @param {number} y      the y-pos of the bar's base
 * @param {number} prev_height the previous height of the bar if the bar is being updated, else 0
 * @param {Readonly<BarGraphDisplayProperties>} props properties of the bar graph
 */
function draw_bar(ctx, height, label, amount, x, y, prev_height, props = default_bar_graph_display_properties) {
    const begin_x = x - props.bar_width / 2;
    const begin_y = y - height;

    if (prev_height > height) {
        ctx.clearRect(begin_x, y - prev_height, props.bar_width, prev_height - height);
    } else {
        ctx.fillStyle = props.bar_style;
        ctx.fillRect(begin_x, begin_y, props.bar_width, height - prev_height);
    }

    ctx.fillStyle = props.foreground_style;
    ctx.fillText(label, x, y + props.label_height / 2);
    ctx.fillText(amount.toString(), x, props.top_padding / 2);
}

/**
 * @param {number} max_height   the height of the tallest bar
 * @param {number[]} bar_values the values associated with the bars
 *
 * @returns {number[]} the heights of the bars with the values of raw_heights
 */
function scale_heights(max_height, bar_values) {
    if (bar_values.every(num => num == 0)) {
        return bar_values;
    }

    const max_value = Math.max(...bar_values);

    return bar_values.map(val => Math.round(val / max_value * max_height));
}

/**
 * @param {CanvasRenderingContext2D} ctx the canvas context to draw on
 * @param {number} width  the width of the drawing-area
 * @param {number} height the height of the drawing-area
 * @param {number[]} values the values of the bars
 * @param {string[]} labels the labels of the bars
 * @param {Readonly<BarGraphDisplayProperties>} props properties of the bar graph
 */
function draw_graph(ctx, width, height, values, labels, props = default_bar_graph_display_properties) {
    ctx.clearRect(0, 0, width, height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const base_y = height - props.label_height;
    const max_height = base_y - props.top_padding;
    const bar_heights = scale_heights(max_height, values);
    const num_bars = Math.min(values.length, labels.length);
    const bar_offset = width / (num_bars + 1);

    for (var i = 0; i < num_bars; ++i) {
        draw_bar(ctx, bar_heights[i], labels[i], values[i], bar_offset * (i + 1), base_y, 0, props);
    }

    ctx.strokeStyle = props.foreground_style;

    ctx.clearRect(0, base_y - 1, width, 2);
    ctx.beginPath();
    ctx.moveTo(0, base_y);
    ctx.lineTo(width, base_y);
    ctx.stroke();
}

/**
 * @param {CanvasRenderingContext2D} ctx the canvas context to draw on
 * @param {number} width  the width of the drawing-area
 * @param {number} height the height of the drawing-area
 * @param {number[]} values the values of the bars
 * @param {number[]} prev_values the previous bar-values
 * @param {string[]} labels the labels of the bars
 * @param {Readonly<BarGraphDisplayProperties>} props properties of the bar graph
 */
function update_graph(ctx, width, height, values, prev_values, labels, props = default_bar_graph_display_properties) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const base_y = height - props.label_height;

    const max_height = base_y - props.top_padding;
    const bar_heights = scale_heights(max_height, values);
    const prev_heights = scale_heights(max_height, prev_values);

    const num_bars = Math.min(values.length, labels.length, prev_values.length);
    const bar_offset = width / (num_bars + 1);

    ctx.clearRect(0, 0, width, props.top_padding);
    ctx.clearRect(0, base_y, width, height - base_y);

    for (var i = 0; i < num_bars; ++i) {
        draw_bar(ctx, bar_heights[i], labels[i], values[i], bar_offset * (i + 1), base_y, prev_heights[i], props);
    }

    ctx.strokeStyle = props.foreground_style;

    ctx.clearRect(0, base_y - 1, width, 2);
    ctx.beginPath();
    ctx.moveTo(0, base_y);
    ctx.lineTo(width, base_y);
    ctx.stroke();
}

export { draw_graph, update_graph, default_bar_graph_display_properties };