function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function calcGens(numIndividuals, pFloat, numGenerations, naturalSelection) {
    var ind = numIndividuals;
    var p = pFloat;
    var q = 1 - p;
    var totalDomAllele = p * ind;
    var totalRecAllele = q * ind;
    var gens = [[0, 0, 0]];
    var numGens = numGenerations;
    var natSelRates = [naturalSelection[0] * 100, naturalSelection[1] * 100, naturalSelection[2] * 100];
    var isFirstGen = true;
    for (var i = 1; i < numGens; i++) {
        var tempDom = totalDomAllele;
        var tempRec = totalRecAllele;
        var dom = 0, hetero = 0, rec = 0;
        for (var j = 0; j < ind; j++) {
            var allele1 = random(0, tempDom + tempRec - 1) < tempDom ? 1 : 0;
            var allele2 = random(0, tempDom + tempRec - 1) < tempDom ? 1 : 0;
            var alleleSum = allele1 + allele2;
            if (alleleSum == 0) {
                if (random(0, 100) > natSelRates[2]) {
                    rec++;
                }
                if (isFirstGen) {
                    gens[0][0]++;
                }
            } else if (alleleSum == 1) {
                if (random(0, 100) > natSelRates[1]) {
                    hetero++;
                }
                if (isFirstGen) {
                    gens[0][1]++;
                }
            } else if (alleleSum == 2) {
                if (random(0, 100) > natSelRates[0]) {
                    dom++;
                }
                if (isFirstGen) {
                    gens[0][2]++;
                }
            }
            tempDom -= alleleSum;
            tempRec -= 2 - alleleSum;
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
    natSelRates rates (3 floats 0-1)
)
Outputs: Array of gens; each gen is an array of 3 integers [# ind rec, # ind hetero, # ind dom]
*/