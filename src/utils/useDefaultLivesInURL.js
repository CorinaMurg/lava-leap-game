function useDefaultLivesInURL() {
    const defaultLives = 3; 
    const currentUrl = new URL(window.location.href);
    if (!currentUrl.searchParams.has('lives')) { 
        currentUrl.searchParams.set('lives', defaultLives); 
        window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
    }
}

export { useDefaultLivesInURL };

