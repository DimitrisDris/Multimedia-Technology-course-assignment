var groundSprites
var lavaGif
var GRAVITY = 0.5
var JUMP = -14
var isGameOver
var beforeEndGame 
var score
var timer

var killStreak
var currentLives
var superPowerActiveBool
var superPowerMeter
var superPowerMeterFullBool
var activateSuperpowerBool

var minPlayAreaX
var maxPlayAreaX
var lastZombiePosX

var currentRound 
var TOTAL_ROUNDS
var finishedAllRounds
var playForHighScore
var showKeyBool

var currentWave
var WAVES
var newWaveStart
var newWaveTime
var currWaveFinished
var waveText
var highScoreWaveBool

var GAME_STATE
var passedAllWaves
var currRoundStarted
var startGameBool
var startGameClock
var chooseEnd
var chooseEndClock
var waveTimeout

var lavaPools = new Array()
var platforms = new Array()
var zombies = new Array()
var onTop
var zombie
var heart = new Array()
var lifeCounter
var zombieAttackTime1 = 0
var zombieAttackTime2 = 1

var keys = new Array()
var gates = new Array()

//var portalGroup = new Group()
var portals = new Array()
var onPortal
let bullets = []
let s = 40

let playerSkin
let playerSkinR

var xk
var drops = new Array()
var dropCounter = 0

// PLAYER STUFF
var player
var player_dir
let playerIdle
let playerRun
let playerJump
let playerShoot
let playerDead
let showPlayerPosBool

let laraRun
let laraStand
let laraJump
let laraAttack
let laraDead

let bulletImg
let tombstoneImg
let ground
let arrowSignImg
let skeletonImg
let treeImg
let stopImg
let bush1Img
let bush2Img
let deadBushImg
let signImg
let crossTombstoneImg

let zombie1
let zombie1R

let life
let nolife
let gate
let openGate
let key
var backgroundImg
var teleportationPortalImg

// Sounds
var audioSlider
var audioSliderPosX
var audioSliderPosY

var musSlider 
var musSliderPosX
var musSliderPosY
var mus 
var keySound

var grizzly
var playGrizzlyBool

var addLifeSound
var addLifeSoundBool

var superPowerSound

var heartPickSound
var heartPickSoundBool

var teleportationSound
var teleportationSoundBool

var pistolShotSound
var pistolShotBool // boolean for the sound file

var playerRunSound
var playerRunBool // boolean for the player run sound

var playerJumpSound
var playerJumpBool  // boolean for the player jump sound

var openGateSound
var openGateBool // boolean for the open gate sound

var settingsButton
var settingsImg
var SetButtonX
var SetButtonY

