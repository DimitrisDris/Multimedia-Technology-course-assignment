
function setup() {

    background(255, 255, 255)
    createCanvas(1300, 600)

    // mus.play()

    startGame()
}

function draw() {
    if (isGameOver) {
        background(0)
        fill(255)
        textAlign(CENTER)
        textSize(18)
        text('You killed ' + score + ' zombies : ', camera.position.x, camera.position.y - 20)
        text('Game Over! Click anywhere to restart (or better just refresh the page)', camera.position.x, camera.position.y)
    }else{
        background(backgroundImg)

         /* When pressing the settings button */
         if (openSettingsButton) {
            settingsButton.hide()
            fill(200, 100)
            rect(width/4, height/7, width / 3.75, height / 1.75)
            showSliders()
           
        }

        // Displaying the score 
        image(zombieCounter, player.position.x - 40, 10)
        textSize(40)
        fill(200, 0, 0)
        text(score, player.position.x + 60, 60)

        // Displaying the current round
        fill(255, 0, 0)
        textSize(50)
        textFont('Rubik Doodle Shadow')
        text("Round "+currentRound, player.position.x - 90, 120)

        // Displaying the current wave for few secs
        if (newWaveStart) {
            fill(255, 0, 0)
            textSize(50)
            textFont('Rubik Doodle Shadow')
            text("Wave "+currentWave, player.position.x - 90, 230)  
            
            if (millis() - newWaveTime > 3500) {
                newWaveStart = false
            }
        }

        player.velocity.y = player.velocity.y + GRAVITY
        camera.position.x = player.position.x

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

        // Platforms draw
        push()
        platforms.forEach((p) => p.drawPlatform());
        platforms.forEach((p) => p.checkContact());
        pop()

        onTop = false
        for (p of platforms) {
            if ((Math.ceil((player.position.y + 55) / 5) * 5 === p.y) && ((player.position.x >= p.x) && (player.position.x <= p.x + p.w))) {
                onTop = true
            }
        }

        // Zombies draw 
        push()
        if (zombies.length > 0) {
            zombies.forEach((z) => z.checkContact());
            zombies.forEach((z) => z.move());
            zombies.forEach((z) => z.takeDamage());
        }
        pop()

        if (zombies.length === 0) startNewWave()

        push()
        keys.forEach((k) => k.drawKey());
        keys.forEach((k) => k.checkContact());
        pop()

        push()
        gates.forEach((g) => g.drawGate());
        gates.forEach((g) => g.checkContact());
        pop()

        push()
        //portals.forEach((p) => p.drawPortal());
        portals.forEach((p) => onPortal = p.checkContact());
        pop()

        push()
        for (let i = 0; i < 10; i++) {
            heart[i].position.x = camera.position.x - 550 + i*32
            heart[i].position.y = camera.position.y - 250
        }  
        pop()      

        push()
        for(let i = 0; i < lifeCounter; i++) {
            heart[i].addImage(life)
        }
        pop()
        
        push()
        for (let i = lifeCounter; i < 10; i++) {
            heart[i].addImage(nolife);
            
        }
        pop()
    
        

        push()
        for (b of bullets) {
            b.x += b.s / 4
            circle(b.x, b.y, 10)
            if ((b.x > player.position.x + 400) || (b.x < player.position.x - 400)) {
                bullets.pop(b)
            }
        }
        pop()

        push()
        for (d of drops) {
            if (player.position.x + 5 > d.position.x && player.position.x - 5 < d.position.x) {
                if (lifeCounter < 10) {
                    lifeCounter++
                    d.remove()
                    drops.splice(drops.indexOf(d), 1)
                    dropCounter--
                }
            }
        }
        pop()
        
        // PLAYER ANIMATION HANDLING 

        if (player.velocity.x == 0 && player.velocity.y == 0) {
            player.changeAnimation('Idle')
        }

        if (keyIsDown(83)) {
            if (pistolShot) {
                pistolShotSound.setVolume(0.1)
                pistolShotSound.rate(1.0)
                pistolShotSound.play()
                pistolShot = false
            }
            //playerFireSound.play()
            player.changeAnimation('Shoot')
        }

        if (keyIsDown(87) && (groundSprites.overlap(player) || onTop)) {
            player.velocity.y = JUMP
            player.changeAnimation('Jump')
        }
        if (keyIsDown(68)) {
            player.position.x = player.position.x + 5
            camera.position.x = player.position.x + 5
            

            s = 40
            player.mirrorX(1)
            player.changeAnimation('Run')
            
        }
        if (keyIsDown(65)) {
            player.position.x = player.position.x - 5
            camera.position.x = player.position.x - 5
            s = -40
            player.mirrorX(-1)
            player.changeAnimation('Run')            
            //pop()
        }

        /*if (playerRunBool && (keyIsDown(65) || keyIsDown(68))) {                        // This is for the run sound
            playerRunSound.setVolume(0.1)
            playerRunSound.play()
            playerRunBool = false
        }*/

        /*if (player.velocity.x != 0) {

        }*/

        if (keyIsDown(32)) {
            text(player.position.x + ' , ' + player.position.y, player.position.x - 100, 300)
            text(player.velocity.x + ' , ' + player.velocity.y, player.position.x - 100, 330)
            text('----------------', player.position.x - 100, player.position.y)
            text('|\n|\n|\n|', player.position.x, player.position.y - 110)
            text('----------------', player.position.x + 40, player.position.y)
            text('|\n|\n|\n|', player.position.x, player.position.y + 70)
        }

        if (lifeCounter === 0) {
            //removeSprites(heart)
            player.changeAnimation('Dead')
            
            if (player.getAnimationLabel() === 'Dead' && player.animation.getFrame() === player.animation.getLastFrame()) endGame()
            //grizzly.play()
            
        }

        drawSprites()

        
    }

}



function keyPressed() {
    
    if (keyIsDown(81)) {
        text(onPortal[0],player.position.x,300)
        if (onPortal[0]){
            player.position.x = onPortal[1]
        }
    }

    if (keyIsDown(83)) {
        pistolShot = true
        let bullet = {
            x: player.position.x + s,
            y: player.position.y + 10, //change
            s: s
        }
        bullets.push(bullet)
    }

    /*if (keyIsDown(68)) {
        //push()
        player_dir = 1
        playerRunBool = true
        
       // pop()
    }

    if (keyIsDown(65)) {
        player_dir = -1
        playerRunBool = true
        
    }*/

    if (openSettingsButton && keyCode === ESCAPE ) {
        openSettingsButton = false;
        settingsButton.show();
        hideSliders();
        // Unfreezes game
        loop()
        
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
    //grizzly.play()
    console.log(heart)
    isGameOver = true
}






