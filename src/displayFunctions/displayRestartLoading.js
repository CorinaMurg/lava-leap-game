import { dom } from '../domElements.js';

function displayRestartLoading() {
    dom.restartButton.textContent = "Loading...";
    dom.restartButton.disabled = true;
    document.body.tabIndex = 0;  
    document.body.focus(); 
}

export { displayRestartLoading };