function preload() {
    // playerSkin = loadImage('assets/p-skin.png')
    // playerSkinR = loadImage('assets/p-skinR.png')

    playerIdle = loadAnimation('assets/adventure_girl/Idle (1).png',
     'assets/adventure_girl/Idle (2).png',
     'assets/adventure_girl/Idle (3).png',
     'assets/adventure_girl/Idle (4).png',
     'assets/adventure_girl/Idle (5).png',
     'assets/adventure_girl/Idle (6).png',
     'assets/adventure_girl/Idle (7).png',
     'assets/adventure_girl/Idle (8).png',
     'assets/adventure_girl/Idle (9).png',
     'assets/adventure_girl/Idle (10).png'
    )

    playerRun = loadAnimation('assets/adventure_girl/Run (1).png',
     'assets/adventure_girl/Run (2).png',
     'assets/adventure_girl/Run (3).png',
     'assets/adventure_girl/Run (4).png',
     'assets/adventure_girl/Run (5).png',
     'assets/adventure_girl/Run (6).png',
     'assets/adventure_girl/Run (7).png',
     'assets/adventure_girl/Run (8).png'
    )

    playerJump = loadAnimation('assets/adventure_girl/Jump (1).png',
     'assets/adventure_girl/Jump (2).png',
     'assets/adventure_girl/Jump (3).png',
     'assets/adventure_girl/Jump (4).png',
     'assets/adventure_girl/Jump (5).png',
     'assets/adventure_girl/Jump (6).png',
     'assets/adventure_girl/Jump (7).png',
     'assets/adventure_girl/Jump (8).png',
     'assets/adventure_girl/Jump (9).png',
     'assets/adventure_girl/Jump (10).png'
    )

    playerShoot = loadAnimation('assets/adventure_girl/Shoot (1).png',
     'assets/adventure_girl/Shoot (2).png',
     'assets/adventure_girl/Shoot (3).png'
    )

    playerDead = loadAnimation('assets/adventure_girl/Dead (1).png',
        'assets/adventure_girl/Dead (2).png',
        'assets/adventure_girl/Dead (3).png',
        'assets/adventure_girl/Dead (4).png',
        'assets/adventure_girl/Dead (5).png',
        'assets/adventure_girl/Dead (6).png',
        'assets/adventure_girl/Dead (7).png',
        'assets/adventure_girl/Dead (8).png',
        'assets/adventure_girl/Dead (9).png',
        'assets/adventure_girl/Dead (10).png'
    )

    laraRun = loadAnimation('assets/laracrop/run1.png',
        'assets/laracrop/run2.png',
        'assets/laracrop/run3.png',
        'assets/laracrop/run4.png',
        'assets/laracrop/run5.png',
        'assets/laracrop/run6.png',
        'assets/laracrop/run7.png',
        'assets/laracrop/run8.png'
    )

    laraJump = loadAnimation('assets/laracrop/jump1.png',
        'assets/laracrop/jump2.png',
        'assets/laracrop/jump3.png',
        'assets/laracrop/jump4.png',
        'assets/laracrop/jump5.png',
        'assets/laracrop/jump6.png',
        'assets/laracrop/jump7.png'
    )

    laraStand = loadAnimation('assets/laracrop/stand1.png',
        'assets/laracrop/stand2.png',
        'assets/laracrop/stand3.png',
        'assets/laracrop/stand4.png',
        'assets/laracrop/stand5.png'
    )

    laraAttack = loadAnimation('assets/laracrop/attack1.png',
        'assets/laracrop/attack2.png',
        'assets/laracrop/attack3.png',
        'assets/laracrop/attack4.png',
        'assets/laracrop/attack5.png'
    )

    laraDead = loadAnimation('assets/laracrop/dmg1.png',
    'assets/laracrop/dmg2.png',
    'assets/laracrop/dmg3.png',
    'assets/laracrop/dmg4.png',
    'assets/laracrop/dmg5.png',
    'assets/laracrop/dmg6.png',
    'assets/laracrop/dmg7.png',
    'assets/laracrop/dmg8.png',
    'assets/laracrop/dmg9.png',
    'assets/laracrop/dmg10.png'
)

    
    //zombie1 = loadImage('assets/zombie1.png')
    zombie1R = loadImage('assets/zombie1R.png')
    backgroundImg = loadImage('assets/BG.png')

    life = loadImage('assets/life.png')
    nolife = loadImage('assets/nolife.png')

    zombieCounter = loadImage('assets/zombieCounter.png')

    gate = loadImage('assets/gate.png')
    openGate = loadImage('assets/openGate.png')
    key = loadImage('assets/key.png')
    bulletImg = loadImage('assets/Bullet.png')

    ground = loadImage('assets/Tile (2).png')
    treeImg = loadImage('assets/Tree.png')
    skeletonImg = loadImage('assets/Skeleton.png')
    arrowSignImg = loadImage('assets/ArrowSign.png')
    tombstoneImg = loadImage('assets/TombStone (1).png')
    settingsImg = loadImage('assets/settings.avif')
    stopImg = loadImage('assets/stop.png')
    bush1Img = loadImage('assets/Bush1.png')
    bush2Img = loadImage('assets/Bush (2).png')
    deadBushImg = loadImage('assets/DeadBush.png')
    signImg = loadImage('assets/Sign.png')
    crossTombstoneImg = loadImage('assets/crossTombstone.png')
    teleportationPortalImg = loadImage('assets/telep_portal.png')
    lavaGif = loadImage('assets/lava.gif')

    // Sounds 

    // mus = loadSound('sound/mehican_psy_trance_background.mp3')
    grizzly = loadSound('sound/grizzly_scream.mp3')
    keySound = loadSound('sound/512137__beezlefm__key-sound.wav')
    pistolShotSound = loadSound('sound/266916__coolguy244e__gun-shotbullet-hit.mp3')
    playerRunSound = loadSound('sound/422994__dkiller2204__sfxrunground3.wav')
    playerJumpSound = loadSound('sound/527524__jerimee__retro-super-jump.wav')
    openGateSound = loadSound('sound/683434__saha213131__door-open.mp3')
    superPowerSound = loadSound('sound/368651__jofae__game-powerup.mp3')
    teleportationSound = loadSound('sound/580062__pelicanicious__whoosh-pew.wav')
    addLifeSound = loadSound('sound/563465__nicholasdaryl__itempickup.wav')
}

