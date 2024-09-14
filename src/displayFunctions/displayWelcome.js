import { dom } from '../domElements.js';

function displayWelcome() {
    dom.gameStartContainer.style.display = 'flex';
    dom.startButton.style.display = 'block';
    dom.gameEndContainer.style.display = 'none';
    dom.gameStatsContainer.style.display = "none";  
}

export { displayWelcome };