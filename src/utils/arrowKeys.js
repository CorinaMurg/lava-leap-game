function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";

            event.preventDefault();
        }
    }
    return {
        enable: () => {
            window.addEventListener("keydown", track);
            window.addEventListener("keyup", track);
        },
        disable: () => {
            window.removeEventListener("keydown", track);
            window.removeEventListener("keyup", track);
        },
        keys: down
    };
  }
  
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "s", "d"]);

export { arrowKeys };