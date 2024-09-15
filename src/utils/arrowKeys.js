class KeyTracker {
    constructor(keys) {
        this.keys = keys;
        this.keyDown = Object.create(null);
        // this.listen = this.listen.bind(this);
    }

    listen = (event) => {
        if (this.keys.includes(event.key)) {
            this.keyDown[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }

    enable() {
        window.addEventListener("keydown", this.listen);
        window.addEventListener("keyup", this.listen);
    }

    disable() {
        window.removeEventListener("keydown", this.listen);
        window.removeEventListener("keyup", this.listen);
    }
}

  
const arrowKeys = new KeyTracker(["ArrowLeft", "ArrowRight", "ArrowUp", "w", "a", "s", "d"]);

export { arrowKeys };