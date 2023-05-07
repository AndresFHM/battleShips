const readlineSync = require('readline-sync');


function battleShips() {
    readlineSync.question('Press ENTER to start the game', { hideEchoBack: true });
    
    const locationSlots = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    const randomLocations = [];

    while (randomLocations.length < 2) {
        const randomIndex = Math.floor(Math.random() * locationSlots.length)
        const randomLocation = locationSlots[randomIndex];
    
        if (!randomLocations.includes(randomLocation)) {
            randomLocations.push(randomLocation)
        }
    }
    
    const [compShip1, compShip2] = randomLocations;
    const enemyShips = [compShip1, compShip2]
    
    var enemyShipsSunk = []
    var playerScore = 0;
    const triedLocations = new Set();

        while (enemyShipsSunk.length < enemyShips.length) {
            const enemyShip = readlineSync.question('Enter a location to strike (a-c and 1-3)) ie "a2"       ')
            
            if (triedLocations.has(enemyShip)) {
                console.log('You have picked this location already. Miss!')
            } else {
                triedLocations.add(enemyShip);
                if (enemyShips.includes(enemyShip) && !enemyShipsSunk.includes(enemyShip)) {
                    console.log('Hit. You have sunk a battleship. ' + (enemyShips.length - enemyShipsSunk.length - 1) + ' ship remaining');
                    enemyShipsSunk.push(enemyShip);
                    playerScore++;
                } else {
                    console.log('You have missed!!')
                }
            }


            if (enemyShipsSunk.length === enemyShips.length) {
                let playAgain = readlineSync.question('You have destroyed  all battleships. Would you like to play again? Y/N    ')
                if (playAgain === 'y') {
                    battleShips();
                } else {
                    console.log('good day, sir/madam')
                }
            }

        }
    
}

battleShips()


 
