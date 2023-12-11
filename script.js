var groundSprites
var GROUND_SPRITE_WIDTH = 50
var GROUND_SPRITE_HEIGHT = 50
var numGroundSprites
var GRAVITY = 0.5
var JUMP = -12
var isGameOver
var score

var player
var platforms = new Array()
var zombies = new Array()
var onTop
var zombie
var a

// var plat
var flag = false

let playerSkin
let playerSkinR
let ground
let zombie1
let zombie1R

function preload() {
    playerSkin = loadImage('assets/p-skin.png')
    playerSkinR = loadImage('assets/p-skinR.png')
    ground = loadImage('assets/ground.jpg')
    zombie1 = loadImage('assets/zombie1.png')
    zombie1R = loadImage('assets/zombie1R.png')
}

function setup() {
    isGameOver = false
    score = 0

    createCanvas(1300, 600)
    background(255, 255, 255)

    groundSprites = new Group()

    numGroundSprites = width / GROUND_SPRITE_WIDTH + 1
    for (var n = -11; n < numGroundSprites -9; n++) {
        var groundSprite = createSprite(
            n * 50,
            height - 25,
            GROUND_SPRITE_WIDTH,
            GROUND_SPRITE_HEIGHT
        )

        groundSprite.addImage(ground)
        ground.resize(50, 50)

        groundSprites.add(groundSprite)
        
    } 

    player = createSprite(100, 500)
    player.addImage(playerSkin)
    playerSkin.resize(0, 110)
    playerSkinR.resize(0, 110)


    for(let i = 0; i < 10;  i++) {
        platforms[i] = new Platform(-300*i, 100*i, 200, 20)
    }

    for(let i = 0; i < 1;  i++) {
        zombies[i] = new Zombie(300, 515, 2, 2, createSprite())
    }

}

function draw() {
    if (isGameOver) {
        background(0)
        fill(255)
        textAlign(CENTER)
        text('Your score was: ' + score, camera.position.x, camera.position.y - 20)
        text('Game Over! Click anywhere to restart', camera.position.x, camera.position.y)
    }else{
        background(150, 200, 250)

        player.velocity.y = player.velocity.y + GRAVITY

        camera.position.x = player.position.x + 5

        if (player.position.x > groundSprites[numGroundSprites-13].position.x) {
            for (g of groundSprites) {
                g.position.x += 50
            }
        }else if (player.position.x < groundSprites[numGroundSprites-13].position.x){
            for (g of groundSprites) {
                g.position.x -= 50
            }
        }

        if (groundSprites.overlap(player)) {
            player.velocity.y = 0
            player.position.y = height - 50 - player.height / 2
        }



        platforms.forEach((p) => p.drawPlatform());
        platforms.forEach((p) => p.checkContact());

        onTop = false
        for (p of platforms) {
            if ((Math.ceil((player.position.y + 55) / 5) * 5 === p.y) && ((player.position.x >= p.x) && (player.position.x <= p.x + p.w))) {
                onTop = true
            }
        }

        zombies.forEach((z) => z.checkContact());
        zombies.forEach((z) => z.move());
        

        if (keyDown(UP_ARROW) && (groundSprites.overlap(player) || onTop)) {
            player.velocity.y = JUMP
        }
        if (keyDown(RIGHT_ARROW)) {
            player.position.x = player.position.x + 5
            camera.position.x = player.position.x + 5
            player.addImage(playerSkin)
        }
        if (keyDown(LEFT_ARROW)) {
            player.position.x = player.position.x - 5
            camera.position.x = player.position.x - 5
            player.addImage(playerSkinR)
        }
        if (keyDown(DOWN_ARROW)) {
            text(player.position.x + ' , ' + player.position.y, player.position.x - 100, 300)
            text('----------------', player.position.x - 100, player.position.y)
            text('|\n|\n|\n|', player.position.x, player.position.y - 110)

            text('----------------', player.position.x + 40, player.position.y)
            text('|\n|\n|\n|', player.position.x, player.position.y + 70)
        }

        // var firstGroundSprite = groundSprites[0]
        // if (firstGroundSprite.position.x <= camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
        //     groundSprites.remove(firstGroundSprite)
        //     firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width
        //     groundSprites.add(firstGroundSprite)
        // }

    
        // if (platformSprites.length > 0 && platformSprites[0].position.x <= camera.position.x - (width / 2 + platformSprites[0].width / 2)) {
        //     removeSprite(platformSprites[0])
        // }


        // platformSprites.overlap(player, endGame)
        drawSprites()
        // score = score + 1
        textAlign(CENTER)
        text(score, camera.position.x, 20)
    }

}


function endGame() {
    isGameOver = true
}

function mouseClicked() {
    if (isGameOver) {
        for (var n = 0; n < numGroundSprites; n++) {
            var groundSprite = groundSprites[n]
            groundSprite.position.x = n * 50
        }

        player.position.x = 100
        // player.position.y = height - 75
        
        // platformSprites.removeSprites()
        score = 0       
        isGameOver = false


    }
}


class Platform {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.drawPlatform();
    }

    drawPlatform() {
        fill(77, 64, 44);
        rect(this.x, this.y, this.w, this.h);
    }

    checkContact() {

        if ((player.position.x >= this.x) && (player.position.x <= this.x + this.w)) { // If player is in platform's width
            
            if ((Math.ceil((player.position.y + 55) / 5) * 5 >= this.y) && (Math.ceil((player.position.y + 55) / 5) * 5 <= this.y + 5)) { // If player is on top of the platform
                player.position.y = this.y - 55.1
                player.velocity.y = 0

            }else if ((player.position.y + 55 >= this.y) && (player.position.y - 45 <= this.y + 20)) { // If platform is between player's head and feet

                if (player.position.x <= this.x + 5) { // If player is on the platform's left end
                    player.position.x = this.x
                }else if (player.position.x + 5 >= this.x + this.w) { // If player is on the platform's right end
                    player.position.x = this.x + this.w
                }
 

            }else if (Math.ceil((player.position.y - 55) / 5) * 5 === this.y + 20) { // If player is beneath the platform
                player.position.y = this.y + 75.1
                player.velocity.y = 0
            }

        }

    }

}

class Zombie {

    constructor(x, y, p, s, a) {
        this.x = x;
        this.y = y;
        this.p = p;
        this.s = s;
        this.a = a;
        this.a.position.x = this.x
        this.a.position.y = this.y
        this.a.addImage(zombie1)
        zombie1.resize(0, 80)
        zombie1R.resize(0, 80)
    }

    checkContact() {

        if ((player.position.x >= this.a.position.x - 50) && (player.position.x <= this.a.position.x + 50)) {
            
            if ((player.position.y + 55 >= this.a.position.y - 30) && (player.position.y - 45 <= this.a.position.y + 30)) {
                text('XXX', player.position.x, player.position.y - 200)
            }
        }
    }

    move() {

        if (this.a.position.x > this.x + 200) {
            this.a.velocity.x = -this.s
            this.a.addImage(zombie1R)
        }else if (this.a.position.x <= this.x){
            this.a.velocity.x = this.s
            this.a.addImage(zombie1)
        }
    }

}