function startGame() {

    GAME_STATE = 'PLAYING'
    isGameOver = false
    startGameBool = false
    startGameClock = millis()

    // -------------------- Game logic booleans --------------------
    showPlayerPosBool = false
    passedAllWaves = false
    newWaveStart = false
    currRoundStarted = false
    finishedAllRounds = false
    showKeyBool = false
    activateSuperpowerBool = false
    highScoreWaveBool = false
    playGrizzlyBool = false
    // -------------------- --------------------  --------------------

    TOTAL_ROUNDS = 5
    score = 0
    player_dir = 1      // Player direction for mirroring
    currentRound = 1
    currentWave = 1
    killStreak = 0
    lifeCounter = 10
    currentLives = 10

    newWaveTime = millis()

    minPlayAreaX = -500
    maxPlayAreaX = 3500

    groundSprites = new Group()

  

    for(let i = 0; i < 1;  i++) {
        portals[i] = new Portal(300, 505, 500, 497, 0.23, teleportationPortalImg)    
    }

    for(let i = 0; i < TOTAL_ROUNDS;  i++) {
        gates[i] = new Gate(2000*(i+1), 460, false)
    }

        // Player sprite and animations 
    player = createSprite(100, 515)
    /*player.addAnimation('Idle', playerIdle)
    player.addAnimation('Run', playerRun)
    player.addAnimation('Jump', playerJump)
    player.addAnimation('Shoot', playerShoot)
    player.addAnimation('Dead', playerDead)*/
    player.addAnimation('LaraStand', laraStand)
    player.addAnimation('LaraRun', laraRun)
    player.addAnimation('LaraJump', laraJump)
    player.addAnimation('LaraAttack', laraAttack)
    player.addAnimation('LaraDead', laraDead)
    player.scale = 1.8

    for (var n = -10; n < (width / 50 + 1) - 8; n++) {
        var groundSprite = createSprite(n * 50, height - 25, 50, 50)

        groundSprite.addImage(ground)
        ground.resize(50, 50)

        groundSprites.add(groundSprite)
    }   

    createSettingsButton()
    createSliders()

    createPlatforms()

    for(let i = 0; i < 10; i++) {
        heart[i] = createSprite()
        heart[i].addImage(life)
    }
    life.resize(0, 30)
    nolife.resize(0, 30)
    

    zombieCounter.resize(0, 70)

    for(let i = 0; i < TOTAL_ROUNDS;  i++) {
        keys[i] = new Key(gates[i].x-200, 460, false)
    }

    createLavaPools()

    // for(let i = 0; i < 5;  i++) {
        //var l = new Lava(200, 550, 4)
        //lavaPools.push(l)
    // }

        
}

