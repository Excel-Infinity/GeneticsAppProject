import {
	Chart,
	CategoryScale,
	LinearScale,
	Colors,
	Tooltip,
	Title,
	Legend
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
	CategoryScale,
	LinearScale,
	Colors,
	Tooltip,
	Title,
	Legend,
	ChartDataLabels
);
