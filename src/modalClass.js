import { updateURLWithLives } from './utils/updateURLWithLives.js';

class Modal {
    constructor(dom) {
        this.dom = dom;
        this.trapFocus = this.trapFocus.bind(this);
        this.setupEventListeners();
        
    }

    open() {
        this.dom.modalOverlay.style.display = 'flex';
        this.dom.modal.style.display = 'flex';
        this.dom.modal.focus();
    }

    close() {
        this.dom.modalOverlay.style.display = 'none';
        this.dom.modal.style.display = 'none';
        this.dom.errorMessage.style.visibility = 'hidden';
        this.dom.errorMessage.style.opacity = '0';
        this.dom.modalInput.value = '';
        this.dom.livesButton.focus();
    }

    submit() {
        const input = this.dom.modalInput.value.trim();
        const lives = parseInt(input, 10);
        if (input === '' || isNaN(lives) || lives < 1 || lives > 10) {
            this.dom.errorMessage.style.visibility = 'visible';
            this.dom.errorMessage.style.opacity = '1'; 
            this.open();
            this.dom.modalInput.focus();
        } else {
            this.dom.welcomeLivesNumber.textContent = lives;
            this.dom.livesContainer.textContent = lives;
            updateURLWithLives(lives);
            this.close();
        }
    }

    trapFocus(event) {
        if (event.key === "Tab") {
            const focusableElements = this.dom.modal.querySelectorAll('button, input');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
    
            if (event.shiftKey) { 
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else { 
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    }
    

    setupEventListeners() {
        this.dom.livesButton.addEventListener('click', () => this.open());
        this.dom.modalClose.addEventListener('click', () => this.close());
        this.dom.modalSubmit.addEventListener('click', (event) => {
            event.preventDefault();
            this.submit();
        });

        this.dom.modal.addEventListener('keydown', this.trapFocus);

        window.addEventListener('click', (event) => {
            if (event.target === this.dom.modalOverlay) {
                this.close();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        });
    }
}

export { Modal };



  