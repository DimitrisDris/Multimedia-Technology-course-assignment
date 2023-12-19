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