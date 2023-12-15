const canvas = document.getElementById("myCanvas"); 
canvas.width = 1024;
canvas.height = 574;

const context = canvas.getContext("2d");

const gravity = 1.7;

// get the images 
const background = document.getElementById("background");
background.setAttribute("width", 1024);
background.setAttribute("height", 576);
const obstacleSmall = document.getElementById("obstacle");
const platform = document.getElementById("platform");
const platSmall = document.getElementById("smallPlat");

// create the player 
class Player {
    constructor() { 
        // player speed
        this.speed = 3
        // player position
        this.position = {
            x: 140, y: 10
        }
        // the speed  
        this.velocity = {
            x: 0, y: 0
        }
        //the size of my figure 
        this.width = 35;
        this.height = 35;
    }
    // displaying the figure in my canvas 
    draw(){
        context.fillStyle = 'orange';
        context.fillRect(this.position.x, this.position.y,
        this.width, this.height); 
    }

    update(){
        this.draw() 
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if (this.position.y + this.height +
            this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
    }
}

// create obstractacles 
class Obstacle {
    constructor({x, y, image}) {
      this.position = {
        x, y
      };
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    }
// takes and image and draw it using possitions 
    draw() {
        context.drawImage(this.image, this.position.x,
            this.position.y);
    }
}
class sceneryObj {
    constructor({x, y, image}) {
      this.position = { 
        x, y
      };
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    }

    draw(playerVelocityX) {
        const parallaxShift = playerVelocityX * 0.65;
        this.position.x -= parallaxShift;

        for(let i = -1; i <= 1; i++){
            context.drawImage(
                this.image, 
                Math.ceil(this.position.x + i * this.width),
                this.position.y,
                this.width,
                this.height);
        }
    if(this.position.x <= -this.width){
        this.position.x += this.width;
    } else if ( this.position.x >= canvas.width){
        this.position.x -= this.width;
    }
  }   
    
}
// pass the class player to the object 
let player = new Player()

// pass the class obstacles to the object which in our scenario are used for floor 
let obstacles = [
];
let sceneObj = [ 
];
// pass the keyboard keys as a constant 
const keys = {
    right: { 
        pressed: false 
    },
    left: {
        pressed: false 
    }
}
let scrollToStepOut = 0;

// initialize and set back to start and then use it to restart as well  
function init(){
 player = new Player()

 obstacles = [
    new Obstacle({
        x: platform.width + 400,
        y: 200, 
        image: obstacleSmall
    }),
    new Obstacle({
        x: -50, 
        y: 460, 
        image: platform
    }),
    new Obstacle({
        x: 775, 
        y: 370, 
        image: obstacleSmall
    }),
    new Obstacle({
        x: platform.width - 305, 
        y: 460, image:
        platform
    }),
    new Obstacle({
        x: platform.width * 2 + 260, 
        y: 260, 
        image: obstacleSmall
    }),
    new Obstacle({
        x: platform.width * 2 + 320, 
        y: 260, 
        image: obstacleSmall
    }),
    new Obstacle({
        x: platform.width * 2 + 70,
        y: 460, 
        image: platform
    }),
    new Obstacle({
        x: platform.width * 3 + 260,
        y: 460, 
        image: platform
    }),
    new Obstacle({
        x: platform.width * 4 + 210 - 120,
        y: 460, 
        image: platform
    }),
    
]
     sceneObj = [ 
        new sceneryObj({
            x: -1,
            y: -1, 
            image: background
        })
    ]
    scrollToStepOut = 0;
}

//this function shows all of the animation thru the game 
 function animation() {
    requestAnimationFrame(animation);
    // clearRect is cleaning the canvas and allows me to maintain the player 
    // context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
   
    sceneObj.forEach(sObj => {
        sObj.draw(player.velocity.x);
    })

    obstacles.forEach((obstacle) => {
        obstacle.draw();
    }) 
    player.update()
    // condition for player movements with border
    if(keys.right.pressed && player.position.x < 750) {
        player.velocity.x = player.speed;
    } else if ((keys.left.pressed && player.position.x > 200)
        // get rid of going out of the screen from the left side 
        || (keys.left.pressed && scrollToStepOut === 0 
        && player.position.x > 0)) 
    {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if(keys.right.pressed){
            obstacles.forEach((obstacle) => {
                scrollToStepOut += player.speed
                obstacle.position.x -= player.speed;
            })
              sceneObj.forEach(scnObj => {
                // the speed of the objects which are going to move 
                // with the player speed
                scnObj.position.x -= player.speed * 0.55;
            })
        } else if (keys.left.pressed && scrollToStepOut > 0){
            obstacles.forEach((obstacle) => {
                scrollToStepOut -= player.speed;
                obstacle.position.x += player.speed;
            })
            sceneObj.forEach(scnObj => {
                // the speed of the objects which are going to move 
                // with the player speed
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
                player.velocity.y = 0;
        }
    })
    
    // my win conditon
        if (scrollToStepOut > platform.width * 45 + 18000 + platform.width * 45 + 18000 ){
            alert(" You won the game. Congratulations!");
        }
    // a condition set up to lose 
    if (player.position.y > canvas.height){
        alert("You lost the game. ");
        
       // initilize and set back to start 
       init()
    }
 }
// call it back to restart the game with each bit connected 
init()
// call back to animate 
animation()
// get the keycode for keyboard keys
window.addEventListener('keydown', ({ keyCode }) => {
   
   switch (keyCode) {
    
        case 37:
            console.log('arrow-left')
            keys.left.pressed = true;
            break;

        case 38:
            console.log('arrow-up')  // to jump
            player.velocity.y -= 30;
            break; 

         case 39:
            console.log('arrow-right') 
            keys.right.pressed = true;
            break;   
   }
}) 

window.addEventListener('keyup', ({ keyCode }) => {
   
    switch (keyCode) {
     
        case 37:
            console.log('arrow-left');
            keys.left.pressed = false;
            break;
 
        case 38:
            console.log('arrow-up'); 
            break; 
 
        case 39:
            console.log('arrow-right'); 
            keys.right.pressed = false ;
            break;   
    }
 }) 
