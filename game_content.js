class Platform {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    drawPlatform() {
        fill(40, 40, 40);
        rect(this.x, this.y, this.w, this.h, 8);
    }

    checkContact() {

        if ((player.position.x >= this.x) && (player.position.x <= this.x + this.w)) { // If player is in platform's width
            if ((Math.ceil((player.position.y + 45) / 5) * 5 >= this.y) && (Math.ceil((player.position.y + 45) / 5) * 5 <= this.y + 5)) { // If player is on top of the platform
                player.position.y = this.y - 45
                player.velocity.y = 0

            }else if ((player.position.y + 45 >= this.y + this.h) && (player.position.y - 24 <= this.y)) { // If platform is between player's head and feet
                if (player.position.x - 20 <= this.x) { // If player is on the platform's left end
                    player.position.x = this.x - 20
                }else if (player.position.x + 20 >= this.x + this.w) { // If player is on the platform's right end
                    player.position.x = this.x + this.w + 20
                }
            }
            // else if (Math.ceil((player.position.y - 24) / 5) * 5 === this.y + this.h) { // If player is beneath the platform
            //     player.position.y = this.y + this.h + 55
            //     player.velocity.y = 0
            // }
        }
    }
}

class Zombie {

    constructor(x, y, scale, lives, speed, image, a) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.a.position.x = this.x
        this.a.position.y = this.y
        this.a.scale = scale
        this.l = lives;
        this.s = speed;
        this.a.addImage(image)
    }


    checkContact() {

        zombieAttackTime1 = performance.now()

        if ((player.position.x >= this.a.position.x - 50) && (player.position.x <= this.a.position.x + 50)) {
            
            if ((player.position.y + 55 >= this.a.position.y - 30) && (player.position.y - 45 <= this.a.position.y + 30)) {

                if (player.position.x > this.a.position.x) {
                    player.velocity.x = 10
                }else if (player.position.x < this.a.position.x + 50) {
                    player.velocity.x = -10
                }
                player.velocity.y = player.velocity.y - 10
                
                if (lifeCounter > 0 && zombieAttackTime1 > zombieAttackTime2 + 500) {
                    zombieAttackTime2 = performance.now()
                    lifeCounter--
                    hitSoundBool = true
                }
                
            }
        }
    }

    move() {
        if (!onTop){
            if (player.position.x < this.a.position.x) {
                this.a.velocity.x = -this.s
                this.a.mirrorX(1)
            }else if (player.position.x > this.a.position.x){
                this.a.velocity.x = this.s
                this.a.mirrorX(-1)
            }
        }else{
            if (this.a.position.x > player.position.x + 100) {
                this.a.velocity.x = -this.s
                this.a.mirrorX(1)
            }else if (this.a.position.x < player.position.x - 100){
                this.a.velocity.x = this.s
                this.a.mirrorX(-1)
            }
        }
    }

    takeDamage() {
        for (let i = 0; i < bullets.length; i++) {
            if ((bullets[i].y >= this.a.position.y - 30) && (bullets[i].y <= this.a.position.y + 30)) {
                if ((bullets[i].x >= this.a.position.x - 30) && (bullets[i].x <= this.a.position.x + 30)) {
                    bullets.pop(bullets[i])
                    if (!superPowerActiveBool) this.l -= 1
                    else this.l-= 2
                    this.isDead()
                }
            }
        }
    }

    isDead() {
        if (this.l <= 0) {
            let zomb_pos_x = this.a.position.x
            let zomb_pos_y = this.a.position.y

            if (Math.random() >= 0.8) {
                drops[dropCounter] = createSprite(zomb_pos_x, zomb_pos_y)
                drops[dropCounter].addImage(life)
                dropCounter++;
            }

            let index = zombies.indexOf(this)
            this.a.remove()
            zombies.splice(index, 1)
            score++
            if (!superPowerActiveBool) killStreak++         // Only add to killstreak when the superpower is not activated
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
        if(!this.p ) {          // && passedAllWaves
            image(key, this.x, this.y)
            key.resize(0, 70)
        }
    }


    checkContact() {

        if ((player.position.x >= this.x) && (player.position.x <= this.x + 50)) {
            if ((player.position.y + 55 >= this.y + 50) && (player.position.y - 45 <= this.y)) {
                this.pick()
                showKeyBool = false
                // delete keys[keys.indexOf(this)]
            }
        }
    }

    pick() {
        if (!this.p) keySound.play()
        this.p = true
        passedAllWaves = false
        
    }

}

class Gate {

    constructor(x, y, u, lastBool) {
        this.x = x;
        this.y = y;
        this.u = u;
        this.lastBool = lastBool
    }

    drawGate() {
        if(!this.u) {
            if(this.lastBool) {
                finishGate.resize(0, 300)
                image(finishGate, this.x, this.y - 200)
            }else{
                gate.resize(0, 300)
                image(gate, this.x, this.y - 200)
            }


        }else{
            if(this.lastBool) {
                finishGateOpen.resize(0, 300)
                image(finishGateOpen, this.x, this.y - 200)
            }else{
                openGate.resize(0, 300)
                image(openGate, this.x, this.y - 200)
            }

        }
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

    constructor(x1, y1, x2, y2, scale, image) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2

        this.firstPortalSprite = createSprite(this.x1, this.y1)
        this.secondPortalSprite = createSprite(this.x2, this.y2)

        this.firstPortalSprite.addImage(image)
        this.firstPortalSprite.scale = scale

        this.secondPortalSprite.addImage(image)
        this.secondPortalSprite.mirrorX(-1)
        this.secondPortalSprite.scale = scale
               
    }

    checkContact() {
        if ((player.position.x < this.x1 + 50) && (player.position.x > this.x1 - 50)) {
            if ((player.position.y < this.y1 + 50) && (player.position.y > this.y1 - 50)) {
                return [true, this.x2, this.y2 - 50]
            }else{
                return [false]
            }
            
        }else if ((player.position.x < this.x2 + 50) && (player.position.x > this.x2 - 50)) {
            if ((player.position.y < this.y2 + 50) && (player.position.y > this.y2 - 50)) {
                return [true, this.x1, this.y1 - 50]
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

class Lava {

    constructor(x, y, w) { // x, y is the upper left corver of the lava block and w is the length (how many ground blocks lava will be)
        this.x = x;
        this.y = y;
        this.w = w;

        for (let i = 0; i < this.w; i++) {
            createSprite(x + 50*i, y).addImage(lavaGif)
            createSprite(x + 50*i, y + 25).addImage(lavaGif)
        }
    }

    checkContact() {
        if (player.position.x >= this.x && player.position.x <= this.x + this.w * 50 - 20) {
            if (player.position.y + 45 === this.y) {
                player.velocity.x = 1
                player.position.y += 55
                lifeCounter = 0
            }
        }

    }

}