import { Level, State } from './core.js';
import { DOMDisplay } from './dom.js';
import { parseQuery, arrowKeys } from './utils.js';
import { GAME_LEVELS } from './levels.js';
import { dom } from './domElements.js';

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

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
      runAnimation(time => {
        state = state.update(time, arrowKeys);
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

let userLives;
let lives;

function initializeGame() {
    userLives = parseQuery(window.location.search);
    lives = Number(userLives.lives) || 3; // 3 as the default number of lives
    dom.endMessage.style.display = 'none'; 
    dom.restartButton.style.display = 'none'; 
    dom.title.style.display = 'block';
}

async function runGame(plans, Display) {
    initializeGame();
    const updateLivesDisplay = () => {
        dom.livesContainer.textContent = `Lives: ${lives}`;
    };

    updateLivesDisplay(); 

    for (let level = 0; level < plans.length && lives > 0;) {
        let status = await runLevel(new Level(plans[level]), Display);

        if (status === "lost") {
        lives--;
        updateLivesDisplay();
        }
        if (status === "won") level++;
    }

    dom.endMessage.style.display = 'block';
    dom.restartButton.style.display = 'block';
    dom.title.style.display = 'none';

    if (lives === 0) {
        dom.endMessage.textContent = "Sorry, you lost all your lives!";
    } else {
        dom.endMessage.textContent = "Congratulations! You won!";
    }

    dom.restartButton.focus();
}


function restartGame() {
    initializeGame();
    runGame(GAME_LEVELS, DOMDisplay);
}

export { runAnimation, runLevel, runGame, restartGame };

