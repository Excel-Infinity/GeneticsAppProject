/**
 * @typedef {Object} GenePool
 * @property {number} num_recessive    the number of homozygous-recessive individuals in the pool
 * @property {number} num_heterozygous the number of heterozygous individuals in the pool
 * @property {number} num_dominant     the number of homozygous-dominant individuals in the pool
 */

/**
 * @typedef {Object} IndividualType
 * @property {boolean} has_dominant true if the individual has a copy of the dominant allele
 * @property {boolean} has_recessive true if the individual has a copy of the recessive allele
 */

/** @type {Readonly<IndividualType>} */
const type_recessive    = Object.freeze({has_dominant: false, has_recessive: true });
/** @type {Readonly<IndividualType>} */
const type_heterozygous = Object.freeze({has_dominant: true,  has_recessive: true });
/** @type {Readonly<IndividualType>} */
const type_dominant     = Object.freeze({has_dominant: true,  has_recessive: false});

/**
 * @param {number} p the chance of any given allele being dominant, in the range [0, 1]
 * @param {number} num_individuals the number of individuals in the returned pool
 * @returns {GenePool} the newly-created gene pool object
 */
function generate_pool(p, num_individuals) {
	const gene_pool = {
		num_recessive: 0,
		num_heterozygous: 0,
		num_dominant: 0
	};

	for (var i = 0; i < num_individuals; ++i) {
		const first_allele_is_dominant = Math.random() < p;
		const second_allele_is_dominant = Math.random() < p;

		if (first_allele_is_dominant !== second_allele_is_dominant) {
			++gene_pool.num_heterozygous;
			continue;
		}

		if (first_allele_is_dominant) {
			++gene_pool.num_dominant;
			continue;
		}

		++gene_pool.num_recessive;
	}


	return gene_pool;
}

/**
 * @param {GenePool} pool the pool to draw and remove from
 * @returns {IndividualType} the type of the individual drawn
 */
function select_and_remove(pool) {
	const num_individuals = pool.num_recessive + pool.num_heterozygous + pool.num_dominant;
	const random_individual_index = Math.floor(Math.random() * num_individuals);

	if (random_individual_index < pool.num_recessive) {
		return type_recessive;
	}

	if (random_individual_index < pool.num_recessive + pool.num_heterozygous) {
		return type_heterozygous;
	}

	return type_dominant;
}

export { generate_pool, select_and_remove, type_recessive, type_heterozygous, type_dominant };
