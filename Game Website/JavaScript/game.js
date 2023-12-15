const canvas = document.getElementById("myCanvas"); 
canvas.width = 1024;
canvas.height = 576;

const context = canvas.getContext("2d");

const gravity = 1.7

// get the images 
const background = document.getElementById("background");
background.setAttribute("width", 1024);
background.setAttribute("height", 576);
const ground = document.getElementById("obstacle");
const platform = document.getElementById("platform");
const pineTree = document.getElementById("three");

// create the player 
class Player {
    constructor() { 
        // player speed
        this.speed = 6
        // player position
        this.position = {
            x: 140, y: 10
        }
        // the speed  
        this.velocity = {
            x: 0, y: 0
        }
        //the size of my figure 
        this.width = 50
        this.height = 50
    }
    // displaying the figure in my canvas 
    draw(){
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y,
        this.width, this.height)   
    }

    update(){
        this.draw() 
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height +
            this.velocity.y <= canvas.height){
            this.velocity.y += gravity 
        }
    }
}

// create obstractacles 
class Obstacle {
    constructor({x, y, image}) {
      this.position = {
        x, y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }
// takes and image and draw it using possitions 
    draw() {
        context.drawImage(this.image, this.position.x,
            this.position.y)
    }
}
class sceneryObj {
    constructor({x, y, image}) {
      this.position = { 
        x, y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }

    draw() {
        context.drawImage(this.image, this.position.x,
            this.position.y, this.width, this.height)
    }
}
// pass the class player to the object 
let player = new Player()

// pass the class obstacles to the object which in our scenario are used for floor 
let obstacles = [
    new Obstacle({
        x: -50, y: 460, image: platform
    }),
    new Obstacle({
        x: platform.width - 155, y: 460, image: platform
    }),
    // get a gap between the platform to be used for death pits 
    new Obstacle({
        x: platform.width * 2 + 70, y: 460, image: platform
    })
]
    let sceneObj = [ 
        new sceneryObj({
            x: 0, y: 0, image: background
        }),
        new sceneryObj({
            x: -15, y: 40, image: pineTree
        }),
        new sceneryObj({
            x: 220, y: 60, image: pineTree
        }),
        new sceneryObj({
            x: 800, y: 60, image: pineTree
        })
    ]
// pass the keyboard keys as a constant 
const keys = {
    right: { pressed: false },
    left: {pressed: false }
}

// initialize 
function init(){
 player = new Player()

 obstacles = [
    new Obstacle({
        x: -50, y: 460, image: platform
    }),
    new Obstacle({
        x: platform.width - 155, y: 460, image: platform
    }),
    new Obstacle({
        x: platform.width * 2 + 70, y: 460, image: platform
    })
]
     sceneObj = [ 
        new sceneryObj({
            x: 0, y: 0, image: background
        }),
        new sceneryObj({
            x: -15, y: 40, image: pineTree
        }),
        new sceneryObj({
            x: 220, y: 60, image: pineTree
        }),
        new sceneryObj({
            x: 800, y: 60, image: pineTree
        })
    ]
}
//this function shows all of the animation thru the game 
 function animation() {
    requestAnimationFrame(animation)
    // clearRect is cleaning the canvas and allows me to maintain the player 
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
   
    sceneObj.forEach(sObj => {
        sObj.draw()
    })

    obstacles.forEach((obstacle) => {
        obstacle.draw()
    }) 
    player.update()
    // condition for player movements with border
    if(keys.right.pressed && player.position.x < 950) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 20){
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if(keys.right.pressed){
            obstacles.forEach((obstacle) => {
                obstacle.position.x -= player.speed;
            })
              sceneObj.forEach(scnObj => {
                scnObj.position.x -= player.speed * 0.55;
            })
        } else if (keys.left.pressed){
            obstacles.forEach((obstacle) => {
                obstacle.position.x += player.speed;
            })
            sceneObj.forEach(scnObj => {
                scnObj.position.x += player.speed * 0.55;
            })  
        }
    }
// obstractacles collision detection 
    obstacles.forEach((obstacle) => {
        if (player.position.y + player.height <= 
            obstacle.position.y && 
            player.position.y + player.height + 
            player.velocity.y >= obstacle.position.y && 
            player.position.x + player.width >=
            obstacle.position.x && player.position.x <=
            obstacle.position.x + obstacle.width ){
                player.velocity.y = 0
        }
    })
    // a condition set up to loose 
    if (player.position.y > canvas.height){
       // initilize and set back to start
       init()
    }
 }
init()
animation()
// get the keycode for keyboard keys
window.addEventListener('keydown', ({ keyCode }) => {
   
   switch (keyCode) {
    
        case 37:
            console.log('arrow-left')
            keys.left.pressed = true
            break;

        case 38:
            console.log('arrow-up')  
            player.velocity.y -= 23.25
            break; 

         case 39:
            console.log('arrow-right') 
            keys.right.pressed = true
            break;   
   }
}) 

window.addEventListener('keyup', ({ keyCode }) => {
   
    switch (keyCode) {
     
        case 37:
            console.log('arrow-left')
            keys.left.pressed = false
            break;
 
        case 38:
            console.log('arrow-up')  
            player.velocity.y -= 20
            break; 
 
        case 39:
            console.log('arrow-right') 
            keys.right.pressed = false 
            break;   
    }
 }) 
