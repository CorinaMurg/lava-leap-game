import { dom } from './domElements.js';
import { updateURLWithLives } from './utils/updateURLWithLives.js';

function openModal() {
    dom.livesButton.addEventListener('click', function(event) {
        event.stopPropagation();
        dom.modalOverlay.style.display = 'flex';
        dom.modal.style.display = 'flex';
        dom.modal.focus();
    });
      
    dom.closeModal.addEventListener('click', function() {
        dom.modalOverlay.style.display = 'none';
        dom.modal.style.display = 'none';
        dom.livesButton.focus();
    });
    
    dom.submitLives.addEventListener('click', function(event) {
        event.preventDefault(); 
        const lives = dom.livesInput.value;
        dom.welcomeLivesNumber.textContent = lives;
        dom.livesContainer.textContent = lives; 

        updateURLWithLives(lives);

        dom.modalOverlay.style.display = 'none';
        dom.modal.style.display = 'none';
        dom.livesInput.value = '';
    });
    
    
    window.onclick = function(event) {
        const modal = dom.modalOverlay;
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };    
}

export { openModal };

  