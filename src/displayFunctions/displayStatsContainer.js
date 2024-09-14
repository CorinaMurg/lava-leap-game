import { dom } from '../domElements.js';

function displayStatsContainer() {
    dom.gameStartContainer.style.display = 'none';
    dom.gameEndContainer.style.display = 'none';
    dom.gameStatsContainer.style.display = "block";
}

export { displayStatsContainer };