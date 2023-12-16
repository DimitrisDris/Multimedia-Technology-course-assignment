var groundSprites
var GRAVITY = 0.5
var JUMP = -12
var isGameOver
var score

var player
var platforms = new Array()
var zombies = new Array()
var onTop
var zombie
var heart = new Array()
var lifeCounter

var keys = new Array()
var gates = new Array()

let bullets = []
let s = 40

let playerSkin
let playerSkinR
let ground
let zombie1
let zombie1R
let life
let nolife
let gate
let openGate
let key

function preload() {
    playerSkin = loadImage('assets/p-skin.png')
    playerSkinR = loadImage('assets/p-skinR.png')
    ground = loadImage('assets/ground.jpg')
    zombie1 = loadImage('assets/zombie1.png')
    zombie1R = loadImage('assets/zombie1R.png')

    life = loadImage('assets/life.png')
    nolife = loadImage('assets/nolife.png')

    zombieCounter = loadImage('assets/zombieCounter.png')

    gate = loadImage('assets/gate.png')
    openGate = loadImage('assets/openGate.png')
    key = loadImage('assets/key.png')
}

function setup() {
    isGameOver = false
    score = 0

    createCanvas(1300, 600)
    background(255, 255, 255)

    groundSprites = new Group()

    for (var n = -10; n < (width / 50 + 1) - 8; n++) {
        var groundSprite = createSprite(n * 50, height - 25, 50, 50)

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
        zombies[i] = new Zombie(300, 515, 5, 2, createSprite())
    }

    for(let i = 0; i < 10; i++) {
        heart[i] = createSprite()
        heart[i].addImage(life)
    }
    life.resize(0, 30)
    nolife.resize(0, 30)
    lifeCounter = 10

    zombieCounter.resize(0, 70)

    for(let i = 0; i < 1;  i++) {
        keys[i] = new Key(1000, 450, false)
    }
    for(let i = 0; i < 1;  i++) {
        gates[i] = new Gate(1300, 450, false)
    }

}

