const fs = require('fs');
const input = fs.readFileSync('./inputs/day3.txt', 'utf8').split('\n');

function countBits (input) {
    const ones = [];
    const zeroes = [];

    for (const line of input) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') ones[i] = (ones[i] || 0) + 1;
            else zeroes[i] = (zeroes[i] || 0) + 1;
        }
    }

    return { ones, zeroes };
}

function day3Part1 () {
    const { ones, zeroes } = countBits(input);

    const gamma = [];
    const epsilon = [];
    for (let i = 0; i < ones.length; i++) {
        if (ones[i] > zeroes[i]) {
            gamma.push('1');
            epsilon.push('0');
        } else {
            gamma.push('0');
            epsilon.push('1');
        }
    }

    return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

function day3Part2 () {
    const len = input[0].length;
    let ogr = input.slice();
    let csr = input.slice();

    for (let i = 0; i < len; i++) {
        const { ones, zeroes } = countBits(ogr);
        if (ones[i] >= zeroes[i]) {
            ogr = ogr.filter(line => line[i] === '1');
        } else {
            ogr = ogr.filter(line => line[i] === '0');
        }
        if (ogr.length === 1) break;
    }

    for (let i = 0; i < len; i++) {
        const { ones, zeroes } = countBits(csr);
        if (ones[i] >= zeroes[i]) {
            csr = csr.filter(line => line[i] === '0');
        } else {
            csr = csr.filter(line => line[i] === '1');
        }
        if (csr.length === 1) break;
    }

    return parseInt(ogr.pop(), 2) * parseInt(csr.pop(), 2);
}

console.log(day3Part1());
console.log(day3Part2());