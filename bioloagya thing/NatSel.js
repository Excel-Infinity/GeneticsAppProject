function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function run(numIndividuals, pFloat, numGenerations, naturalSelection) {
    var ind = numIndividuals;
    var p = pFloat;
    var q = 1 - p;
    var d = p * ind;
    var r = q * ind;
    var gens = [[0, 0, 0]];
    var numGens = numGenerations;
    var natSel = [naturalSelection[0] * 100, naturalSelection[1] * 100, naturalSelection[2] * 100];
    var why = true;
    for (var i = 1; i < numGens; i++) {
        var dNew = d;
        var rNew = r;
        var dom = 0, hetero = 0, rec = 0;
        for (var j = 0; j < ind; j++) {
            var g1 = random(0, dNew + rNew - 1) < dNew ? 1 : 0;
            var g2 = random(0, dNew + rNew - 1) < dNew ? 1 : 0;
            var gSum = g1 + g2;
            if (gSum == 0) {
                if (random(0, 100) > natSel[2]) {
                    rec++;
                }
                if (why) {
                    gens[0][0]++;
                }
            } else if (gSum == 1) {
                if (random(0, 100) > natSel[1]) {
                    hetero++;
                }
                if (why) {
                    gens[0][1]++;
                }
            } else if (gSum == 2) {
                if (random(0, 100) > natSel[0]) {
                    dom++;
                }
                if (why) {
                    gens[0][2]++;
                }
            }
            dNew -= gSum;
            rNew -= 2 - gSum;
        }
        why = false;
        d = 2 * dom + hetero;
        r = 2 * rec + hetero;
        // normalize d and r to ind
        d = Math.round(ind * d / (d + r));
        r = ind - d;
        // normalize rec, hetero, dom to ind
        var total = rec + hetero + dom;
        rec = Math.round(ind * rec / total);
        hetero = Math.round(ind * hetero / total);
        dom = ind - rec - hetero;
        gens[i] = [rec, hetero, dom];
    }
    for (var i = 0; i < gens.length; i++) {
        console.log(i + ":\t" + gens[i][0] + "\t" + gens[i][1] + "\t" + gens[i][2]);
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
Outputs: Array of gens; each gen is an array of 3 integers [# ind rec, # ind hetero, # ind dom]
*/