function draw() {
    if (isGameOver) {
        background(0)
        fill(255)
        textAlign(CENTER)
        textSize(18)
        text('You kill ' + score + ' zombies : ', camera.position.x, camera.position.y - 20)
        text('Game Over! Click anywhere to restart (or better just refresh the page)', camera.position.x, camera.position.y)
    }else{
        background(150, 200, 250)

        player.velocity.y = player.velocity.y + GRAVITY
        camera.position.x = player.position.x + 5

        if (player.velocity.x > -0.1 && player.velocity.x < 0.1) {
            player.velocity.x = 0
        }else if (player.velocity.x < 0) {
            player.velocity.x = player.velocity.x + 0.2
        }else if (player.velocity.x > 0) {
            player.velocity.x = player.velocity.x - 0.2
        }


        if (player.position.x > groundSprites[14].position.x) {
            for (g of groundSprites) {
                g.position.x += 50
            }
        }else if (player.position.x < groundSprites[14].position.x) {
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

        zombies.forEach((z) => z.takeDamage());

        keys.forEach((k) => k.drawKey());
        keys.forEach((k) => k.checkContact());

        gates.forEach((g) => g.drawGate());
        gates.forEach((g) => g.checkContact());

                    
        for (let i = 0; i < 10; i++) {
            heart[i].position.x = camera.position.x - 550 + i*32
            heart[i].position.y = camera.position.y - 250
        }
        for (let i = lifeCounter; i < 10; i++) {
            heart[i].addImage(nolife)
        }
        
        image(zombieCounter, player.position.x - 40, 10)
        textSize(28)
        fill(200, 0, 0)
        text(score, player.position.x + 60, 60)


        for (b of bullets) {
            b.x += b.s / 4
            circle(b.x, b.y, 10)
            if ((b.x > player.position.x + 400) || (b.x < player.position.x - 400)) {
                bullets.pop(b)
            }
        }


        if (keyIsDown(87) && (groundSprites.overlap(player) || onTop)) {
            player.velocity.y = JUMP
        }
        if (keyIsDown(68)) {
            player.position.x = player.position.x + 5
            camera.position.x = player.position.x + 5
            player.addImage(playerSkin)
            s = 40
        }
        if (keyIsDown(65)) {
            player.position.x = player.position.x - 5
            camera.position.x = player.position.x - 5
            player.addImage(playerSkinR)
            s = -40
        }

        if (keyIsDown(32)) {
            text(player.position.x + ' , ' + player.position.y, player.position.x - 100, 300)
            text(player.velocity.x + ' , ' + player.velocity.y, player.position.x - 100, 330)
            text('----------------', player.position.x - 100, player.position.y)
            text('|\n|\n|\n|', player.position.x, player.position.y - 110)
            text('----------------', player.position.x + 40, player.position.y)
            text('|\n|\n|\n|', player.position.x, player.position.y + 70)
        }

        if (lifeCounter === 0) {
            endGame()
        }

        drawSprites()
    }

}


function keyPressed() {
    if (keyIsDown(83)) {
        let bullet = {
            x: player.position.x + s,
            y: player.position.y - 10,
            s: s
        }
        bullets.push(bullet)
    }
}

function mouseClicked() {
    if (isGameOver) {
        isGameOver = false

        player.position.x = 100
        player.position.y = height - 75
        
        score = 0       
        
        lifeCounter = 10
        for(let i = 0; i < 10; i++) {
            heart[i].addImage(life)
        }
    }
}



function endGame() {
    isGameOver = true
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

    constructor(x, y, l, s, a) {
        this.x = x;
        this.y = y;
        this.l = l;
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
                if (player.position.x > this.a.position.x) {
                    player.velocity.x = 10
                }else if (player.position.x < this.a.position.x + 50) {
                    player.velocity.x = -10
                }
                player.velocity.y = player.velocity.y - 5

                lifeCounter--
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

    takeDamage() {
        for (let i = 0; i < bullets.length; i++) {
            if ((bullets[i].y >= this.a.position.y - 30) && (bullets[i].y <= this.a.position.y + 30)) {
                if ((bullets[i].x >= this.a.position.x - 30) && (bullets[i].x <= this.a.position.x + 30)) {
                    bullets.pop(bullets[i])
                    this.l -= 1
                    this.isDead()
                }
            }
        }
    }

    isDead() {
        if (this.l === 0) {
            this.a.remove()
            zombies.pop(this)
            score += 1
        }
    }

}


class Key {

    constructor(x, y, p) {
        this.x = x;
        this.y = y;
        this.p = p;
    }
    
    drawKey() {
        if(!this.p) {
            image(key, this.x, this.y)
            key.resize(0, 70)

            // noStroke();
            // noFill()
            // rect(this.x + 10, this.y + 10, 50)
        }
    }


    checkContact() {

        if ((player.position.x >= this.x) && (player.position.x <= this.x + 50)) {
            if ((player.position.y + 55 >= this.y + 50) && (player.position.y - 45 <= this.y)) {
                this.pick()
                // delete keys[keys.indexOf(this)]
            }
        }
    }

    pick() {
        this.p = true
    }

}

class Gate {

    constructor(x, y, u) {
        this.x = x;
        this.y = y;
        this.u = u;
    }

    drawGate() {
        if(!this.u) {
            image(gate, this.x, this.y - 200)
            gate.resize(0, 300)

            // rect(this.x + 90, this.y - 160, 140, 250)
        }else{
            openGate.resize(0, 300)
            image(openGate, this.x, this.y - 200)
        }
        // noStroke();
        // noFill()
    }

    checkContact() {
        if ((player.position.x >= this.x + 50) && (player.position.x <= this.x + 55)) {
            if (!this.hasKey()) {
                player.position.x = this.x + 45
            }
        }
    }

    hasKey() {
        if (keys[gates.indexOf(this)].p) {
            this.unlock();
            return this.u
        }
    }

    unlock() {
        this.u = true
    }

}


