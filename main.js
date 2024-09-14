import { welcome, startGame, restartGame } from './src/gameLogic.js';
import { dom } from './src/domElements.js';
import { Modal } from './src/modal.js'; 
import { useDefaultLivesInURL } from './src/utils/useDefaultLivesInURL.js';

welcome(); 

document.addEventListener('DOMContentLoaded', function() {
    useDefaultLivesInURL();
    new Modal(dom);

    dom.startButton.addEventListener('click', startGame);
    dom.restartButton.addEventListener('click', restartGame);
});


