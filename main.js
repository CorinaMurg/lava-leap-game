
// import { GAME_LEVELS } from './src/levels.js';
// import { DOMDisplay } from './src/domClass.js';
// import { runGame } from './src/gameLogic.js';
import { welcome } from './src/gameLogic.js';
import { startGame } from './src/gameLogic.js';
import { restartGame } from './src/gameLogic.js';
import { dom } from './src/domElements.js';

welcome();

dom.startButton.addEventListener('click', startGame);

dom.restartButton.addEventListener('click', restartGame);
