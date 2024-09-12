// import confetti from 'canvas-confetti';

// export function launchConfetti() {
//     confetti({
//         particleCount: 150,
//         spread: 180,
//         origin: { y: 0.6 }
//     });
// }

import confetti from 'canvas-confetti';

// export function launchConfetti() {
    
//     let duration = 7 * 1000; 
//     let end = Date.now() + duration;

//     (function frame() {
//         confetti({
//             particleCount: 10,
//             angle: 90,
//             spread: 70,
//             origin: { x: Math.random(), y: 0 }, 
//             startVelocity: 30, 
//             scalar: 1.8, 
//             shapes: ['circle', 'circle', 'square'],
//             zIndex: 1000,
//             // colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
//         });

//         if (Date.now() < end) {
//             requestAnimationFrame(frame);
//         } 
//     }());
// }


export function launchConfetti() {
    let duration = 30 * 1000;  // Duration for the continuous effect
    let end = Date.now() + duration;
    let animationFrameId;  // Variable to store the requestAnimationFrame ID

    function frame() {
        console.log('Frame called');  // Debug: Check if the frame is being called repeatedly
        if (Date.now() < end) {
            confetti({
                particleCount: 10,
                angle: 90,
                spread: 70,
                origin: { x: Math.random(), y: 0 },
                startVelocity: 30,
                scalar: 1.8,
                shapes: ['circle', 'circle', 'square'],
                zIndex: 1000,
            });
            animationFrameId = requestAnimationFrame(frame);  // Store the ID to enable cancellation
        } else {
            console.log('Animation time ended');  // Debug: Check if the time condition stops the loop
        }
    }

    frame();  // Start the confetti animation

    // Setup a click listener to stop the confetti when the page is clicked
    document.addEventListener('click', function stopAnimation() {
        console.log('Click detected, stopping animation');  // Debug: Verify that click is detected
        cancelAnimationFrame(animationFrameId);  // Use the stored ID to cancel the animation
        document.removeEventListener('click', stopAnimation);  // Clean up the event listener
    }, { once: true });
}
