# Quadstrike

A game where the player controls four ships *represented as squares* taking down as much enemy ships before the timer runs put, the more waves you pass the more enemies show up. The challenge of the game comes from the player having to match the color of his projectile to the color of the ship, each of the four ships are responsible for one of four colors. I.e the blue ships are responsible for taking down the blue enemies. when the player shoots the wrong enemy of the wrong color, the enemy absorbs the projectile and gets bigger and the allotted time decreases.

## Background and Overview
#### Motivation for project
    The motivation behind this project is that before App Academy I use to make games with the Gaming Engine unity, its been a while since I’ve sat down with a new project but I’m curious to translate my game design experience into pure javascript for my logic and html canvas for my visuals.

#### High level overview
    The game will be spin on asteroids where your responsible for controlling 4 ships instead of 1.

## Features and MVPs
* all ships track mouse movment when selected
* player is able to use WASD or arrow keys to switch control of each ship 
* player is able to use space or mouse click to shoot from the selected ship 
* enemies generate at the beginning of each round with random spawn points and random movement
* score and countdown timer visible 
* add effects, stars resizing, linearly interpolate ship movement, enemies resizing effect, and ship color display.

## Wireframe
![wireframe](https://github.com/DarianPorter/QuadStrike/blob/master/assets/readme_imgs/wireframe.jpg?raw=true)
* At the start of the game there will be an overlay with all of the game instructions
* Later, when the player clears the instructions, the game will consist of 2 rectangles, a large one containing the canvas all the game objects that will be drawn, and a smaller one containing the indicators that shows which ship is selected 
* score and time left is drawn in the middle of the screen layered behind enemies and projectiles 
* When the player is out off time enemies are not drawn and using the native browsers Alert function, the player will be prompted that the game is over 

## Technologies Used 
*  **Vanilla JavaScript**  for game Logic
* **HTML5 Canvas** for DOM manipulation and rendering game objects
* **Webpack** for compiling scrips 

## Game Scripts 
* quadStrike.js **entry file for webpack**
* ui.js  
* spawnEnemy.js 
* ship.js
* projectile.js 
* model.js 
* enemy.js
* effects.js 
* collision.js
* arrowInd.js

## Implementation
### Collision
   * The Implementation of Collision involves storing all drawable entities in an array that would be then itterated over by the collsion function. Each instance of a game object has a type as some gameobjects still need to be drawn but dosnt need to detect collision such as the stars or ui text, and things like the enemy projecties and enemy ships shouldnt be colliding with each other. after the colosion function checks the type attribute on the game objects class to determine weather it should detect collision or not, it passes the two gameobjects that are being compared to the checkCollision function.

![clollision code](https://github.com/DarianPorter/QuadStrike/blob/master/assets/readme_imgs/collision_code.jpg?raw=true)
