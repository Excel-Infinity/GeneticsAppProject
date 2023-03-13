/**
 * @param {number} a lower bound
 * @param {number} b upper bound
 * @returns {number} random integer between a and b inclusive
 */
function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * @param {number[]} pop gen information of the form [num aa, num Aa, num AA]
 * @param {number[]} natsel array form of survival chances (0-1) [aa chance, Aa chance, AA chance]
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function natSel(pop, natsel) {
    const newPopulation = [0, 0, 0];
    for (let i = 0; i < pop[0]; i++) {
        if (Math.random() < natsel[0]) {
            newPopulation[0]++;
        }
    }
    for (let i = 0; i < pop[1]; i++) {
        if (Math.random() < natsel[1]) {
            newPopulation[1]++;
        }
    }
    for (let i = 0; i < pop[2]; i++) {
        if (Math.random() < natsel[2]) {
            newPopulation[2]++;
        }
    }
    return newPopulation;
}

/**
 * @param {number[]} population gen information of the form [num aa, num Aa, num AA]
 * @param {number} totalIndividuals total number of individuals in the population
 * @returns {number} allele sum; 0 for aa, 1 for Aa, 2 for AA
 */
function reproduceIndividual(population, totalIndividuals) {
    let alleleSum = 0;
    const parent1 = random(0, totalIndividuals - 1);
    const parent2 = random(0, totalIndividuals - 1);
    if (parent1 < population[0]) { // aa
        alleleSum += 0;
    } else if (parent1 < population[0] + population[1]) { // Aa
        alleleSum += random(0, 1);
    } else { // AA
        alleleSum += 1;
    }
    if (parent2 < population[0]) { // aa
        alleleSum += 0;
    } else if (parent2 < population[0] + population[1]) { // Aa
        alleleSum += random(0, 1);
    } else { // AA
        alleleSum += 1;
    }
    return alleleSum;
}

/**
 * @param {number[]} population gen information of the form [num aa, num Aa, num AA]
 * @param {number} totalIndividuals total number of individuals in the population
 * @returns {number[]} new population of the form [num aa, num Aa, num AA]
 */
function reproduce(population, totalIndividuals) {
    const newPopulation = [0, 0, 0];
    for (let i = 0; i < totalIndividuals; i++) {
        const alleleSum = reproduceIndividual(population, totalIndividuals);
        newPopulation[alleleSum]++;
    }
    return newPopulation;
}

/**
 * @param {number[]} population gen information of the form [num aa, num Aa, num AA]
 * @param {number} totalIndividuals total number of individuals in the population
 * @returns {number[]} normalized population of the form [num aa, num Aa, num AA]
 */
function normalize(population, totalIndividuals) {
    const newPopulation = [0, 0, 0];
    const shortTotalIndividuals = population[0] + population[1] + population[2];
    for (let i = 0; i < population.length; i++) {
        newPopulation[i] = Math.round(totalIndividuals * population[i] / shortTotalIndividuals);
    }
    return newPopulation;
}

/**
 * @param {number[]} prevGen previous gen information of the form [num aa, num Aa, num AA]
 * @param {number[]} naturalSelection array form of survival chances (0-1) [aa chance, Aa chance, AA chance]
 * @returns {number[]} gen information of the form [num aa, num Aa, num AA]
 */
function gen(prevGen, naturalSelection) {
    const totalIndividuals = prevGen[0] + prevGen[1] + prevGen[2];
    let newGen = natSel(prevGen, naturalSelection);
    newGen = reproduce(newGen, totalIndividuals);
    newGen = normalize(newGen, totalIndividuals);
    return newGen;
}

/**
 * @param {number} numIndividuals number of individuals in the pool
 * @param {number} pFloat fraction of alleles being dominant
 * @param {number} numGenerations number of generations to run
 * @param {number[]} naturalSelection array form of survival chances (0-1) [aa chance, Aa chance, AA chance]
 * @returns {number[][]} array of gen information, each element is of the form [num aa, num Aa, num AA]
 */
function run(numIndividuals, pFloat, numGenerations, naturalSelection) {
    const p = pFloat;
    const q = 1 - p;
    const gens = [[Math.round(numIndividuals * q * q), Math.round(numIndividuals * 2 * q * p), Math.round(numIndividuals * p * p)]];
    for (let i = 1; i < numGenerations; i++) {
        const prevGen = gens[i - 1];
        gens[i] = gen(prevGen, naturalSelection);
    }
    return gens;
}

/*
Parameters: (
    individuals (integer),
    p (float 0-1), <- maps to dominant allele
    generations (integer),
    natsel rates (3 floats 0-1)
)
Output: Array of gens; each gen is an array of 3 integers [# ind rec, # ind hetero, # ind dom]
*/

export { run };
