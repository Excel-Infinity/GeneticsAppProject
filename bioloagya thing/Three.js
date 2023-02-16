function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function run() {
    var numGens = 10;
    var natSel = [[10, 30, 90], [40, 60, 40]]; // in percent
    var gens = [[], []];
    var ind = 5000000;
    var d = [random(0, ind * 2), random(0, ind * 2)];
    var r = [ind * 2 - d[0], ind * 2 - d[1]];
    var al = [[d[0], r[0]], [d[1], r[1]]];
    var gfp = 10; // gene flow percentage
    for (var i = 0; i < numGens; i++) {
        al[0] = reproduce(al[0], ind, natSel, gens, i, 0);
        al[1] = reproduce(al[1], ind, natSel, gens, i, 1);
        // gene flow
        // save d1, d2, r1, r2
        var d1 = al[0][0];
        var d2 = al[1][0];
        var r1 = al[0][1];
        var r2 = al[1][1];
        // take some out of d1, d2, r1, r2 (gfp)
        var gfd1 = Math.floor(d1 * gfp / 100);
        var gfd2 = Math.floor(d2 * gfp / 100);
        var gfr1 = Math.floor(r1 * gfp / 100);
        var gfr2 = Math.floor(r2 * gfp / 100);
        // pool d1, d2, r1, r2
        var gfd = gfd1 + gfd2;
        var gfr = gfr1 + gfr2;
        // distribute back to d1, d2, r1, r2
        d1 += gfd/2;
        d2 += gfd/2;
        r1 += gfr/2;
        r2 += gfr/2;
        // save d1, d2, r1, r2
        al[0][0] = d1;
        al[1][0] = d2;
        al[0][1] = r1;
        al[1][1] = r2;
        console.log("Gene flow: " + gfd + " dominant, " + gfd / 2 + " each; " + gfr + " recessive, " + gfr / 2 + " each");
    }
}

function reproduce(al, ind, natSel, gens, i, gp) {
    var d = al[0];
    var r = al[1];
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
    gens[gp][i] = [[hd, he, hr], d / (d + r), r / (d + r)];
    console.log(gp + " " + i + ":\t" + gens[gp][i][0][0] + "\t" + gens[gp][i][0][1] + "\t" + gens[gp][i][0][2] + "\t" + gens[gp][i][1] + "\t" + gens[gp][i][2]);
    // kill some off in a specific ratio, determined by natSel
    var hd = Math.round(gens[gp][i][0][0] * (1 - natSel[gp][0] / 100));
    var he = Math.round(gens[gp][i][0][1] * (1 - natSel[gp][1] / 100));
    var hr = Math.round(gens[gp][i][0][2] * (1 - natSel[gp][2] / 100));
    d = 2 * hd + he;
    r = 2 * hr + he;
    // normalize d and r to ind
    d = Math.round(ind * d / (d + r));
    r = ind - d;
    return [d, r];
}

run();