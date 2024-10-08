import { Level, State } from './classes.js';
import { DOMDisplay } from './displayClass.js';
import { arrowKeys } from './utils/arrowKeys.js';
import { parseURLQuery } from './utils/parseURLQuery.js';
import { GAME_LEVELS } from './levels.js';
import { dom } from './domElements.js';
import { displayWelcome } from './displayFunctions/displayWelcome.js';
import { displayStartLoading } from './displayFunctions/displayStartLoading.js';
import { displayRestartLoading } from './displayFunctions/displayRestartLoading.js';
import { displayStatsContainer } from './displayFunctions/displayStatsContainer.js';
import { displayEndContainer, lossEndMessages, winEndMessages } from './displayFunctions/displayEndContainer.js';
import { launchConfetti } from './utils/launchConfetti.js';

let userLives;
let lives;

function welcome() {
    userLives = parseURLQuery(window.location.search);
    lives = Number(userLives.lives) || 3; 

    const updateLivesDisplay = () => {
        dom.welcomeLivesNumber.textContent = `${lives}`;
    };

    updateLivesDisplay();

    displayWelcome();
}

function startGame() {  
    displayStartLoading();
    setTimeout(() => {
        initializeGame();
        runGame(GAME_LEVELS, DOMDisplay);
        dom.startButton.textContent = "Start Game";  
        dom.startButton.disabled = false;
    }, 2000);  
}

function restartGame() {
    displayRestartLoading();
    setTimeout(() => {
        initializeGame();
        runGame(GAME_LEVELS, DOMDisplay);
        dom.restartButton.textContent = "Restart Game";  
        dom.restartButton.disabled = false;
    }, 3000);  
}


function initializeGame() {
    userLives = parseURLQuery(window.location.search);
    lives = Number(userLives.lives) || 3; 

    displayStatsContainer();
}

async function runGame(plans, Display) {
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

        // coinsRemaining is updated from level; coinsCollected is initialized at 0;
        initializeCoinDisplays(currentLevel); 

        updateLevelDisplay(level);

        // runLevel returns a promise
        // coins remaining/collected will be updated here
        let status = await runLevel(currentLevel, Display);

        if (status === "lost") {
            lives--;
            updateLivesDisplay();
        } else if (status === "won") {
            level++;
        }
    }

    displayEndContainer();

    if (lives === 0) {
        lossEndMessages();
        
    } else {
        winEndMessages();
    }
}

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);

    arrowKeys.enable();

    let ending = 1;
    return new Promise(resolve => {
      runAnimation(time => {
        state = state.update(time, arrowKeys.keys);

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
            arrowKeys.disable();
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

