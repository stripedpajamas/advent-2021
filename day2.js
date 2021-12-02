const fs = require('fs');
const input = fs.readFileSync('./inputs/day2.txt', 'utf8').split('\n');

function day2Part1 () {
    const { position, depth } = input.reduce(({ position, depth }, step) => {
        const [command, value] = step.split(' ');
        switch (command) {
            case 'forward':
                return { position: position + Number(value), depth };
            case 'down':
                return { position, depth: depth + Number(value) };
            case 'up':
                return { position, depth: depth - Number(value) };
        }
    }, { position: 0, depth: 0 });

    return position * depth;
}

function day2Part2 () {
    const { position, depth, aim } = input.reduce(({ position, depth, aim }, step) => {
        const [command, value] = step.split(' ');
        switch (command) {
            case 'forward':
                return {
                    aim,
                    position: position + Number(value),
                    depth: depth + (aim * Number(value))
                };
            case 'down':
                return { position, depth, aim: aim + Number(value) };
            case 'up':
                return { position, depth, aim: aim - Number(value) };
        }
    }, { position: 0, depth: 0, aim: 0 });

    return position * depth;
}

console.log(day2Part1());
console.log(day2Part2());