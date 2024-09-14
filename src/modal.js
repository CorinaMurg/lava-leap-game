import { dom } from './domElements.js';
import { updateURLWithLives } from './utils/updateURLWithLives.js';

function openModal() {
    dom.livesButton.addEventListener('click', function() {
        dom.modalOverlay.style.display = 'flex';
        dom.modal.style.display = 'flex';
        dom.modal.focus();
    });
      
    dom.modalClose.addEventListener('click', function() {
        dom.modalOverlay.style.display = 'none';
        dom.modal.style.display = 'none';
        dom.errorMessage.style.visibility = 'hidden';
        dom.errorMessage.style.opacity = '0';
        dom.modalInput.value = '';
        dom.livesButton.focus();
    });
    
    dom.modalSubmit.addEventListener('click', function(event) {
        event.preventDefault(); 
        const input = dom.modalInput.value.trim();
        const lives = parseInt(input, 10);

        if (input === '' || isNaN(lives) || lives < 1 || lives > 10) {
            dom.errorMessage.style.visibility = 'visible';
            dom.errorMessage.style.opacity = '1'; 
            dom.modalOverlay.style.display = 'flex';
            dom.modal.style.display = 'flex';
        } else {
            dom.welcomeLivesNumber.textContent = lives;
            dom.livesContainer.textContent = lives; 

            updateURLWithLives(lives);

            dom.modalOverlay.style.display = 'none';
            dom.modal.style.display = 'none';
            dom.modalInput.value = '';
            dom.errorMessage.style.visibility = 'hidden';
            dom.errorMessage.style.opacity = '0';
        }
    });
    
    window.onclick = function(event) {
        const modal = dom.modalOverlay;
        if (event.target === modal) {
            modal.style.display = 'none';
            dom.modal.style.display = 'none';
            dom.errorMessage.style.visibility = 'hidden';
            dom.errorMessage.style.opacity = '0';
            dom.modalInput.value = '';
        }
    };   
}

export { openModal };

  