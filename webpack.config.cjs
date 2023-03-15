const path = require("path");
const LicensePlugin = require("webpack-license-plugin");

module.exports = {
	mode: "development",
	entry: {
		genpool: path.resolve(__dirname, "src", "genpool", "index.js"),
		natsel: path.resolve(__dirname, "src", "natsel", "index.js"),
		geneflow: path.resolve(__dirname, "src", "geneflow", "index.js")
	},
	output: {
		path: path.resolve(__dirname, "website"),
		filename: '[name].js',
	},
	plugins: [
		new LicensePlugin()
	]
};
