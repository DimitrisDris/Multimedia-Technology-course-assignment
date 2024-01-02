
function setup() {

    background(255, 255, 255)
    createCanvas(1300, 600)

    // mus.play()

    startGame()
}

function draw() {
    
    if (GAME_STATE === 'END') {
        background(0)
        fill(255)
        textAlign(CENTER)
        textSize(18)
        text('You killed ' + score + ' zombies : ', camera.position.x, camera.position.y - 20)
        text('Game Over! Click anywhere to restart (or better just refresh the page)', camera.position.x, camera.position.y)
    } else if (GAME_STATE === 'SETTINGS') {
        background(0)
        settingsButton.hide()

        /*fill(255, 0, 0)
        textSize(50)
        textFont('Rubik Doodle Shadow')
        text("Music Volume", camera.position.x - 150, musSliderPosY - 60 )

        fill(255, 0, 0)
        textSize(50)
        textFont('Rubik Doodle Shadow')
        text("Audio Volume", camera.position.x - 150, audioSliderPosY - 60)*/

        settingsDescription()
        showSliders()
    } /*else if (GAME_STATE === ' START') {
        fill(255, 0, 0)
        textSize(50)
        textFont('Rubik Doodle Shadow')
        text("Press SPACE to start!", camera.position.x - 190, musSliderPosY - 55 )
        //drawSprites()
    }*/
     else if (GAME_STATE === 'PLAYING') {

        /*if (!settingsButton) {
            settingsButton = new Button(player.position.x - 40, 30, settingsImg, 30, 30)
        } else {
        
        }*/
        //settingsButton = new SetButton(player.position.x - 40, 30, settingsImg, 30, 30)
        //settingsButton.display()

        
        
        /*if (!runGameBool) {
            noloop()
            
            fill(255, 0, 0)
            textSize(50)
            textFont('Rubik Doodle Shadow')
            text("Press SPACE to start!", camera.position.x - 190, musSliderPosY - 55 )
        }*/
        background(backgroundImg)

        //image(zombieCounter, player.position.x + 40, 30, 30, 30)
        //settingsButton.position.x = player.position.x - 30
        //settingsButton.position.y = 30
        
        

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

        settingsButton = new Button(player.position.x + 500, 25, settingsImg, 100, 100)
        settingsButton.display()
        settingsButton.checkHover()

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

        player.position.x = constrain(player.position.x, -500, 3500)            // To control the play area of the game

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
        //gates.forEach((g) => g.checkContact());
        gates.forEach((g) => {
            if (!g.u) g.checkContact()          // for the sound to be working properly
            else {}
        });
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

        gates.forEach( (g) => {             // Open gate sound
            if (g.u) {
                //openGateBool = true
                if (openGateBool) {
                    //openGateSound.setVolume(0.1)
                    openGateSound.rate(1.0)
                    openGateSound.play()
                    g.resetSound()
                }
                
                
            }
        })

        /*if (openGateBool) {
            openGateSound.setVolume(0.1)
            openGateSound.rate(1.0)
            openGateSound.play()
            openGateBool = false
        }*/
        
        // PLAYER ANIMATION HANDLING 

        if (player.velocity.x == 0 && player.velocity.y == 0) {
            //player.changeAnimation('Idle')
            player.changeAnimation('LaraStand')
        }

        if (keyIsDown(83)) {
            if (pistolShotBool) {
                //pistolShotSound.setVolume(0.1)
                pistolShotSound.rate(1.0)
                pistolShotSound.play()
                pistolShotBool = false
            }
            //playerFireSound.play()
            //player.changeAnimation('Shoot')
            player.changeAnimation('LaraAttack')
        }

        if (keyIsDown(87) && (groundSprites.overlap(player) || onTop)) {
            if (playerJumpBool) {
                //playerJumpSound.setVolume(0.1)
                playerJumpSound.rate(1.0)
                playerJumpSound.play()
                playerJumpBool = false
            }
            player.velocity.y = JUMP
            //player.changeAnimation('Jump')
            player.changeAnimation('LaraJump')
        }
        if (keyIsDown(68)) {
            player.position.x = player.position.x + 5
            camera.position.x = player.position.x + 5
            

            s = 40
            player.mirrorX(1)
            //player.changeAnimation('Run')
            player.changeAnimation('LaraRun')
            
        }
        if (keyIsDown(65)) {
            player.position.x = player.position.x - 5
            camera.position.x = player.position.x - 5
            s = -40
            player.mirrorX(-1)
            //player.changeAnimation('Run')        
            player.changeAnimation('LaraRun')   
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

    if (!runGameBool && keyIsDown(32)) {
        runGameBool = true
        loop()
    }
    
    if (keyIsDown(81)) {
        text(onPortal[0],player.position.x,300)
        if (onPortal[0]){
            player.position.x = onPortal[1]
        }
    }

    if (keyIsDown(83)) {
        pistolShotBool = true
        let bullet = {
            x: player.position.x + s,
            y: player.position.y + 10, //change
            s: s
        }
        bullets.push(bullet)
    }

    if (keyIsDown(87)) {
        playerJumpBool = true
    }

    if (GAME_STATE === 'SETTINGS' && keyCode === ESCAPE ) {
        GAME_STATE = 'PLAYING'
        openSettingsButton = false;
        settingsButton.show();
        hideSliders();
        // Unfreezes game
        loop()
        
    }

    /*if (openSettingsButton && keyCode === ESCAPE ) {
        openSettingsButton = false;
        settingsButton.show();
        hideSliders();
        // Unfreezes game
        loop()
        
    }*/
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

    if (mouseX > settingsButton.x && mouseX < settingsButton.x + settingsButton.imageWidth &&
        mouseY > settingsButton.y && mouseY < settingsButton.y + settingsButton.imageWidth) {
            GAME_STATE = 'SETTINGS'
            noloop()
        }

    
}



function endGame() {
    //grizzly.play()
    console.log(heart)
    GAME_STATE = 'END'
    isGameOver = true
}




