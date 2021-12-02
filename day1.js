const fs = require('fs');
const input = fs.readFileSync('./inputs/day1.txt', 'utf8').split('\n').map(Number);

function day1Part1 () {
    let increases = 0;
    let prev = null;

    for (const num of input) {
        if (prev === null) {
            prev = num;
            continue;
        }

        if (num > prev) {
            increases++;
        }

        prev = num;
    }

    return increases;
}

function day1Part2 () {
    let increases = 0;
    let prev = null;

    for (let i = 0; i <= input.length - 3; i++) {
        const a = input[i];
        const b = input[i + 1];
        const c = input[i + 2];

        if (prev === null) {
            prev = a + b + c;
            continue;
        }

        if (a + b + c > prev) {
            increases++;
        }

        prev = a + b + c;
    }

    return increases;
}

console.log(day1Part1());
console.log(day1Part2());