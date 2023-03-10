// @ts-check
/**
 * @param {number} a lower bound
 * @param {number} b upper bound
 * @returns {number} random integer between a and b inclusive
 */
function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * @param {number[]} pop [rec, hetero, dom]
 * @param {number} popInd total number of individuals
 * @returns {number} alleleSum
 */
function reproduceInd(pop, popInd) {
    var parent1 = random(0, popInd - 1);
    var parent2 = random(0, popInd - 1);
    if (parent1 < pop[0]) { // hrec
        var allele1 = 0;
    } else if (parent1 < pop[0] + pop[1]) { // hetero
        var allele1 = random(0, 1);
    } else { // hdom
        var allele1 = 1;
    }
    if (parent2 < pop[0]) { // hrec
        var allele2 = 0;
    } else if (parent2 < pop[0] + pop[1]) { // hetero
        var allele2 = random(0, 1);
    } else { // hdom
        var allele2 = 1;
    }
    var alleleSum = allele1 + allele2; // 0 = rec, 1 = hetero, 2 = dom
    return alleleSum;
}

/**
 * @param {number[]} pop [rec, hetero, dom]
 * @param {number} gFlow flow rate
 * @returns {number[]} new pop, UNFINISHED (the rest goes into the flow part)
 * @description the basic idea should actually be more accurate than the reproduction in simple and natsel, though this version uses gFlow instead of just popInd
 * @todo transfer this to the other files
 */
function reproduceOne(pop, gFlow) {
    var newPop = [0, 0, 0];
    var popInd = pop[0] + pop[1] + pop[2];
    var notFlow = Math.round(popInd * (1 - gFlow));
    for (var i = 0; i < notFlow; i++) {
        var alleleSum = reproduceInd(pop, popInd);
        newPop[alleleSum]++;
    }
    return newPop;
}

/**
 * @param {number[]} pop1 [rec, hetero, dom]
 * @param {number[]} pop2 [rec, hetero, dom]
 * @param {number[]} originalP1 [rec, hetero, dom]
 * @param {number[]} originalP2 [rec, hetero, dom]
 * @param {number} popInd total number of individuals
 * @returns {number[][]} new pops, finished
 */
function flow(pop1, pop2, originalP1, originalP2, popInd) {
    // pop1 and pop2 are NOT complete
    var indToGo = popInd - (pop1[0] + pop1[1] + pop1[2]); // should be the same for pop2
    var newPop1 = [pop1[0], pop1[1], pop1[2]];
    var newPop2 = [pop2[0], pop2[1], pop2[2]];
    for (var i = 0; i < indToGo; i++) {
        // call reproduceInd but with the original pops
        var alleleSum1 = reproduceInd(originalP1, popInd);
        var alleleSum2 = reproduceInd(originalP2, popInd);
        newPop1[alleleSum1]++;
        newPop2[alleleSum2]++;
    }
    return [newPop1, newPop2];
}

/**
 * @param {number[][]} pop [[rec, hetero, dom], [natsel rates]]
 * @returns {number[]} new pop
 * @todo make this more efficient (maybe not possible or necessary)
 * @todo transfer this to the other files
 */
function natSel(pop) {
    var newPop = [0, 0, 0];
    // for each individual, have a chance to die
    // natsel rates are 0-1 for Math.random() usage
    for (var i = 0; i < pop[0][0]; i++) {
        if (Math.random() > pop[1][0]) {
            newPop[0]++;
        }
    }
    for (var i = 0; i < pop[0][1]; i++) {
        if (Math.random() > pop[1][1]) {
            newPop[1]++;
        }
    }
    for (var i = 0; i < pop[0][2]; i++) {
        if (Math.random() > pop[1][2]) {
            newPop[2]++;
        }
    }
    return newPop;
}

/**
 * @param {number[]} pop [rec, hetero, dom]
 * @param {number} popInd total number of individuals
 * @returns {number[]} new pop
 */
function normalize(pop, popInd) {
    var newPop = [0, 0, 0];
    var total = pop[0] + pop[1] + pop[2];
    newPop[0] = Math.round(popInd * pop[0] / total);
    newPop[1] = Math.round(popInd * pop[1] / total);
    newPop[2] = popInd - newPop[0] - newPop[1];
    return newPop;
}

