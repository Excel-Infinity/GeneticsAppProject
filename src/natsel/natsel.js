function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * @param {number} numIndividuals the number of individuals in the pool
 * @param {number} pFloat the percent of alleles being dominant
 * @param {number} numGenerations the number of generations to run
 * @param {number[]} naturalSelection array form of survival chances (0-1) [aa chance, Aa chance, AA chance]
 *
 * @returns {number[][]} array of gen information, each element is of the form [num aa, num Aa, num AA]
 */
function calcGens(numIndividuals, pFloat, numGenerations, naturalSelection) {
    var ind = numIndividuals;
    var p = pFloat;
    var q = 1 - p;
    var totalDomAllele = p * ind;
    var totalRecAllele = q * ind;
    var gens = [[0, 0, 0]];
    var numGens = numGenerations;
    var natSelRates = [naturalSelection[0], naturalSelection[1], naturalSelection[2]];
    var isFirstGen = true;
    for (var i = 1; i < numGens; i++) {
        var tempDom = totalDomAllele;
        var tempRec = totalRecAllele;
        var dom = 0, hetero = 0, rec = 0;
        for (var j = 0; j < ind; j++) {
            var allele1 = random(0, tempDom + tempRec - 1) < tempDom ? 1 : 0;
            tempDom -= allele1;
            tempRec -= 1 - allele1;
            var allele2 = random(0, tempDom + tempRec - 1) < tempDom ? 1 : 0;
            tempDom -= allele2;
            tempRec -= 1 - allele2;
            var alleleSum = allele1 + allele2;
            if (alleleSum == 0) {
                if (Math.random() < natSelRates[0]) {
                    rec++;
                }
                if (isFirstGen) {
                    gens[0][0]++;
                }
            } else if (alleleSum == 1) {
                if (Math.random() < natSelRates[1]) {
                    hetero++;
                }
                if (isFirstGen) {
                    gens[0][1]++;
                }
            } else if (alleleSum == 2) {
                if (Math.random() < natSelRates[2]) {
                    dom++;
                }
                if (isFirstGen) {
                    gens[0][2]++;
                }
            }
        }
        isFirstGen = false;
        totalDomAllele = 2 * dom + hetero;
        totalRecAllele = 2 * rec + hetero;
        // normalize to ind
        totalDomAllele = Math.round(ind * totalDomAllele / (totalDomAllele + totalRecAllele));
        totalRecAllele = ind - totalDomAllele;
        var total = rec + hetero + dom;
        rec = Math.round(ind * rec / total);
        hetero = Math.round(ind * hetero / total);
        dom = ind - rec - hetero;
        gens[i] = [rec, hetero, dom];
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

export { calcGens };
