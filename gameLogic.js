import { Level, State } from './core.js';
import { DOMDisplay } from './dom.js';
import { parseQuery } from './utils.js';
import { arrowKeys } from './utils.js';
import { GAME_LEVELS } from './levels.js';

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

var userLives = parseQuery(window.location.search);
var lives = Number(userLives.lives) || 3; // 3 as the default number of lives

let endMessage = document.getElementById('end-message');
let restartButton = document.getElementById('restart-button');
let title = document.getElementById('title-container');

async function runGame(plans, Display) {
    let livesContainer = document.getElementById('lives-container');

    const updateLivesDisplay = () => {
        livesContainer.textContent = `Lives: ${lives}`;
    };

    updateLivesDisplay(); 

    for (let level = 0; level < plans.length && lives > 0;) {
        let status = await runLevel(new Level(plans[level]), Display);

        if (status == "lost") {
        lives--;
        updateLivesDisplay();
        }
        if (status == "won") level++;
    }

    endMessage.style.display = 'block';
    restartButton.style.display = 'block';
    title.style.display = 'none';

    if (lives === 0) {
        endMessage.textContent = "Sorry, you lost all your lives!";
    } else {
        endMessage.textContent = "Congratulations! You won!";
    }

    restartButton.focus();
}

function restartGame() {
    endMessage.style.display = 'none'; 
    restartButton.style.display = 'none'; 
    title.style.display = 'block';
    runGame(GAME_LEVELS, DOMDisplay);
}

restartButton.addEventListener('click', restartGame);

export { runAnimation, runLevel, runGame, restartGame };

