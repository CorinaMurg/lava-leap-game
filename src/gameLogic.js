import { Level, State } from './classes.js';
import { DOMDisplay } from './dom.js';
import { parseQuery, arrowKeys } from './utils.js';
import { GAME_LEVELS } from './levels.js';
import { dom } from './domElements.js';

function restartGame() {
    initializeGame();
    runGame(GAME_LEVELS, DOMDisplay);
}

let userLives;
let lives;

function initializeGame() {
    userLives = parseQuery(window.location.search);
    lives = Number(userLives.lives) || 3; 
    dom.endMessage.style.display = 'none'; 
    dom.restartButton.style.display = 'none'; 
    dom.title.style.display = 'block';
    dom.livesContainer.style.display = "block";
    dom.levelContainer.style.display = "block";
    dom.coinsCollectedContainer.style.display = "block";
    dom.coinsRemainingContainer.style.display = "block";
}

async function runGame(plans, Display) {
    initializeGame();
    const updateLivesDisplay = () => {
        dom.livesContainer.textContent = `Lives: ${lives}`;
    };

    const updateLevelDisplay = (level) => {
        dom.levelContainer.textContent = `Level: ${level + 1} of ${plans.length}`;
    };

    updateLivesDisplay();
    updateLevelDisplay(0);  

    for (let level = 0; level < plans.length && lives > 0;) {
        let currentLevel = new Level(plans[level]);
        // initialize the game state for the newly created level; each level starts with a clean slate, with initial 
        // settings (actor positions, coins,) reset to their starting conditions as defined by the level design. 
        // crucial for games where each level's outcome does not depend on the previous levels
        let state = State.start(currentLevel);
        initializeCoinDisplays(currentLevel); 

        updateLevelDisplay(level);
        let status = await runLevel(currentLevel, Display);

        if (status === "lost") {
            lives--;
            updateLivesDisplay();
        } else if (status === "won") {
            level++;
        }
    }

    dom.endMessage.style.display = 'block';
    dom.restartButton.style.display = 'block';
    dom.title.style.display = 'none';
    dom.livesContainer.style.display = "none";
    dom.levelContainer.style.display = "none";
    dom.coinsCollectedContainer.style.display = "none";
    dom.coinsRemainingContainer.style.display = "none";

    if (lives === 0) {
        dom.endMessage.textContent = "Sorry, you lost all your lives!";
    } else {
        dom.endMessage.textContent = "Congratulations! You won!";
    }

    dom.restartButton.focus();
}
function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
      runAnimation(time => {
        state = state.update(time, arrowKeys);

        // Update collected coins display
        updateCoinsCollectedDisplay(state.collectedCoins);  
        // Update remaining coins display
        updateCoinsRemainingDisplay(level.remainingCoins);  

        display.syncState(state);
        if (state.status === "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          resolve(state.status);
          return false;
        }
      });
    });
}

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
      if (lastTime != null) {
        let timeStep = Math.min(time - lastTime, 100) / 1000;
        if (frameFunc(timeStep) === false) return;
      }
      lastTime = time;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function updateCoinsCollectedDisplay(collectedCoins) {
    dom.coinsCollectedContainer.textContent = `Coins Collected: ${collectedCoins}`;
}

function updateCoinsRemainingDisplay(remainingCoins) {
    dom.coinsRemainingContainer.textContent = `Coins Remaining: ${remainingCoins}`;
}

function initializeCoinDisplays(level) {
    updateCoinsCollectedDisplay(0);  
    updateCoinsRemainingDisplay(level.remainingCoins); 
}

export { runAnimation, runLevel, runGame, restartGame };

