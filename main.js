
import { GAME_LEVELS } from './levels.js';
import { DOMDisplay } from './dom.js';
import { runGame } from './gameLogic.js';
import { restartGame } from './gameLogic.js';
import { dom } from './domElements.js';

runGame(GAME_LEVELS, DOMDisplay);

dom.restartButton.addEventListener('click', restartGame);