/**
 * @param {number[]} pop [rec, hetero, dom]
 * @param {number} gFlow gene flow (float 0-1)
 * @returns {number[]} new pop
 */
function reproduce(pop, gFlow) {
    var newPop = [0, 0, 0];
    var popInd = pop[0] + pop[1] + pop[2];
    var notFlow = Math.round(popInd * (1 - gFlow));
    for (var i = 0; i < notFlow; i++) {
        var alleleSum = reproduceInd(pop, popInd);
        newPop[alleleSum]++;
    }
    return newPop;
}

/**
 * @param {number[][]} pop1 [[rec, hetero, dom], [natsel rates]]
 * @param {number[][]} pop2 [[rec, hetero, dom], [natsel rates]]
 * @param {number} gFlow gene flow (float 0-1)
 * @returns {number[][]} one gen [new pop1, new pop2]. Note that this is a 2d array because it does not change natsel rates
 */
function gen(pop1, pop2, gFlow) {
    var popInd = pop1[0][0] + pop1[0][1] + pop1[0][2];
    var newPop1 = reproduce(pop1[0], gFlow);
    var newPop2 = reproduce(pop2[0], gFlow);
    // reproduce
    var flowPops = flow(newPop1, newPop2, pop1[0], pop2[0], popInd);
    newPop1 = flowPops[0];
    newPop2 = flowPops[1];
    // natsel
    newPop1 = natSel([newPop1, pop1[1]]);
    newPop2 = natSel([newPop2, pop2[1]]);
    // normalize
    newPop1 = normalize(newPop1, popInd);
    newPop2 = normalize(newPop2, popInd);
    // return
    return [newPop1, newPop2];
}

/**
 * @param {number[][]} pop1 [[rec, hetero, dom], [natsel rates]]
 * @param {number[][]} pop2 [[rec, hetero, dom], [natsel rates]]
 * @param {number} gFlow gene flow (float 0-1)
 * @param {number} gens number of generations
 * @returns {number[][][]} array of [new pop1, new pop2]
 */
function main(pop1, pop2, gFlow, gens) {
    var pop1Raw = [pop1[0][0], pop1[0][1], pop1[0][2]];
    var pop2Raw = [pop2[0][0], pop2[0][1], pop2[0][2]];
    var genArr = [[pop1Raw, pop2Raw]];
    for (var i = 1; i <= gens; i++) {
        genArr[i] = gen(pop1, pop2, gFlow);
        pop1 = [genArr[i][0], pop1[1]];
        pop2 = [genArr[i][1], pop2[1]];
    }
    return genArr;
}

/**
 * @param {number} p1 p for pop1
 * @param {number} p2 p for pop2
 * @param {number} gFlow gene flow (float 0-1)
 * @param {number} gens number of generations
 * @param {number} ind number of individuals
 * @param {number[]} natsel1 natsel rates for pop1
 * @param {number[]} natsel2 natsel rates for pop2
 * @returns {number[][][]} array of [new pop1, new pop2]
 */
function run(p1, p2, gFlow, gens, ind, natsel1, natsel2) {
    // hardy weinberg
    // first one is p * p, second is 2 * p * q, third is q * q
    var q1 = 1 - p1;
    var q2 = 1 - p2;
    var tempPop1 = [Math.round(ind * p1 * p1), Math.round(ind * 2 * p1 * q1), Math.round(ind * q1 * q1)];
    var tempPop2 = [Math.round(ind * p2 * p2), Math.round(ind * 2 * p2 * q2), Math.round(ind * q2 * q2)];
    var pop1 = [tempPop1, natsel1];
    var pop2 = [tempPop2, natsel2];
    return main(pop1, pop2, gFlow, gens);
}

/*
Parameters: (
    individuals (integer), : [0, 0]
    2 p (float 0-1), <- maps to dominant allele : [0, 0]
    generations (integer), : 0
    natsel rates for both (2 arrays {3 floats 0-1}), : [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0]], rec, hetero, dom
    gene flow % (float 0-1) : 0.0
)
Output: (
    [gen1, gen2, ...]
    gen1 = [pop1, pop2]
    pop1 = [rec, hetero, dom]
    3 dimensional array
)
*/