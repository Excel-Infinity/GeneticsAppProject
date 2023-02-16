'use strict';

function allValid() {
    var args = arguments;
    for (var i = 0; i < args.length; i++) {
        if (args[i] < args[i].min || args[i] > args[i].max) {
            return false;
        }
    }
    return true;
}

const switcher = document.querySelector('.theme-button');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('light-theme')) {
        switcher.textContent = 'Dark Theme';
    } else {
        switcher.textContent = 'Light Theme';
    }
    console.log('Theme switched');
});

const submit = document.getElementById('submit-button');
const ind = document.querySelector('#ind');
const gens = document.querySelector('#gens');
const p = document.querySelector('#p');
const q = document.querySelector('#q');
// natsel (survival percentage)
const hd = document.querySelector('#hd');
const he = document.querySelector('#he');
const hr = document.querySelector('#hr');

submit.addEventListener('click', function() {
    console.log('Submit button clicked');
    console.log('ind: ' + ind.value);
    console.log('gens: ' + gens.value);
    console.log('p: ' + p.value);
    console.log('q: ' + q.value);
    console.log('hd: ' + hd.value);
    console.log('he: ' + he.value);
    console.log('hr: ' + hr.value);
    console.log('any out of bounds: ' + !allValid(ind, gens, p, q, hd, he, hr));
});
