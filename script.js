
function setup() {

    background(255, 255, 255)
    createCanvas(1300, 600)

    mus.play()

    startGame()
}

function draw() {
    
    if (GAME_STATE === 'END') {
        background(0)
        settingsButton.hide()
        
        displayEndScreen()

        if (keyIsDown(82)) {
            location.reload();
        }

    } else if (GAME_STATE === 'SETTINGS') {
        background(0)
        settingsButton.hide()

        settingsDescription()
        showSliders()
    } else if (GAME_STATE === 'INSTRUCTIONS') {
        background(0)
        noLoop()
        settingsButton.hide()
        instructionsDescription()
    }else if (GAME_STATE === 'PLAYING') {
        
        background(backgroundImg)

        drawObjects()

        if (!startGameBool) { 
            displayStartScreen()
        }

        if (startGameBool) {
            // Displaying the score 
            noStroke(0)
            image(zombieCounter, player.position.x - 40, 10)
            textSize(40)
            fill(200, 0, 0)
            textFont('Rubik Doodle Shadow')
            text(score, player.position.x + 60, 60)

            displaySuperPower()

            //heart[i].position.x = camera.position.x - 550 + i*32
                //heart[i].position.y = camera.position.y - 250

            fill(255, 0, 0)
            textSize(25)
            textFont('Rubik Doodle Shadow')
            text("Zombies alive: "+zombies.length, camera.position.x - 550, camera.position.y - 190)

            

            // Displaying the current round
            if (!playForHighScore) {
                fill(255, 0, 0)
                textSize(50)
                textFont('Rubik Doodle Shadow')
                text("Round "+currentRound, player.position.x - 90, 120)
            } else {
                fill(255, 0, 0)
                textSize(50)
                textFont('Rubik Doodle Shadow')
                text("High Score Mode", player.position.x - 90, 120)
            }


            // Displaying the current wave for few secs
            if (waveText && !finishedAllRounds) {
                fill(255, 0, 0)
                textSize(50)
                textFont('Rubik Doodle Shadow')
                if (currentWave-1 === 0) text("Wave 1", player.position.x - 90, 230) 
                else text("Wave "+(currentWave-1), player.position.x - 90, 230) 
                
                if (millis() - newWaveTime > 2000) {
                    waveText = false
                }
            }

        }

        // -------------------- To control the play area of the game --------------------
        player.position.x = constrain(player.position.x, -500, gates[TOTAL_ROUNDS-1].x+150)            

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

        // l = createSprite(200,540,50,50).addImage(lavaGif)
        lavaGif.resize(50, 50)
        
        if (groundSprites.overlap(player)) {
            player.velocity.y = 0
            player.position.y = height - 95
        }

        // -------------------- -------------------- --------------------

        // -------------------- GRAPHICS --------------------
        
        push()
        lavaPools.forEach((l) => l.checkContact());
        pop()

        push()
        platforms.forEach((p) => p.drawPlatform());
        platforms.forEach((p) => p.checkContact());
        pop()

        onTop = false
        for (p of platforms) {
            if ((Math.ceil((player.position.y + 45) / 5) * 5 === p.y) && ((player.position.x >= p.x) && (player.position.x <= p.x + p.w))) {
                onTop = true
            }
        }

        push()
        if (zombies.length > 0) {
            zombies.forEach((z) => z.checkContact());
            zombies.forEach((z) => z.move());
            zombies.forEach((z) => z.takeDamage());
        }
        pop()

        

        push()
        gates.forEach((g) => g.drawGate());
        gates.forEach((g) => {
            if (!g.u) g.checkContact()          // for the sound to be working properly
            else {}
        });
        pop()

        push()
        // portals.forEach((p) => p.drawPortal());
        portals.forEach((p) => onPortal = p.checkContact());
        pop()

        push()
        for (let i = 0; i < 5; i++) {
            heart[i].position.x = camera.position.x - 550 + i*32
            heart[i].position.y = camera.position.y - 250
        }  
        pop()      

        push()
        for(let i = 0; i < lifeCounter; i++) {
            //addLifeSoundBool = true
            
            heart[i].addImage(life)
        }
        pop()
        
        push()
        for (let i = lifeCounter; i < 5; i++) {
            heart[i].addImage(nolife);
            
        }
        pop()

        push()
        for (b of bullets) {
            b.x += b.s / 4
            circle(b.x , b.y - 25, 8)

            if ((b.x > player.position.x + 400) || (b.x < player.position.x - 400)) {
                bullets.pop(b)
            }
        }
        pop()

        push()
        for (d of drops) {
            if (player.position.x + 5 > d.position.x && player.position.x - 5 < d.position.x) {
                if (player.position.y + 50 > d.position.y && player.position.y - 50 < d.position.y) {
                    
                    if (lifeCounter < 5) {
                        addLifeSoundBool = true
                        lifeCounter++
                        d.remove()
                        drops.splice(drops.indexOf(d), 1)
                        dropCounter--
                    }
                }
            }
        }
        pop()

        gates.forEach( (g) => {             // Open gate sound
            if (g.u) {
                //openGateBool = true
                if (openGateBool) {
                    openGateSound.rate(1.0)
                    openGateSound.play()
                    g.resetSound()              // Resets the global sound variable
                }
                
                
            }
        })

        // -------------------- -------------------- --------------------

        // -------------------- GAME LOGIC (ROUNDS) --------------------
        
        checkKillstreak()
        push()
        if (passedAllWaves) {
            keys.forEach((k) => k.drawKey());
            keys.forEach((k) => k.checkContact());
        }
        
        pop()

        if (currentRound <= TOTAL_ROUNDS && !gates[currentRound-1].u  && 
            player.position.x > gates[currentRound-1].x - 600 && !finishedAllRounds ) {
                
                if (!passedAllWaves && zombies.length === 0){
                    currRoundStarted = true
                    startNewWave() 

                } else if(passedAllWaves) {
                    //keys[currentRound-2].drawKey()
                    //keys[currentRound-2].checkContact()

                    //passedAllWaves = false
                }
                
            }

        
        if (finishedAllRounds && gates[TOTAL_ROUNDS-1].u) {
            
            
                fill(255, 0, 0)
                textSize(32)
                textAlign(CENTER)
                textFont('Rubik Doodle Shadow')
                text("Press Y To Play For High Score or E To End The Game!", player.position.x, height/2 ) 
            
        } 

        if (playForHighScore) {
            if (zombies.length === 0 ) {
                startNewWave();
   
            }
        }

        // -------------------- --------------------  --------------------
        
        // -------------------- PLAYER ANIMATION & SOUND HANDLING --------------------

        if (endRoundSoundBool) {
            endRoundSound.rate(1.0)
            endRoundSound.play()
            endRoundSoundBool = false
        }

        if (hitSoundBool) {
            hitSound.rate(1.0)
            hitSound.play()
            hitSound.setVolume(0.2)
            hitSoundBool = false
        }

        if (player.velocity.x == 0 && player.velocity.y == 0) {
            player.changeAnimation('LaraStand')
        }

        if (addLifeSoundBool && startGameBool) {
            addLifeSound.rate(1.0)
            addLifeSound.play()
            addLifeSoundBool = false
        }

        if (keyIsDown(81) && teleportationSoundBool && startGameBool) {
            teleportationSound.rate(1.0)
            teleportationSound.play()
            teleportationSoundBool = false; 
        }

        if (keyIsDown(83) && startGameBool) {
            if (pistolShotBool && startGameBool) {
                pistolShotSound.rate(1.0)
                pistolShotSound.setVolume(0.1)
                pistolShotSound.play()
                pistolShotBool = false
            }
            player.changeAnimation('LaraAttack')
        }

        if (keyIsDown(87) && startGameBool && (groundSprites.overlap(player) || onTop)) {
            if (playerJumpBool) {
                playerJumpSound.rate(1.0)
                playerJumpSound.play()
                playerJumpBool = false
            }
            player.velocity.y = JUMP
            player.changeAnimation('LaraJump')
        }

        if (keyIsDown(68) && startGameBool) {
            player.position.x = player.position.x + 5
            camera.position.x = player.position.x + 5
            

            s = 40
            player.mirrorX(1)
            player.changeAnimation('LaraRun')
            
        }
        if (keyIsDown(65) && startGameBool) {
            player.position.x = player.position.x - 5
            camera.position.x = player.position.x - 5
            s = -40
            player.mirrorX(-1)
            player.changeAnimation('LaraRun')   
        }

        if (showPlayerPosBool) {
            textSize(20)
            textFont('Arial')

            text('Player x: ' + player.position.x + ' , ' + 'Player y: ' + player.position.y, player.position.x - 500, 300)
            text('Player Velocity x: ' + player.velocity.x + ' , ' + 'Player Velocity y: ' + player.velocity.y, player.position.x - 500, 330)
            text('----------------', player.position.x - 130, player.position.y)
            text('|\n|\n|', player.position.x, player.position.y - 120)
            text('----------------', player.position.x + 30, player.position.y)
            text('|\n|\n|', player.position.x, player.position.y + 80)
        }
        
        if (lifeCounter === 0) {
            player.changeAnimation('LaraDead')
            if (!playGrizzlyBool) {
                grizzly.rate(1.0)
                grizzly.play()
                playGrizzlyBool = true
            } else {
                if (player.getAnimationLabel() === 'LaraDead' && player.animation.getFrame() === player.animation.getLastFrame()) endGame()
            }
            
        }


        // -------------------- -------------------- --------------------

        drawSprites()

        
    }

}



