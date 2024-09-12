import confetti from 'canvas-confetti';

export function launchConfetti() {
    let duration = 30 * 1000;  
    let end = Date.now() + duration;
    let animationFrameId; 

    function frame() {
        if (Date.now() < end) {
            confetti({
                particleCount: 10,
                angle: 90,
                spread: 70,
                origin: { x: Math.random(), y: 0 },
                startVelocity: 30,
                scalar: 1.8,
                shapes: ['circle', 'circle', 'square'],
                colors: [
                    '#FF0000', 
                    '#00FF00', 
                    '#0000FF', 
                    '#FF00FF', 
                    '#00FFFF', 
                    '#FFFF00',
                ],
            });
            animationFrameId = requestAnimationFrame(frame); 
        } 
    }

    frame();  

    document.addEventListener('click', function stopAnimation() {
        cancelAnimationFrame(animationFrameId);  
        document.removeEventListener('click', stopAnimation);  
    }, { once: true });
}
