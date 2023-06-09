/**
 * @param {number[]} population gen information of the form [num aa, num Aa, num AA]
 * @param {number} flowRate rate at which individuals flow in or out; positive means in and negative means out (net individual count)
 * @param {number[]} otherPop gen information of the form [num aa, num Aa, num AA]
 * @param {() => number} rand random number generator
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function flow(population, flowRate, otherPop, rand) {
    if (flowRate > 0) {
        return flowIn(population, flowRate, otherPop, rand);
    } else {
        return flowOut(population, flowRate, rand);
    }
}

/**
 * @param {number[]} population gen information of the form [num aa, num Aa, num AA]
 * @param {number} flowRate rate at which individuals flow out; should be negative
 * @param {() => number} rand random number generator
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function flowOut(population, flowRate, rand) {
    const gen = [population[0], population[1], population[2]];
    const total = population[0] + population[1] + population[2];
    for (let i = 0; i < -flowRate; i++) {
        const randNum = rand() * total;
        if (randNum < population[0]) {
            gen[0]--;
        } else if (randNum < (population[0] + population[1])) {
            gen[1]--;
        } else {
            gen[2]--;
        }
    }
    return gen;
}

/**
 * @param {number[]} population gen information of the form [num aa, num Aa, num AA]
 * @param {number} flowRate rate at which individuals flow in; should be positive
 * @param {number[]} otherPop gen information of the form [num aa, num Aa, num AA]
 * @param {() => number} rand random number generator
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function flowIn(population, flowRate, otherPop, rand) {
    const gen = [population[0], population[1], population[2]];
    const total = otherPop[0] + otherPop[1] + otherPop[2];
    for (let i = 0; i < flowRate; i++) {
        const randNum = rand() * total;
        if (randNum < otherPop[0]) {
            gen[0]++;
        } else if (randNum < (otherPop[0] + otherPop[1])) {
            gen[1]++;
        } else {
            gen[2]++;
        }
    }
    return gen;
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
 * @param {number} totalIndividuals total number of individuals to normalize to
 * @param {number} flowRate rate at which individuals flow in or out; positive means in and negative means out (net individual count)
 * @param {number[]} otherPop gen information of the form [num aa, num Aa, num AA]
 * @param {() => number} rand random number generator
 * @returns {number[]} gen information of the form [num aa, num Aa, num AA]
 */
function gen(prevGen, totalIndividuals, flowRate, otherPop = prevGen, rand) {
    let newGen = flow(prevGen, flowRate, otherPop, rand);
    newGen = normalize(newGen, totalIndividuals);
    return newGen;
}

/**
 * @param {number} numIndividuals number of individuals in the pool
 * @param {number} pFloat fraction of alleles being dominant
 * @param {number} numGenerations number of generations to run
 * @param {number} flowRate rate at which individuals flow in or out; positive means in and negative means out (net individual count)
 * @param {number[]} otherPop gen information of the form [num aa, num Aa, num AA]
 * @param {() => number} rand random number generator
 * @returns {number[][]} array of gen information, each element is of the form [num aa, num Aa, num AA]
 */
function run(numIndividuals, pFloat, numGenerations, flowRate, otherPop, rand) {
    const p = pFloat;
    const q = 1 - p;
    const gens = [[Math.round(numIndividuals * q * q), Math.round(numIndividuals * 2 * q * p), Math.round(numIndividuals * p * p)]];
    for (let i = 1; i < numGenerations; i++) {
        const prevGen = gens[i - 1];
        gens[i] = gen(prevGen, numIndividuals, flowRate, otherPop, rand);
    }
    return gens;
}

export { run };