function keyPressed() {

    if (!startGameBool && keyIsDown(82)) {                     // PRESSED R
        startGameBool = true
    }

    if (finishedAllRounds && keyIsDown(69)) endGame()           // PRESSED E

    if (keyIsDown(73)) {                        // PRESSED I
        GAME_STATE = 'INSTRUCTIONS'
    }

    if (keyIsDown(80)) showPlayerPosBool = !showPlayerPosBool           // PRESSED P
    
    if (keyIsDown(81)) {                                // PRESSED Q
        if (onPortal[0]){
            teleportationSoundBool = true
            player.position.x = onPortal[1]
            player.position.y = onPortal[2]
        }
    }

    if (keyIsDown(83) && startGameBool && !finishedAllRounds) {           //  PRESSED S
        pistolShotBool = true
        let bullet = {
            x: player.position.x + s,
            y: player.position.y,
            s: s
        }
        bullets.push(bullet)
        
    }

    if (keyIsDown(87)) playerJumpBool = true                // PRESSED W
    

    if (keyIsDown(88) && min(killStreak, 10)*15 === 150){           // PRESSED X
        activateSuperpower()
    }

    if (keyIsDown(89) && finishedAllRounds) {           // PRESSED Y
        finishedAllRounds = false
        playForHighScore = true
    }

    if (keyIsDown(101) && finishedAllRounds) {          // PRESSED E
        GAME_STATE = 'END'
        finishedAllRounds = false
        playForHighScore = false
    }
    
    if ( (GAME_STATE === 'SETTINGS' || GAME_STATE === 'INSTRUCTIONS') && keyCode === ESCAPE ) {
        GAME_STATE = 'PLAYING'
        settingsButton.show();
        hideSliders();
        // Unfreezes game
        loop()
        
    }



}

function windowResized() {
    if (windowWidth < width) {
        settingsButton.position(SetButtonX-115, SetButtonY)
        musSlider.position(musSliderPosX-110, musSliderPosY)
        audioSlider.position(audioSliderPosX-110, audioSliderPosY)
    } else {
        settingsButton.position(SetButtonX, SetButtonY)
        musSlider.position(musSliderPosX, musSliderPosY)
        audioSlider.position(audioSliderPosX, audioSliderPosY)
    }
}