function displayStartScreen() {
    stroke(0)              // To start game
    fill(255, 0, 0)
    textSize(35)
    textAlign(CENTER)
    textFont('Rubik Doodle Shadow')
    text("Press SPACE To Start!", player.position.x, height/2 - 100) 

    fill(255, 0, 0)
    textSize(35)
    textAlign(CENTER)
    textFont('Rubik Doodle Shadow')
    text("Call Of Duty Zombies (The platform edition)", player.position.x, height/2 - 20) 

    fill(255)
    textSize(25)
    textAlign(CENTER)
    textFont('Rubik Doodle Shadow')
    text("Created by Dimitris Drys, Giannis Mpoympalis, Giorgos Vlachos", player.position.x, height/2 + 75) 

    fill(255, 0, 0)
    textSize(35)
    textAlign(CENTER)
    textFont('Rubik Doodle Shadow')
    text("Press I For Instructions!", player.position.x, height/2 + 140) 
}

function createPlatforms() {
    
    //platforms[0] = new Platform(gates[0].x - 1200, player.position.y-130*1, 180, 20)
  
    platforms[0] = new Platform(gates[0].x - 500, player.position.y-130*1, 200, 20)
    platforms[1] = new Platform(gates[0].x - 900, player.position.y-130*2, 230, 20)
    platforms[2] = new Platform(gates[0].x - 1200, player.position.y-130*1, 180, 20)
    platforms[3] = new Platform(gates[1].x - 1300, player.position.y-130*1., 200, 20)
    platforms[4] = new Platform(gates[1].x - 920, player.position.y-110*2, 260, 20)
    platforms[5] = new Platform(gates[1].x - 520, player.position.y-110*1, 180, 20)
    platforms[6] = new Platform(gates[2].x - 1120, player.position.y-110*1.5, 150, 20)
    platforms[7] = new Platform(gates[2].x - 720, player.position.y-110*2.5, 260, 20)
}

function createLavaPools() {
    lavaPools[0] = new Lava(gates[1].x-1100, 550, 6)
    lavaPools[1] = new Lava(gates[2].x-1160, 550, 9)
}

