// @ts-check

/**
 * @typedef {Object} SurvivalChances
 * Chances range from 0 (inclusive) to 1 (inclusive).
 * @property {number} recessive    the chance of survival of a homozygous-recessive individuaul
 * @property {number} heterozygous the chance of survival of a heterozygous individual
 * @property {number} dominant     the chance of survival of a homozygous-dominant individuaul
 */

/**
 * @typedef {import("./gene_pool").GenePool} GenePool
 */

/**
 * @param {GenePool} pool the initial pool
 * @param {SurvivalChances} survival_chances
 * @returns {GenePool} a new gene pool representing the population after natural selection
 */
function run_selection(pool, survival_chances) {
	const new_gene_pool = Object.assign({}, pool);

	for (var i = 0; i < pool.num_recessive; ++i) {
		if (Math.random() >= survival_chances.recessive) {
			--new_gene_pool.num_recessive;
		}
	}

	for (var i = 0; i < pool.num_heterozygous; ++i) {
		if (Math.random() >= survival_chances.heterozygous) {
			--new_gene_pool.num_heterozygous;
		}
	}

	for (var i = 0; i < pool.num_dominant; ++i) {
		if (Math.random() >= survival_chances.dominant) {
			--new_gene_pool.num_dominant;
		}
	}

	return new_gene_pool;
}

export { run_selection };
