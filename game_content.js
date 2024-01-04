class Platform {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        //this.drawPlatform();
    }

    drawPlatform() {
        fill(100, 40, 0);
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

class Character {

    constructor(x, y, scale, a) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.a.position.x = this.x
        this.a.position.y = this.y
        this.a.scale = scale
               
    }

}

class Zombie extends Character {

    constructor(x, y, scale, lives, speed, image, a) {             // Dry thelw e3igisi gia to resize 
        super(x, y, scale, a)
        this.l = lives;
        this.s = speed;
        this.a.addImage(image)
       
        //image.resize(0. 80)
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

                if (lifeCounter > 0) lifeCounter--
            }
        }
    }

    move() {

        if (this.a.position.x > this.x + 200) {
            this.a.velocity.x = -this.s
            this.a.mirrorX(1)
            //this.a.addImage(zombie1R)
        }else if (this.a.position.x <= this.x){
            this.a.velocity.x = this.s
            this.a.mirrorX(-1)
            //this.a.addImage(zombie1)
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
            let zomb_pos_x = this.a.position.x
            let zomb_pos_y = this.a.position.y

            if (Math.random() >= 0) {
                drops[dropCounter] = createSprite(zomb_pos_x, zomb_pos_y)
                drops[dropCounter].addImage(life)
                dropCounter++;
            }

            let index = zombies.indexOf(this)
            this.a.remove()
            zombies.splice(index, 1)
            //console.log(zombies.length)
            score++
            killStreak++
        }
    }

}

class Player extends Character {

    constructor(x, y, scale, start_direction, a) {
        super(x, y, scale, a)
        this.dir = start_direction
        player.addAnimation('Idle', playerIdle)
        player.addAnimation('Run', playerRun)
        player.addAnimation('Jump', playerJump)
        player.addAnimation('Shoot', playerShoot)
    }

    idle() {
        player.changeAnimation('Idle')
    }

    run() {
        player.changeAnimation('Run')
    }

    jump() {
        player.changeAnimation('Jump')
    }

    shoot() {
        player.changeAnimation('Shoot')
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
        if (!this.p) keySound.play()
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

            if (this.u) { return }
        }
        
    }

    hasKey() {
        if (keys[gates.indexOf(this)].p) {
            this.unlock();
            return this.u
        }
    }

    unlock() {
        openGateBool = true
        this.u = true
    }

    resetSound() {
        openGateBool = false
    }

    returnXPos() {
        return this.x
    }

}


class Portal {

    constructor(x, y, scale, image) {
        this.x = x
        this.y = y
        this.firstPortalSprite = createSprite(x, y)
        this.secondPortalSprite = createSprite(this.x+200, this.y)

        this.firstPortalSprite.addImage(image)
        this.firstPortalSprite.scale = scale

        this.secondPortalSprite.addImage(image)
        this.secondPortalSprite.scale = scale
               
    }

    /*constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    drawPortal() {
        drawSprites()
    }*/

    checkContact() {

        if ((player.position.x < this.x1 + 100) && (player.position.x > this.x1)) {
            if ((player.position.y < this.y1 + 250) && (player.position.y > this.y1 - 250)) {
                return [true, this.x2 + 50]
            }else{
                return [false]
            }
            
        }else if ((player.position.x < this.x2 + 100) && (player.position.x > this.x2)) {
            if ((player.position.y < this.y2 + 250) && (player.position.y > this.y2 - 250)) {
                return [true, this.x1 + 50]
            }else{
                return [false]
            }
        }
    }

}

class Button {

    constructor(x, y, image, imageWidth, imageHeight) {
        this.x = x
        this.y = y
        this.image = image
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
    }

    display() {
        //stroke(0)
        //fill(255)
        //rect(this.x, this.y, this.imageWidth, this.imageHeight)
        image(this.image, this.x, this.y, this.imageWidth, this.imageHeight)
        this.checkHover()
        //console.log()
    }

    checkHover() {
        //console.log(mouseX)
        //console.log(mouseY > 1555)
        /*if (mouseX > 1555 && mouseX < 2000) {
            return true
        }*/
        //console.log(mouseX > this.x && mouseX < this.x + this.imageWidth && mouseY > this.y && mouseY < this.y + this.imageHeight)
        if (mouseX > this.x && mouseX < this.x + this.imageWidth && mouseY > this.y && mouseY < this.y + this.imageHeight) {
            //if (mouseIsPressed) {
                GAME_STATE = 'SETTINGS'

                //noloop()
                return true
            //}
            
        }
    }

}