function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function run() {
    var numGens = 1;
    var gen = new Array();
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
        console.log("Generation " + (i + 1) + ":");
        console.log("Total Individuals: " + ind);
        console.log("Genepool: " + d + " d, " + r + " r");
        console.log(" ");
        console.log("THEORETICAL");
        console.log("Population distribution: " + Math.round(thd) + " hd, " + Math.round(the) + " he, " + Math.round(thr) + " hr");
        console.log("Population distribution (percent): " + (thd / ind * 100).toFixed(2) + "% hd, " + (the / ind * 100).toFixed(2) + "% he, " + (thr / ind * 100).toFixed(2) + "% hr");
        console.log(" ");
        // experimental
        var dNew = d;
        var rNew = r;
        var hd = 0, he = 0, hr = 0;
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
        console.log("PRACTICAL");
        console.log("Population distribution: " + Math.round(hd) + " hd, " + Math.round(he) + " he, " + Math.round(hr) + " hr");
        console.log("Population distribution (percent): " + (hd / ind * 100).toFixed(2) + "% hd, " + (he / ind * 100).toFixed(2) + "% he, " + (hr / ind * 100).toFixed(2) + "% hr");
        console.log(" ");
        console.log("Absolute error: " + Math.round(Math.abs(hd - thd)) + " hd, " + Math.round(Math.abs(he - the)) + " he, " + Math.round(Math.abs(hr - thr)) + " hr");
        gens[i] = [[hd * ind, he * ind, hr * ind], hd + he + hr, p + q]; // [ind arr, tot ind (fixed), p + q (fixed)]
    }
}

run();