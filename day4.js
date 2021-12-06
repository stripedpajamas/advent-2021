const fs = require('fs');
const input = parseInput(fs.readFileSync('./inputs/day4.txt', 'utf8').split('\n'));

function parseInput (input) {
    const numbers = input[0].split(',').map(Number);
    const boards = [];
    for (let i = 2; i < input.length; i++) {
        if (input[i] === '') {
            const board = input
                .slice(i + 1, i + 6)
                .map(row => row.split(/\s+/)
                    .filter(Boolean)
                    .map(Number));

            boards.push(board);
        }
    }

    return { numbers, boards };
}

function checkWin (board) {
    if (board.some(row => row.every(cell => cell === -1))) {
        return true;
    }

    for (let c = 0; c < board[0].length; c++) {
        let win = 0;
        for (let r = 0; r < board.length; r++) {
            if (board[r][c] !== -1) {
                break;
            } else {
                win++;
            }
        }
        if (win === board.length) {
            return true;
        }
    }
}

function day4part1 () {
    const { numbers, boards } = input;
    
    for (const n of numbers) {
        for (let i = 0; i < boards.length; i++) {
            boards[i] = boards[i].map(row => row.map(cell => cell === n ? -1 : cell));
            const win = checkWin(boards[i]);
            if (win) {
                const unmarked = boards[i]
                    .map(row => row.filter(cell => cell >= 0))
                    .reduce((sum, row) => sum + row.reduce((sum, cell) => sum + cell, 0), 0);
                return n * unmarked;
            }
        }
    }
}

function day4part2 () {
    const { numbers, boards } = input;

    let boardsWon = new Set();
    for (const n of numbers) {
        for (let i = 0; i < boards.length; i++) {
            if (boardsWon.has(i)) continue;

            boards[i] = boards[i].map(row => row.map(cell => cell === n ? -1 : cell));
            const win = checkWin(boards[i]);
            
            if (win && boardsWon.size === boards.length - 1) {
                const unmarked = boards[i]
                    .map(row => row.filter(cell => cell >= 0))
                    .reduce((sum, row) => sum + row.reduce((sum, cell) => sum + cell, 0), 0);
                return n * unmarked;
            } else if (win) {
                boardsWon.add(i);
            }
        }
    }

}

console.log(day4part1());
console.log(day4part2());