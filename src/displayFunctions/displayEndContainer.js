import { dom } from '../domElements.js';
import { launchConfetti } from '../utils/launchConfetti.js';

function displayEndContainer() {
    dom.gameStartContainer.style.display = 'none';
    dom.gameEndContainer.style.display = 'block';
    dom.endMessageOne.style.display = 'block';
    dom.endMessageTwo.style.display = 'block';
    dom.restartButton.style.display = 'block';
    dom.gameStatsContainer.style.display = "none";
}

function lossEndMessages() {
    dom.endMessageOne.textContent = "Sorry ☹️,";
    dom.endMessageTwo.textContent = "you lost all your lives.";
}

function winEndMessages() {
    dom.endMessageOne.textContent = "Congratulations! 🚀";
    dom.endMessageTwo.textContent = "You won!";
    launchConfetti();
}

export { displayEndContainer, lossEndMessages, winEndMessages };