function drawObjects() {

    // --------------------- BEFORE ROUND 1 ---------------------
    image(treeImg, -1000, 505-250, 230, 300)
    image(deadBushImg, -1150, 505-30, 100, 80)
    image(skeletonImg, -1015, 505+10, 80, 40)
    image(deadBushImg, -865, 505-35, 100, 80)
    image(stopImg, -620, 505-130, 120, 180)
    // --------------------- END BEFORE ROUND 1 ---------------------

    // --------------------- ROUND 1 ---------------------
    

    image(arrowSignImg, gates[0].x-200, 505-30, 80, 80)
    image(deadBushImg, gates[0].x-1650, 505-35, 100, 80)
    image(signImg, gates[0].x-1490, 505-50, 80, 100)
    image(treeImg, gates[0].x-1450, 515-320, 270+10, 370)
    image(bush1Img, gates[0].x-1050, 505-5, 80, 50)
    image(deadBushImg, gates[0].x-700, 505-35, 100, 80)
    image(crossTombstoneImg, gates[0].x-730, 505-50, 70, 100)
    image(treeImg, gates[0].x-700, 515-280, 230, 330)
    image(skeletonImg, gates[0].x-480, 505+10, 80, 40)
    // --------------------- END ROUND 1 ---------------------
    
    // --------------------- ROUND 2 --------------------- 
    image(arrowSignImg, gates[1].x-200, 505-30, 80, 80)
    image(deadBushImg, gates[1].x-1650, 505-35, 100, 80)
    image(bush2Img, gates[1].x-1460, 505-5, 80, 50)
    image(bush2Img, gates[1].x-1270, 505-5, 80, 50)
    image(treeImg, gates[1].x-1450, 515-320, 270, 370)
    //image(bush1Img, gates[1].x-1050, 505-5, 80, 50)
    image(deadBushImg, gates[1].x-700, 505-35, 100, 80)
    image(crossTombstoneImg, gates[1].x-730, 505-50, 70, 100)
    image(treeImg, gates[1].x-700, 515-280, 230, 330)
    image(skeletonImg, gates[1].x-480, 505+10, 80, 40)
    // --------------------- END ROUND 2 ---------------------

    // --------------------- ROUND 3 ---------------------  // tha mporousame na pai3oyme edw ena teleport sto psilo platform apo tin de3ia meria
    image(arrowSignImg, gates[2].x-200, 505-30, 80, 80)
    image(deadBushImg, gates[2].x-1650, 505-35, 100, 80)
    image(bush2Img, gates[2].x-1430, 505-5, 80, 50)
    image(bush2Img, gates[2].x-1270, 505-5, 80, 50)
    image(treeImg, gates[2].x-1450, 515-300, 250, 350)
    image(bush1Img, gates[2].x-1050, 505-5, 80, 50)
    image(treeImg, gates[2].x-1070, 515-350, 300, 400)
    
    image(deadBushImg, gates[2].x-700, 505-35, 100, 80)
    //image(crossTombstoneImg, gates[2].x-730, 505-50, 70, 100)
    image(treeImg, gates[2].x-700, 515-280, 230, 330)
    image(tombstoneImg, gates[2].x-480, 505-25, 80, 80)
    image(deadBushImg, gates[2].x-390, 505-35, 100, 80)
    // --------------------- END ROUND 3 ---------------------

    // --------------------- ROUND 4 --------------------- 
    image(arrowSignImg, gates[3].x-200, 505-30, 80, 80)
    image(deadBushImg, gates[3].x-1650, 505-35, 100, 80)
    image(bush2Img, gates[3].x-1460, 505-5, 80, 50)
    image(bush2Img, gates[3].x-1270, 505-5, 80, 50)
    image(treeImg, gates[3].x-1450, 515-320, 270, 370)
    image(bush1Img, gates[3].x-1050, 505-5, 80, 50)
    image(deadBushImg, gates[3].x-700, 505-35, 100, 80)
    image(crossTombstoneImg, gates[3].x-730, 505-50, 70, 100)
    image(treeImg, gates[3].x-700, 515-280, 230, 330)
    image(skeletonImg, gates[3].x-480, 505+10, 80, 40)
    // --------------------- END ROUND 4 ---------------------

    // --------------------- ROUND 5 --------------------- 
    image(arrowSignImg, gates[4].x-200, 505-30, 80, 80)
    image(deadBushImg, gates[4].x-1650, 505-35, 100, 80)
    image(bush2Img, gates[4].x-1460, 505-5, 80, 50)
    image(bush2Img, gates[4].x-1270, 505-5, 80, 50)
    image(treeImg, gates[4].x-1450, 515-320, 270, 370)
    image(bush1Img, gates[4].x-1050, 505-5, 80, 50)
    image(deadBushImg, gates[4].x-700, 505-35, 100, 80)
    image(crossTombstoneImg, gates[4].x-730, 505-50, 70, 100)
    image(treeImg, gates[4].x-700, 515-280, 230, 330)
    image(skeletonImg, gates[4].x-480, 505+10, 80, 40)
    // --------------------- END ROUND 5 ---------------------


    
}

// ----------------------- SETTINGS FUNCTIONS -----------------------

function createSettingsButton() {

    SetButtonX = 1375
    SetButtonY = 23
    console.log('width: '+width)
    console.log('height: '+height)

    settingsButton = createImg('assets/settings.avif')

    settingsButton.position(SetButtonX, SetButtonY)
    settingsButton.size(30, 30)
    settingsButton.mousePressed(buttonPressed)
    
}

function buttonPressed() {
    GAME_STATE = 'SETTINGS'

    noLoop()
}

