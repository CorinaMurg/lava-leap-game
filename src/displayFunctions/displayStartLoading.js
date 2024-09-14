import { dom } from '../domElements.js';

function displayStartLoading() {
    dom.startButton.textContent = "Loading...";
    dom.startButton.disabled = true;
    document.body.tabIndex = 0;  
    document.body.focus(); 
}

export { displayStartLoading };