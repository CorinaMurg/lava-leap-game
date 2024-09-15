
// When pausing:

// record the current time from the last frame.
// stop calling requestAnimationFrame.


// resuming:

// Calculate the new timeStep 
// - reset it ???
// - ignore the time lost during the pause????
// resume calling requestAnimationFrame with new timeStep.