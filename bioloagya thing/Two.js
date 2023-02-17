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
            if (gSum == 0) {
                hr++;
            } else if (gSum == 1) {
                he++;
            } else {
                hd++;
            }
            dNew -= gSum;
            rNew -= 2 - gSum;
        }
        gens[i] = [[hd, he, hr], d / (d + r), r / (d + r)];
        console.log(i + ":\t" + gens[i][0][0] + "\t" + gens[i][0][1] + "\t" + gens[i][0][2] + "\t" + gens[i][1] + "\t" + gens[i][2]);
        // kill some off in a specific ratio, determined by natSel
        var hd = Math.round(gens[i][0][0] * (1 - natSel[0] / 100));
        var he = Math.round(gens[i][0][1] * (1 - natSel[1] / 100));
        var hr = Math.round(gens[i][0][2] * (1 - natSel[2] / 100));
        d = 2 * hd + he;
        r = 2 * hr + he;
        // normalize d and r to ind
        d = Math.round(ind * d / (d + r));
        r = ind - d;
    }
}

run();
