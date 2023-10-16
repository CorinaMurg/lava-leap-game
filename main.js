
import { GAME_LEVELS } from './levels.js';
import { DOMDisplay } from './dom.js';
import { runGame } from './gameLogic.js';

runGame(GAME_LEVELS, DOMDisplay);

restartButton.addEventListener('click', restartGame);
