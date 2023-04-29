/**
 * @param {number[]} pop gen information of the form [num aa, num Aa, num AA]
 * @param {number[]} natsel array form of survival chances (0-1) [aa chance, Aa chance, AA chance]
 * @param {() => number} rand random number generator
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function natSel(pop, natsel, rand) {
    const newPopulation = [0, 0, 0];
    for (let i = 0; i < pop[0]; i++) {
        if (rand() < natsel[0]) {
            newPopulation[0]++;
        }
    }
    for (let i = 0; i < pop[1]; i++) {
        if (rand() < natsel[1]) {
            newPopulation[1]++;
        }
    }
    for (let i = 0; i < pop[2]; i++) {
        if (rand() < natsel[2]) {
            newPopulation[2]++;
        }
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
 * @param {() => number} rand random number generator
 * @returns {number[]} gen information of the form [num aa, num Aa, num AA]
 */
function gen(prevGen, naturalSelection, rand) {
    const totalIndividuals = prevGen[0] + prevGen[1] + prevGen[2];
    let newGen = natSel(prevGen, naturalSelection, rand);
    //newGen = reproduce(newGen, totalIndividuals, rand);
    newGen = normalize(newGen, totalIndividuals);
    return newGen;
}

/**
 * @param {number} numIndividuals number of individuals in the pool
 * @param {number} pFloat fraction of alleles being dominant
 * @param {number} numGenerations number of generations to run
 * @param {number[]} naturalSelection array form of survival chances (0-1) [aa chance, Aa chance, AA chance]
 * @param {() => number} rand random number generator
 * @returns {number[][]} array of gen information, each element is of the form [num aa, num Aa, num AA]
 */
function run(numIndividuals, pFloat, numGenerations, naturalSelection, rand) {
    const p = pFloat;
    const q = 1 - p;
    const gens = [[Math.round(numIndividuals * q * q), Math.round(numIndividuals * 2 * q * p), Math.round(numIndividuals * p * p)]];
    for (let i = 1; i < numGenerations; i++) {
        const prevGen = gens[i - 1];
        gens[i] = gen(prevGen, naturalSelection, rand);
    }
    return gens;
}

export { run };
