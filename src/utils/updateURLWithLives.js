function updateURLWithLives(lives) {
    if (!lives) return; 

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lives', lives); 

    window.history.pushState({ path: currentUrl.href }, '', currentUrl.href);
}

export { updateURLWithLives };