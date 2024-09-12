import { Level, State } from './classes.js';
import { DOMDisplay } from './dom.js';
import { parseQuery, arrowKeys } from './utils.js';
import { GAME_LEVELS } from './levels.js';
import { dom } from './domElements.js';
import { launchConfetti } from './utils/launchConfetti.js';

let userLives;
let lives;

function welcome() {
    userLives = parseQuery(window.location.search);
    lives = Number(userLives.lives) || 3; 

    const updateLivesDisplay = () => {
        dom.welcomeLivesNumber.textContent = `${lives}`;
    };

    updateLivesDisplay();

    dom.gameStartContainer.style.display = 'block';
    dom.startButton.style.display = 'block';
    dom.gameEndContainer.style.display = 'none';
    dom.gameStatsContainer.style.display = "none";  
}

function startGame() {
    initializeGame();
    runGame(GAME_LEVELS, DOMDisplay);
}

function restartGame() {
    dom.restartButton.textContent = "Loading...";
    dom.restartButton.disabled = true;
    dom.endMessageOne.style.display = 'none';
    dom.endMessageTwo.style.display = 'none';
    document.body.tabIndex = 0;  
    document.body.focus(); 

    setTimeout(() => {
        initializeGame();
        runGame(GAME_LEVELS, DOMDisplay);
        dom.restartButton.textContent = "Restart Game";  
        dom.restartButton.disabled = false;
    }, 3000);  
}


function initializeGame() {
    userLives = parseQuery(window.location.search);
    lives = Number(userLives.lives) || 3; 

    dom.gameStartContainer.style.display = 'none';
    dom.gameEndContainer.style.display = 'none';
    dom.gameStatsContainer.style.display = "block";  
}

async function runGame(plans, Display) {
    initializeGame();
    const updateLivesDisplay = () => {
        dom.livesContainer.textContent = `${lives}`;
    };

    const updateLevelDisplay = (level) => {
        dom.levelNumber.textContent = `${level + 1}`;
        // dom.totalLevels.textContent = `${plans.length}`;
    };

    updateLivesDisplay();
    updateLevelDisplay(0);  

    for (let level = 0; level < plans.length && lives > 0;) {
        let currentLevel = new Level(plans[level]);
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

    dom.gameStartContainer.style.display = 'none';
    dom.gameEndContainer.style.display = 'block';
    dom.endMessageOne.style.display = 'block';
    dom.endMessageTwo.style.display = 'block';
    dom.restartButton.style.display = 'block';
    dom.gameStatsContainer.style.display = "none";

    if (lives === 0) {
        dom.endMessageOne.textContent = "Sorry ☹️,";
        dom.endMessageTwo.textContent = "you lost all your lives.";
    } else {
        dom.endMessageOne.textContent = "Congratulations! 🚀";
        dom.endMessageTwo.textContent = "You won!";
        launchConfetti();
    }
}

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    // initialize the game state for the newly created level; each level starts with a clean slate, with initial 
    // settings (actor positions, coins,) reset to their starting conditions as defined by the level design. 
    // crucial for games where each level's outcome does not depend on the previous levels
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
      runAnimation(time => {
        state = state.update(time, arrowKeys);

        updateCoinsCollectedDisplay(state.collectedCoins);  
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
    dom.coinsCollectedContainer.textContent = `${collectedCoins}`;
}

function updateCoinsRemainingDisplay(remainingCoins) {
    dom.coinsRemainingContainer.textContent = `${remainingCoins}`;
}

function initializeCoinDisplays(level) {
    updateCoinsCollectedDisplay(0);  
    updateCoinsRemainingDisplay(level.remainingCoins); 
}

export { runAnimation, runLevel, runGame, startGame, restartGame, welcome, launchConfetti };

