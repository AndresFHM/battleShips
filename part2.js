const readlineSync = require('readline-sync');
var cells;

function battleShips() {
    function setGrid(size) {
        const letters = 'abcdefghij'
        const grid = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const cell = `${letters[i]}${j + 1}`;
                row.push(cell);
            }
            grid.push(row);
        }
        return grid;
    }

    function settingShips(grid) {
        var ships = [
            { name: 'fastBoat', size: 2, cells: [], hits: [] },
            { name: 'submarine', size: 3, cells: [], hits: [] },
            { name: 'submarine', size: 3, cells: [], hits: [] },
            { name: 'destroyer', size: 4, cells: [], hits: [] },
            { name: 'carrier', size: 5, cells: [], hits: [] },
        ];

        const directions = ['up', 'down', 'left', 'right'];

        for (const ship of ships) {
            let isPlaced = false;

            while (!isPlaced) {
                const startRow = Math.floor(Math.random() * grid.length);
                const startCol = Math.floor(Math.random() * grid[0].length);
                const direction = directions[Math.floor(Math.random() * directions.length)];
            
                let endRow = startRow;
                let endCol = startCol;
                for (let i = 1; i < ship.size; i++) {
                    if (direction === 'up') {
                        endRow--;
                    } else if (direction === 'down') {
                        endRow++;
                    } else if (direction === 'left') {
                        endCol--;
                    } else {
                        endCol++;
                    }
                    if (endRow < 0 ||
                        endRow >= grid.length ||
                        endCol < 0 ||
                        endCol >= grid[0].length) {
                        break;
                    }
                    const cell = grid[endRow][endCol];

                    if (ships.some(e => e.cells.includes(cell) || e !== ship)) {
                        break
                    }
                }
                if (endRow >= 0 && endRow < grid.length && endCol >= 0 && endCol < grid[0].length) {
                    cells = [];
                
                    for (let i = 0; i < ship.size; i++) {
                        if (direction === 'up') {
                            cells.push(grid[startRow - i][startCol]);
                        } else if (direction === 'down') {
                            cells.push(grid[startRow + i][startCol]);
                        } else if (direction === 'left') {
                            cells.push(grid[startRow][startCol - i]);
                        } else {
                            cells.push(grid[startRow][startCol + i]);
                        }
                    }
                    ship.cells = cells;
                    isPlaced = true;
                }
            }

            for (const cell of ship.cells) {
                const [row, col] = cell.split('');
                grid[row.charCodeAt(0) - 97][Number(col) - 1] = cell;
            }
        }

        return ships;
    }

    function playGame() {
        console.log('Minimum possible amount of turns: 17')
        const grid = setGrid(10);
        const ships = settingShips(grid);
        let hits = 0;
        let playerScore = 0;
        let previousShots = [];
        let isGameOver = false;
        
        console.log(ships)
        
        function getTotalCells(ships) {
            let totalCells = 0;
            for (const ship of ships) {
                totalCells += ship.size;
            }
            return totalCells;
        }
       
        getTotalCells(ships)
        
        while (hits < getTotalCells(ships) && !isGameOver) {

            let shootingPosition = readlineSync.question('Enter a location to shoot (a-j)(1-10), "eg. j10"   ');
            while (!/^[a-j]\d{1,2}$/.test(shootingPosition)) {
                console.log('Please enter a valid location');
                shootingPosition = readlineSync.question('Enter a location to shoot (a-j)(1-10), "eg. j10"   ');
            }
            
            const [row, col] = shootingPosition.split('');
            
            if (row.charCodeAt(0) - 97 < 0 ||
                row.charCodeAt(0) - 97 >= grid.length ||
                Number(col) - 1 < 0 || Number(col) - 1 >= grid[0].length) {
                console.log('Please enter a valid location');
                continue;
            }
   
            if (previousShots.includes(shootingPosition)) {
                console.log('you have tried that already. You missed');
                continue;
            }
            previousShots.push(shootingPosition);
    

            const cell = grid[row.charCodeAt(0) - 97][Number(col) - 1];
    
            let isHit = false;
    
            for (const ship of ships) {
                if (ship.cells.includes(cell)) {
                    ship.hits.push(cell);
                    isHit = true;
                    console.log('Hit!');
                    playerScore++;
                    hits++;
                    break;
                }
            }
    
            if (!isHit) {
                console.log('Miss!');
            }
        }    
        let playAgain = readlineSync.question(`
            You sunk all the enemy ships! Your score is ${playerScore}. 
            The closer to 17 the better. Would you like to play again? (n/y)  `);

        if (playAgain === 'y') {
            battleShips()
        } else if (playAgain === 'n') {
            console.log('Have a good day sir/madam')
        } else {
            console.log('Please enter a y or n')
        }
    }
    
    playGame()
}

battleShips()






