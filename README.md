# 🔥 Lava Leap 
<b>Subtitle: How I finally understood ES6 Classes and Constructors!</b>
<br>
(Hint: it does not involve barking dogs)

Lava Leap is a 2D platformer game implemented using vanilla JavaScript. The game features:
- player movement
- enemy (ie lava) patterns
- collectible items (coins)
- platform obstacles.
<br>

## 🎮 Game Flow
- You can move your player using the arrow keys or the W, A, D keys. 
- The goal is to have it collect all the coins without making contact with the lava, and then it can progress to the next level (there are 5 levels right now). 
- A collision with the lava means the level restarts. 
- Should your player run out of lives or successfully complete all levels, the game will come to an end.

💡 Want an extra challenge or need some help? Adjust your player's number of lives directly in the URL.

🔄 If you've run out of lives or conquered all levels, I added end-of-game messages and a restart button so you can always try again!

<br>


## Why I Wanted to Create This Project
I am a self-taught developer focused on frontend and accessibility. For the longest time, ES6 Classes and Constructors just didn't make sense, and assumed they were some secret tools for backend developers. Fortunately, a chance encounter with [Ean Moore](https://www.linkedin.com/in/ean-moore-948357103), a Senior Software Engineer and game developer, changed my perspective. Ean is one of the most passionate JavaScript developers I've ever met! He spoke about game development with such enthusiasm that it sparked my curiosity— even though I don't play video games!

<br>This project began as a direct application from the "Eloquent JavaScript" book, which I then adapted by 

- restructuring the codebase, 
- adding end-game messages and a restart button, 
- allowing the user to adjust the number of lives,
- modifying the color theme for better accessibility.
<br>And guess what? Now I know how to use the “Constructor”! 

<br>Right now I'm working on adding some extra cool features and more game levels (although, I must admit, I keep getting stuck on level 2 ☹️):
<br>
- pause option
- a second player (should it be a Good one or a Bad one?! 🤔)
- improve the UI
<br>

## PS: A quick overview of all the (seven!) Classes and their roles:

1. **Level**: Represents the game level with a 2D grid of cells, specifying where walls, actors (e.g., player, lava, coins) are located.
2. **State**: Represents the current state of the game, including the current level, actors, and the game's status (e.g., playing, won, lost).
3. **Vector**: Represents 2D vectors and is used for position and movement calculations.
4. **Player**: Represents the player character, which can move around the game grid.
5. **Lava**: Represents the moving lava obstacles in the game. The lava can move horizontally, vertically, or even stay still.
6. **Coin**: Represents collectible items that the player needs to gather to win the level.
7. **DOMDisplay**: Renders the game's state to the DOM, making the game playable in a browser.
<br>
<br>Plus, various utility functions that assist in managing player input, game animation, and interactions between game entities.