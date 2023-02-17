function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function run() {
    var numGens = 25;
    var natSel = [10, 30, 90]; // in percent
    var gens = new Array();
    var ind = 5000000;
    var d = random(0, ind * 2);
    var r = ind * 2 - d;
    for (var i = 0; i < numGens; i++) {
        // theoretical
        var p = d / (d + r);
        var q = r / (d + r);
        var thd = p * p * ind;
        var the = 2 * p * q * ind;
        var thr = q * q * ind;
        // experimental
        var dNew = d;
        var rNew = r;
        var hd = 0, he = 0, hr = 0; // num individuals (not percent)
        for (var j = 0; j < ind; j++) {
            var g1 = random(0, dNew + rNew - 1) < dNew ? 1 : 0;
            var g2 = random(0, dNew + rNew - 1) < dNew ? 1 : 0;
            var gSum = g1 + g2;
            if (gSum == 0 && random(0, 100) <= natSel[2]) {
                hr++;
            } else if (gSum == 1 && random(0, 100) <= natSel[1]) {
                he++;
            } else if (gSum == 2 && random(0, 100) <= natSel[0]) {
                hd++;
            }
            dNew -= gSum;
            rNew -= 2 - gSum;
        }
        gens[i] = [[hd, he, hr], d / (d + r), r / (d + r)];
        console.log(i + ":\t" + gens[i][0][0] + "\t" + gens[i][0][1] + "\t" + gens[i][0][2] + "\t" + gens[i][1] + "\t" + gens[i][2]);
        d = 2 * hd + he;
        r = 2 * hr + he;
        // normalize d and r to ind
        d = Math.round(ind * d / (d + r));
        r = ind - d;
    }
}

run();

// MODIFY
/*
Parameters: individuals (integer), p (float 0-1), generations (integer), natsel rates (3 floats 0-1)
Outputs: Array of gens; each gen is an array of 3 integers [# ind rec, het, dom]
*/