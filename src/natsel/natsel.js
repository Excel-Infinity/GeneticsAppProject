/**
 * @param {number} a seed for random number generator
 * @returns {() => number} function to create a random number between 0 and 1
 * @description https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 */
function mulberry32(a) {
    return function() {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/**
 * @param {number} a lower bound
 * @param {number} b upper bound
 * @param {() => number} rand random number generator
 * @returns {number} random integer between a and b inclusive
 */
function random(a, b, rand) {
    return Math.floor(rand() * (b - a + 1)) + a;
}

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
 * @param {() => number} rand random number generator
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function reproduce(population, totalIndividuals, rand) {
    const aa = population[0];
    const Aa = population[1];
    const AA = population[2];
    const totalRecessive = 2 * aa + Aa;
    const totalDominant = 2 * AA + Aa;
    // hardy weinberg
    const p = totalDominant / (2 * totalIndividuals);
    const q = 1 - p;
    const p2 = p * p;
    const q2 = q * q;
    const pq = 2 * p * q;
    const p2Ind = Math.round(totalIndividuals * p2);
    const q2Ind = Math.round(totalIndividuals * q2);
    const pqInd = Math.round(totalIndividuals * pq);
    const gen = [0, 0, 0];
    for (let i = 0; i < totalIndividuals; i++) {
        const individual = random(0, totalIndividuals - 1, rand);
        if (individual < p2Ind) {
            gen[2]++;
        } else if (individual < p2Ind + pqInd) {
            gen[1]++;
        } else {
            gen[0]++;
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
 * @param {number} seed seed for random number generator
 * @returns {number[][]} array of gen information, each element is of the form [num aa, num Aa, num AA]
 */
function run(numIndividuals, pFloat, numGenerations, naturalSelection, seed) {
    const p = pFloat;
    const q = 1 - p;
    const gens = [[Math.round(numIndividuals * q * q), Math.round(numIndividuals * 2 * q * p), Math.round(numIndividuals * p * p)]];
    const rand = mulberry32(seed);
    for (let i = 1; i < numGenerations; i++) {
        const prevGen = gens[i - 1];
        gens[i] = gen(prevGen, naturalSelection, rand);
    }
    return gens;
}

export { run };
