const path = require("path");

module.exports = {
	mode: "production",
	entry: {
		genpool: path.resolve(__dirname, "src", "genpool", "index.js"),
		natsel: path.resolve(__dirname, "src", "natsel", "index.js"),
		bargraphelem: path.resolve(__dirname, "src", "bar-graph", "bar-graph-elem.js")
	},
	output: {
		path: path.resolve(__dirname, "website"),
		filename: '[name].js',
	}
};
