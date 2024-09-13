import { welcome } from './src/gameLogic.js';
import { startGame } from './src/gameLogic.js';
import { restartGame } from './src/gameLogic.js';
import { dom } from './src/domElements.js';
import { openModal } from './src/modal.js';

welcome();

document.addEventListener('DOMContentLoaded', function() {
    openModal();  
});

dom.startButton.addEventListener('click', startGame);

dom.restartButton.addEventListener('click', restartGame);
