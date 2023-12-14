// import blocks from '../images/Featured_Image5-removebg-preview.png'
// console.log(blocks)


const canvas = document.getElementById("myCanvas");

const context = canvas.getContext("2d");

const gravity = 1.5
// create the player 
class Player {
    constructor() { 
// player position
        this.position = {
             x: 140,
             y: 10
        }
        // the speed  
        this.velocity = {
            x: 0,
            y: 0
        }
        //the size of my figure 
        this.width = 12
        this.height = 12
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
        }else{
            this.velocity.y = 0
        } 
    }
}
// create obstractacles 
class Obstacle {
    constructor({x, y}) {
      this.position = {
        x,
        y
      }
      this.width = 50
      this.height = 10  
    }

    draw() {
        context.fillStyle = 'purple'
        context.fillRect(this.position.x, this.position.y,
            this.width, this.height)
    }
}

// pass the class player to the object 
const player = new Player()
// pass the class obstacles to the object 
const obstacles = [new Obstacle({
    x: 180,
    y: 100
    }),
    
    new Obstacle({
        x: 80,
        y: 50})]

// pass the keyboard keys as a constant 
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

//this function shows all of the animation thru the game 
function animation() {
    requestAnimationFrame(animation)
    // clearRect is cleaning the canvas and allows me to maintain the player 
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    
    obstacles.forEach((obstacle) => {
        obstacle.draw()
    })
    // condition for player movements with border
    if(keys.right.pressed && player.position.x < 250) {
        player.velocity.x = 2
    }
    else if (keys.left.pressed && player.position.x > 20){
        player.velocity.x = -2
    }
    else {
        player.velocity.x = 0

        if(keys.right.pressed){
            obstacles.forEach((obstacle) => {
                obstacle.position.x -= 2
            })  
        } else if (keys.left.pressed){
            obstacles.forEach((obstacle) => {
                obstacle.position.x += 2
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
}

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
            player.velocity.y -= 17
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
            player.velocity.y -= 17
            break; 
 
        case 39:
            console.log('arrow-right') 
            keys.right.pressed = false 
            break;   
    }
    
 }) 