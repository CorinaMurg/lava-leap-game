// re: structure and challenges.
class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(char => [...char]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
    
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type === "string") return type;
                this.startActors.push( type.create(new Vector(x, y), ch));
                return "empty";
            });
        });

        this.remainingCoins = this.startActors.filter(actor => actor.type === "coin").length;
    }
}
  
// dynamic aspects of the game that relate directly to the player's interaction with the game environment
class State {
    constructor(level, actors, status, collectedCoins) {
        this.level = level;
        this.actors = actors;
        this.status = status;
        this.collectedCoins = collectedCoins;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(a => a.type === "player");
    }
}
  
  
class Vector {
    constructor(x, y) {
      this.x = x; 
      this.y = y;
    }
    plus(other) {
      return new Vector(this.x + other.x, this.y + other.y);
    }
    times(factor) {
      return new Vector(this.x * factor, this.y * factor);
    }
}
  
class Player {
    constructor(pos, speed) {
      this.pos = pos;
      this.speed = speed;
    }
  
    get type() { return "player"; }
  
    static create(pos) {
      return new Player(pos.plus(new Vector(0, -0.5)), new Vector(0, 0));
    }
}
  
Player.prototype.size = new Vector(0.8, 1.5);
  
class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }
  
    get type() { return "lava"; }
  
    static create(pos, ch) {
        if (ch === "=") {
            return new Lava(pos, new Vector(2, 0));
        } else if (ch === "|") {
            return new Lava(pos, new Vector(0, 2));
        } else if (ch === "v") {
            return new Lava(pos, new Vector(0, 3), pos);
        }
    }
}
  
Lava.prototype.size = new Vector(1, 1);
  
class Coin {
    constructor(pos, basePos, wobble) {
      this.pos = pos;
      this.basePos = basePos;
      this.wobble = wobble;
    }
  
    get type() { return "coin"; }
  
    static create(pos) {
      let basePos = pos.plus(new Vector(0.2, 0.1));
      return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
}
  
Coin.prototype.size = new Vector(0.6, 0.6);

Level.prototype.touches = function(pos, size, type) {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);
  
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        let here = isOutside ? "wall" : this.rows[y][x];
        if (here === type) return true;
      }
    }
    return false;
};

State.prototype.update = function(time, keys) {
    let actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status, this.collectedCoins);
  
    if (newState.status !== "playing") return newState;
  
    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
        return new State(this.level, actors, "lost", newState.collectedCoins);
    }
  
    for (let actor of actors) {
        if (actor !== player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState;
};

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
}

Lava.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost");
};

Lava.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};
  
Coin.prototype.collide = function(state) {
    let filtered = state.actors.filter(a => a != this);  
    let status = state.status;
    state.collectedCoins++; 
    state.level.remainingCoins--; 

    if (!filtered.some(a => a.type === "coin")) {
        status = "won";
    }
    return new State(state.level, filtered, status, state.collectedCoins);
};

const wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vector(0, wobblePos)), this.basePos, wobble);
};

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft || keys.a) xSpeed -= playerXSpeed;
    if (keys.ArrowRight || keys.d) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vector(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vector(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
    } else if ((keys.ArrowUp || keys.w) && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(pos, new Vector(xSpeed, ySpeed));
};

const levelChars = {
    ".": "empty", 
    "#": "wall", 
    "+": "lava",
    "@": Player, 
    "o": Coin,
    "=": Lava, 
    "|": Lava, 
    "v": Lava
};

export { Vector, Level, State, Player, Lava, Coin };
