# Lava Leap 🔥
### Subtitle: How I finally understood ES6 Classes and Constructors!
(Hint: it does not involve Barking Dogs)

A 2D platformer game implemented using vanilla JavaScript. The game features 
- player movement
- enemy (lava) patterns
- collectible items (coins)
- platform obstacles.
<br>

## Game Flow:
🎮 Objective: Your goal is to have your player collect all coins without making contact with the lava.

🕹️ Controls: Move your player using the arrow keys or the W, A, D keys.

⏱️ Real-Time Gameplay: The game state updates in real-time, which means you'll see immediate changes reflecting player movements, the behavior of the lava, and interactions between the player, lava, and coins.

🔥 Levels & Lives: Your player will progress through multiple challenging levels. A collision with lava means the level restarts. Should your player run out of lives or successfully complete all levels, the game will come to an end.

💡 Modifying Lives: Want an extra challenge or need some help? Adjust your player's number of lives directly in the URL.

🔄 Replayability: Whether you've run out of lives or conquered all levels, end-of-game messages and a handy restart button ensure you can always try again.

<br>


## Why I Wanted to Create This Project
I am a self-taught developer focused on frontend and accessibility. Learning ES6 Classes and Constructors has been simply a theoretical endeavor, and for the longest time I assumed classes and Constructors were some secret tools for backend developers. Fortunately, a chance encounter with Ean, a game developer at Disney, changed my perspective. Ean is one of the most passionate JavaScript developers I've ever met! He spoke about game development with such enthusiasm that it sparked my curiosity— even though I don't play video games!


Next? I picked up a copy of the "Eloquent JavaScript" book, and game on! And guess what? I had to use “Constructor” SEVEN times!

<br>I am excited to share this project and zoom in on a few chunks of code. My hope is that it might help those of you who are still unsure about classes and constructors in JavaScript. Please, do reach out if you have questions or ideas on how to improve the game.  🙏

<br>

## Classes and their Roles:
Here’s an overview of all SEVEN of them.
1. **Level**: Represents the game level with a 2D grid of cells, specifying where walls, actors (e.g., player, lava, coins) are located.
2. **State**: Represents the current state of the game, including the current level, actors, and the game's status (e.g., playing, won, lost).
3. **Vector**: Represents 2D vectors and is used for position and movement calculations.
4. **Player**: Represents the player character, which can move around the game grid.
5. **Lava**: Represents the moving lava obstacles in the game. The lava can move horizontally, vertically, or even stay still.
6. **Coin**: Represents collectible items that the player needs to gather to win the level.
7. **DOMDisplay**: Renders the game's state to the DOM, making the game playable in a browser.
<br>Plus, various utility functions that assist in managing player input, game animation, and interactions between game entities.

<br>

## Upcoming
Under Ean’s mentorship, I plan on evolving this game into a more sophisticated and secure application. I'm working on adding some extra cool features and more game levels (although, I must admit, I keep getting stuck on level 2 ☹️):
- pause option
- a second player (possible a Monster)
- improve the UI

This journey has been one of discovery, implementation, and, to my surprise, a fair bit of enjoyment—even for a non-gamer like me. I hope you will find it useful as well.
