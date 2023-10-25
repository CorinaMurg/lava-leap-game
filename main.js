
import { GAME_LEVELS } from './src/levels.js';
import { DOMDisplay } from './src/dom.js';
import { runGame } from './src/gameLogic.js';
import { restartGame } from './src/gameLogic.js';
import { dom } from './src/domElements.js';

runGame(GAME_LEVELS, DOMDisplay);

dom.restartButton.addEventListener('click', restartGame);