function createSliders() {
    musSliderPosX = (width / 2)
    musSliderPosY = (height / 3.5) + 70
    musSlider = createSlider(0, 1, 0.4, 0.01);           // Arguments: min, max, default, step
    musSlider.position( musSliderPosX, musSliderPosY );
    musSlider.input( () => {
        mus.setVolume(musSlider.value())
    })
    musSlider.size(200)
    

    audioSliderPosX = (width / 2)
    audioSliderPosY = (height / 2) + 120
    audioSlider = createSlider(0, 1, 0.2, 0.01)
    audioSlider.position( audioSliderPosX, audioSliderPosY )
    audioSlider.input( () => {
        addLifeSound.setVolume(audioSlider.value())
        teleportationSound.setVolume(audioSlider.value())
        superPowerSound.setVolume(audioSlider.value())
        grizzly.setVolume(audioSlider.value())
        keySound.setVolume(audioSlider.value())
        pistolShotSound.setVolume(audioSlider.value())
        playerJumpSound.setVolume(audioSlider.value())
        openGateSound.setVolume(audioSlider.value())
    })
    audioSlider.size(200)

    hideSliders()
}

function settingsDescription() {
    fill(255, 0, 0)
    textSize(55)
    textFont('Rubik Doodle Shadow')
    text("Settings", camera.position.x - 140, musSliderPosY - 150 )

    fill(255, 0, 0)
    textSize(50)
    textFont('Rubik Doodle Shadow')
    text("Music Volume", camera.position.x - 190, musSliderPosY - 55 )

    fill(255, 0, 0)
    textSize(50)
    textFont('Rubik Doodle Shadow')
    text("Audio Volume", camera.position.x - 180, audioSliderPosY - 55)

    fill(120, 255, 200)
    textSize(35)
    textFont('Rubik Doodle Shadow')
    text("Press ESC to resume!", camera.position.x - 200, audioSliderPosY + 110 )
}

function instructionsDescription() {
    fill(255, 0, 0)
    textSize(55)
    textFont('Rubik Doodle Shadow')
    text("Instructions", camera.position.x - 190, musSliderPosY - 150 )

    let Y = musSliderPosY - 90
    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press W to Jump", camera.position.x - 135, Y)

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press A to move Left", camera.position.x - 169, Y + 1*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press 'D' to move Right", camera.position.x - 177, Y + 2*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press 'S' to Shot", camera.position.x - 135, Y + 3*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press 'X' to Enable Superpower (15s of double damage)", camera.position.x - 400, Y + 4*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press 'Q' to teleport when in front of graves", camera.position.x - 330, Y + 5*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press 'I' for Instructions", camera.position.x - 190, Y + 6*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press 'P' to (un)show stats for Nerds", camera.position.x - 287.5, Y + 7*45 )

    fill(120, 255, 200)
    textSize(35)
    textFont('Rubik Doodle Shadow')
    text("Press 'ESC' to resume!", camera.position.x - 200, Y + 390 )
}

function showSliders() {
    if (musSlider) musSlider.show()

    if (audioSlider) audioSlider.show()
}

function hideSliders() {
    // Hide sliders if they exist
    if (musSlider) musSlider.hide();

    if (audioSlider) audioSlider.hide()
}

// ----------------------- END OF SETTINGS FUNCTIONS -----------------------

function startNewWave(currRound) {
    // WHEN THE HIGH SCORE GAME MODE IS NOT REACHED YET
    if (!playForHighScore) {                    
        waveText = true
        newWaveStart = true
        if (currentWave === 4) {
            console.log('in')
            showKeyBool = true
            currentWave = 1;
            passedAllWaves = true
    
            currentRound++;
            if (currentRound === TOTAL_ROUNDS + 1) {
                finishedAllRounds = true
                currentRound = TOTAL_ROUNDS
            }
    
            console.log('new round: ' + currentRound)
            currRoundStarted = false
        } else {
            if (!finishedAllRounds) {           
                spawnZombies(1*currentWave)
                currentWave++;
            }
            
        }
    } else {
        //setTimeout(spawnZombies, 2000)
        spawnZombies(1*currentWave)
    }
    
       
}


