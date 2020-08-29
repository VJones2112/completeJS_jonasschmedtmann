/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


// Create Fundamental Variables
var scores, roundScore, activePlayer, gamePlaying; // Don't need to define here, just declare so they're global

// var previousRoll; // Only need for 6, 6 challenge

init(); // so the function will be run at start


// Roll Dice and Get Score
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        var diceDOM2 = document.querySelector('.dice2')
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        /* Below was one of the challenges but I don't want to keep it. If you roll a 6 twice in a row, lose all points.
        if ((previousRoll === 6 && dice === 6) || (previousRoll === 6 && dice2 === 6) ) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            setTimeout(nextPlayer, 1000);
        } */
        if (dice !== 1 && dice2 !== 1) {
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            setTimeout(nextPlayer, 1000);
        }
        // previousRoll = dice; // Only need for 6, 6 challenge
    }
});


// Hold dice, add to round score, determine if there's a winner
document.querySelector('.btn-hold').addEventListener('click', function() { // Anonymous functions like this one can't be reused
    if (gamePlaying) {
        // Add current score to player's global score
        scores[activePlayer] += roundScore;
        // Update UI to show the global score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Allow user to input a winning score
        var userInput = document.getElementById('winningScore').value;
        var winningScore = document.getElementById('getWinningScore');
        if (userInput) {
            winningScore.textContent = `Get ${userInput} points to win!`;
        } else {
            userInput = 100;
            winningScore.textContent = `Get 100 points to win!`;
        }
        // Check if player won the game
        if (scores[activePlayer] >= userInput) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; 
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
}); 

// Remove points, toggle active class
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

// New Game Button
document.querySelector('.btn-new').addEventListener('click', init)
// New Game Function
function init() {
    gamePlaying = true;
    scores = [0, 0]; // made an array to simplify vs two variables score1 and score2
    roundScore = 0;
    activePlayer = 0; // since array is 0-based, set this to 0
    // The document. items below moved into the init function because they also happen at start
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2'; 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); // Remove first so no duplication/overlap before adding again
}

