import "./common.js";
import { Chart, LineController, LineElement, PointElement } from "chart.js";

Chart.register(
	LineController,
	LineElement,
	PointElement
);

/**
 * @description Creates a line Chart with datasets that have labels [aa, Aa, AA]
 *
 * @param {HTMLCanvasElement} canvas the canvas to hold the chart
 * @returns {Chart} the chart, which will render in the canvas
 */
function create_progress_chart(canvas) {
	return new Chart(
		canvas,
		{
			type: "line",
			data: { datasets: [
				{ label: "aa", data: [] },
				{ label: "Aa", data: [] },
				{ label: "AA", data: [] }
			]}
		}
	);
}

export { create_progress_chart };