function spawnZombies(numZombies) {
    
    newWaveTime = millis()
    for(let i = 0; i < numZombies;  i++) {
        let randNum = getRandomNonZeroInRange(-350, 350)
        if (randNum > gates[currentRound-1].x) randNum = gates[currentRound-1].x
        zombies[i] = new Zombie(player.position.x + randNum, 515, 0.3, 5, 2, zombie1R, createSprite())
    }
 
}

function checkKillstreak() {
    if (currentLives > lifeCounter) {           // Resets the killStreak if needed
        killStreak = 0
        currentLives = lifeCounter
    }  
}

function displaySuperPower() {
    fill(255, 0, 0)
    textSize(25)
    textFont('Rubik Doodle Shadow')
    text("Killstreak : "+killStreak, camera.position.x + 430, camera.position.y - 230)

    let rectX = camera.position.x + 437
    let rectY = camera.position.y - 210
    let rectWidth = 150
    let rectHeight = 10
    let borderWidth = 2

    // Draw borders around the rectangle
    stroke(0)
    strokeWeight(borderWidth)

    // Top border
    line(rectX - borderWidth / 2, rectY - borderWidth / 2, rectX + rectWidth + borderWidth / 2, rectY - borderWidth / 2)
    // Right border
    line(rectX + rectWidth + borderWidth / 2, rectY - borderWidth / 2, rectX + rectWidth + borderWidth / 2, rectY + rectHeight + borderWidth / 2)
    // Bottom border
    line(rectX - borderWidth / 2, rectY + rectHeight + borderWidth / 2, rectX + rectWidth + borderWidth / 2, rectY + rectHeight + borderWidth / 2)
    // Left border
    line(rectX - borderWidth / 2, rectY - borderWidth / 2, rectX - borderWidth / 2, rectY + rectHeight + borderWidth / 2)

    fill(255, 0, 0)
    rect(rectX, rectY, min(killStreak*15, rectWidth), rectHeight);

    fill(255, 0, 0)
    textSize(16)
    textFont('Rubik Doodle Shadow')
    text("Superpower meter", camera.position.x + 436, camera.position.y - 175)

    if (superPowerActiveBool) {
        fill(255)
        textSize(16)
        textFont('Rubik Doodle Shadow')
        text("Superpower ACTIVE!", camera.position.x + 430, camera.position.y - 150)
    }

}

function activateSuperpower() {
    superPowerSound.rate(1.0)
    superPowerSound.play()

    superPowerActiveBool = true
    killStreak -= 10


    setTimeout(deactivateSuperPower, 15000)
}

function deactivateSuperPower() {
    superPowerActiveBool = false
}

function getRandomNonZeroInRange(min, max) {
    let randomNumber = 0;

    // Keep generating a random number until it is non-zero
    while (randomNumber === 0) {
        let randomSign = (Math.random() > 0.5) ? 1 : -1;
        randomNumber = randomSign * (Math.floor(Math.random() * 200) + 350);
    }

    return randomNumber;
}

function highScoreWave() {

}

function displayEndScreen() {
    fill(255, 0, 0)
    textAlign(CENTER)
    
    textFont('Rubik Doodle Shadow')
    image(zombieCounter, camera.position.x-50, camera.position.y - 280)
    zombieCounter.resize(120, 120)

    textSize(55)
    text('GAME OVER', camera.position.x, camera.position.y - 80)
    textSize(35)
    text('You killed: ' + score + ' zombies', camera.position.x, camera.position.y + 20)
    
    text('Refresh the page to restart!', camera.position.x, camera.position.y+210)
}

function endGame() {
    //grizzly.play()
    console.log(heart)
    GAME_STATE = 'END'
    isGameOver = true
}