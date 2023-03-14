// Genetic drift. Not the same as just generating the population with a specific p/q repeatedly

/**
 * @param {number} a lower bound
 * @param {number} b upper bound
 * @param {() => number} random random number generator
 * @returns {number} random integer between a and b inclusive
 */
function random(a, b, random) {
    return Math.floor(random() * (b - a + 1)) + a;
}

/**
 * @param {number} a seed for random number generator
 * @returns {() => number} random number between 0 and 1
 * @description https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 * I needed a seedable random number generator
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
 * 
 * @param {number} aa number of individuals with genotype aa
 * @param {number} Aa number of individuals with genotype Aa
 * @param {number} AA number of individuals with genotype AA
 * @param {() => number} rand random number generator
 * @returns {number[]} new gen information of the form [num aa, num Aa, num AA]
 */
function reproduce(aa, Aa, AA, rand) {
    const total = aa + Aa + AA;
    const totalRecessive = 2 * aa + Aa;
    const totalDominant = 2 * AA + Aa;
    // hardy weinberg
    const p = totalDominant / (2 * total);
    const q = 1 - p;
    const p2 = p * p;
    const q2 = q * q;
    const pq = 2 * p * q;
    const p2Ind = Math.round(total * p2);
    const q2Ind = Math.round(total * q2);
    const pqInd = Math.round(total * pq);
    const gen = [0, 0, 0];
    for (let i = 0; i < total; i++) {
        const individual = random(0, total - 1, rand);
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
 * @param {number} numIndividuals number of individuals in the population
 * @param {number} pFloat probability of an individual having the dominant allele
 * @param {number} numGenerations number of generations to simulate
 * @param {number} seed seed for random number generator
 * @returns {number[][]} array of gen information of the form [num aa, num Aa, num AA]
 */
function run(numIndividuals, pFloat, numGenerations, seed = 0) {
    const rand = mulberry32(seed);
    const p = pFloat;
    const q = 1 - p;
    const genData = [[numIndividuals * q * q, numIndividuals * 2 * p * q, numIndividuals * p * p]]; // hardy-weinberg
    for (let i = 1; i < numGenerations; i++) {
        genData[i] = reproduce(genData[i - 1][0], genData[i - 1][1], genData[i - 1][2], rand);
    }
    return genData;
}

export { run };