
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
            stroke(0)              // To start game
            fill(255, 0, 0)
            textSize(35)
            textAlign(CENTER)
            textFont('Rubik Doodle Shadow')
            text("Press SPACE To Start!", player.position.x, height/2 - 80) 

            fill(255, 0, 0)
            textSize(35)
            textAlign(CENTER)
            textFont('Rubik Doodle Shadow')
            text("Press I For Instructions!", player.position.x, height/2 + 80) 
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

            fill(255, 0, 0)
            textSize(25)
            textFont('Rubik Doodle Shadow')
            text("Killstreak : "+killStreak, camera.position.x + 430, camera.position.y - 240)

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
                text("Wave "+(currentWave-1), player.position.x - 90, 230) 
                
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


        if (groundSprites.overlap(player)) {
            player.velocity.y = 0
            // player.position.y = height - 110
            player.position.y = height - 95
        }

        // -------------------- -------------------- --------------------

        // -------------------- GRAPHICS --------------------
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
            circle(b.x , b.y - 25, 8)

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

        // -------------------- -------------------- --------------------

        // -------------------- GAME LOGIC (ROUNDS) --------------------

        checkKillstreak()
        push()
        keys.forEach((k) => k.drawKey());
        keys.forEach((k) => k.checkContact());
        pop()
        /*if (showKeyBool) {
            push()
            keys[currentRound-2].drawKey()
            keys[currentRound-2].checkContact()
            
            pop()       
        }*/
        

        if (currentRound <= TOTAL_ROUNDS && !gates[currentRound-1].u  && 
            player.position.x > gates[currentRound-1].x - 600 ) {
                
                if (!passedAllWaves && zombies.length === 0){
                    console.log('currRound: '+currentRound+'cond: '+gates[currentRound-1].passedWaves)
                    currRoundStarted = true
                    startNewWave(currentRound) 

                    /*if (zombies.length === 1 && currentWave + 2 === 3) {
                        xk = zombies[0].a.position.x
                        keys[currentRound - 1] = new Key(zombies[0].a.position.x, 450, false)
                    }*/

                } else if(passedAllWaves) passedAllWaves = false
                
            }
            
        if (finishedAllRounds) {
            
            fill(255, 0, 0)
            textSize(32)
            textAlign(CENTER)
            textFont('Rubik Doodle Shadow')
            text("Press Y To Play For High Score or E To End The Game!", player.position.x, height/2 ) 
        }

        if (playForHighScore) {
            if (zombies.length === 0) {
                
                startNewWave(currentRound);
                
            }
        }

        // -------------------- --------------------  --------------------
        
        // -------------------- PLAYER ANIMATION HANDLING --------------------

        if (player.velocity.x == 0 && player.velocity.y == 0) {
            // player.changeAnimation('Idle')
            player.changeAnimation('LaraStand')
        }

        if (keyIsDown(83) && startGameBool && !finishedAllRounds) {
            if (pistolShotBool && startGameBool) {
                //pistolShotSound.setVolume(0.1)
                pistolShotSound.rate(1.0)
                pistolShotSound.play()
                pistolShotBool = false
            }
            //playerFireSound.play()
            // player.changeAnimation('Shoot')
            player.changeAnimation('LaraAttack')
        }

        if (keyIsDown(87) && startGameBool && !finishedAllRounds && (groundSprites.overlap(player) || onTop)) {
            if (playerJumpBool) {
                //playerJumpSound.setVolume(0.1)
                playerJumpSound.rate(1.0)
                playerJumpSound.play()
                playerJumpBool = false
            }
            player.velocity.y = JUMP
            // player.changeAnimation('Jump')
            player.changeAnimation('LaraJump')
        }
        if (keyIsDown(68) && startGameBool && !finishedAllRounds) {
            player.position.x = player.position.x + 5
            camera.position.x = player.position.x + 5
            

            s = 40
            player.mirrorX(1)
            // player.changeAnimation('Run')
            player.changeAnimation('LaraRun')
            
        }
        if (keyIsDown(65) && startGameBool && !finishedAllRounds) {
            player.position.x = player.position.x - 5
            camera.position.x = player.position.x - 5
            s = -40
            player.mirrorX(-1)
            // player.changeAnimation('Run')        
            player.changeAnimation('LaraRun')   
            //pop()
        }

        if (showPlayerPosBool) {
            textFont('Arial')
            textSize(20)
    
            text(player.position.x + ' , ' + player.position.y, player.position.x - 100, 300)
            text(player.velocity.x + ' , ' + player.velocity.y, player.position.x - 100, 330)
            text('----------------', player.position.x - 130, player.position.y)
            text('|\n|\n|', player.position.x, player.position.y - 150)
            text('----------------', player.position.x + 30, player.position.y)
            text('|\n|\n|', player.position.x, player.position.y + 80)
        }
        
        if (lifeCounter === 0) {
            //removeSprites(heart)
            //player.changeAnimation('Dead')
            player.changeAnimation('LaraDead')
            
            if (player.getAnimationLabel() === 'LaraDead' && player.animation.getFrame() === player.animation.getLastFrame()) endGame()
            
        }

        // -------------------- -------------------- --------------------

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

    if (keyIsDown(83) && startGameBool && !finishedAllRounds) {
        pistolShotBool = true
        let bullet = {
            x: player.position.x + s,
            y: player.position.y,
            s: s
        }
        bullets.push(bullet)
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

    if (keyIsDown(73)) {
        GAME_STATE = 'INSTRUCTIONS'
    }

    if (keyIsDown(87)) {
        playerJumpBool = true
    }

    if (keyIsDown(80)) showPlayerPosBool = !showPlayerPosBool

    if (keyIsDown(32)) {
       
        console.log('olala')
        
        textSize(20)
        textFont('Arial')
        text(player.position.x + ' , ' + player.position.y, player.position.x - 100, 300)
        text(player.velocity.x + ' , ' + player.velocity.y, player.position.x - 100, 330)
        text('----------------', player.position.x - 130, player.position.y)
        text('|\n|\n|', player.position.x, player.position.y - 150)
        text('----------------', player.position.x + 30, player.position.y)
        text('|\n|\n|', player.position.x, player.position.y + 80)
        
    }

    if (!startGameBool && keyIsDown(32)) {
        startGameBool = true
    }

    if ( (GAME_STATE === 'SETTINGS' || GAME_STATE === 'INSTRUCTIONS') && keyCode === ESCAPE ) {
        GAME_STATE = 'PLAYING'
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
    GAME_STATE = 'END'
    isGameOver = true
}

function windowResized() {
    

}
