import "./common.js"
import { Chart, BarController, BarElement } from "chart.js";

Chart.register(
	BarController,
	BarElement
);

/**
 * @description Creates a bar Chart with labels [aa, Aa, AA] and values [0, 0, 0]
 *
 * @param {HTMLCanvasElement} canvas the canvas to hold the chart
 * @returns {Chart} the chart created to render in the canvas
 */
function create_pool_chart(canvas) {
	return new Chart(
		canvas,
		{
			type: "bar",
			data: {
				labels: ["aa", "Aa", "AA"],
				datasets: [{
					label: "Number of Individuals",
					data: [0, 0, 0]
				}]
			}
		}
	);
}

export { create_pool_chart }
