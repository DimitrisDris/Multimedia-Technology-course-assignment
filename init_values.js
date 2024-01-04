var groundSprites
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

var minPlayAreaX
var maxPlayAreaX

var currentRound 
var TOTAL_ROUNDS
var finishedAllRounds
var playForHighScore

var currentWave
var WAVES
var newWaveStart
var newWaveTime
var currWaveFinished
var waveText

var GAME_STATE
var passedAllWaves
var currRoundStarted
var startGameBool
var startGameClock
var chooseEnd
var chooseEndClock
var waveTimeout

var platforms = new Array()
var zombies = new Array()
var onTop
var zombie
var heart = new Array()
var lifeCounter

var keys = new Array()
var gates = new Array()

//var portalGroup = new Group()
var portals = new Array()
var onPortal
let bullets = []
let s = 40

let playerSkin
let playerSkinR


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

let laraRun
let laraStand
let laraJump
let laraAttack

let bulletImg
let tombstoneImg
let ground
let arrowSignImg
let skeletonImg
let tree

let zombie1
let zombie1R

let life
let nolife
let gate
let openGate
let key
var backgroundImg

// Sounds
var audioSlider
var audioSliderPosX
var audioSliderPosY

var musSlider 
var musSliderPosX
var musSliderPosY
var mus 
var grizzly
var keySound

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

    laraRun = loadAnimation('assets/lara_run/lara run/run1.png',
        'assets/lara_run/lara run/run2.png',
        'assets/lara_run/lara run/run3.png',
        'assets/lara_run/lara run/run4.png',
        'assets/lara_run/lara run/run5.png',
        'assets/lara_run/lara run/run6.png',
        'assets/lara_run/lara run/run7.png',
        'assets/lara_run/lara run/run8.png'
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

    ground = loadImage('assets/Tile (2).png')
    tree = loadImage('assets/Tree.png')
    skeletonImg = loadImage('assets/Skeleton.png')
    arrowSignImg = loadImage('assets/ArrowSign.png')
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
    tombstoneImg = loadImage('assets/TombStone (1).png')
    settingsImg = loadImage('assets/settings.avif')
    

    // Sounds 

    // mus = loadSound('sound/mehican_psy_trance_background.mp3')
    grizzly = loadSound('sound/grizzly_scream.mp3')
    keySound = loadSound('sound/512137__beezlefm__key-sound.wav')
    pistolShotSound = loadSound('sound/266916__coolguy244e__gun-shotbullet-hit.mp3')
    playerRunSound = loadSound('sound/422994__dkiller2204__sfxrunground3.wav')
    playerJumpSound = loadSound('sound/527524__jerimee__retro-super-jump.wav')
    openGateSound = loadSound('sound/683434__saha213131__door-open.mp3')
    //playerFireSound = loadSound('sound/520279__hisoul__kali-fire-scream_1.wav')
}

function startGame() {

    GAME_STATE = 'PLAYING'
    isGameOver = false
    startGameBool = false
    startGameClock = millis()

    // -------------------- Game logic booleans --------------------
    passedAllWaves = false
    newWaveStart = false
    currRoundStarted = false
    finishedAllRounds = false
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


    for (var n = -10; n < (width / 50 + 1) - 8; n++) {
        var groundSprite = createSprite(n * 50, height - 25, 50, 50)

        groundSprite.addImage(ground)
        ground.resize(50, 50)

        groundSprites.add(groundSprite)
    }     

    for(let i = 0; i < 1;  i++) {
        portals[i] = new Portal(300, 500, 1.2, tombstoneImg)    }

    for(let i = 0; i < TOTAL_ROUNDS;  i++) {
        gates[i] = new Gate(1200*(i+1), 450, false)
    }

        // Player sprite and animations 
    player = createSprite(100, 515)
    player.addAnimation('Idle', playerIdle)
    player.addAnimation('Run', playerRun)
    player.addAnimation('Jump', playerJump)
    player.addAnimation('Shoot', playerShoot)
    player.addAnimation('Dead', playerDead)
    player.addAnimation('LaraStand', laraStand)
    player.addAnimation('LaraRun', laraRun)
    player.addAnimation('LaraJump', laraJump)
    player.addAnimation('LaraAttack', laraAttack)
    player.scale = 0.25

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
        keys[i] = new Key(gates[i].x-200, 450, false)
    }

}

function drawObjects() {
    //image(tree, gates[1].x-700, 515-90, 120, 150)
}

function createPlatforms() {
    //platforms[i-1] = new Platform(1100*currentRound-500*i/1.25, player.position.y-130*i, 200, 20)
    platforms[0] = new Platform(gates[0].x - 500, player.position.y-130*1, 200, 22)
    platforms[1] = new Platform(gates[0].x - 900, player.position.y-130*2, 200, 22)
    platforms[2] = new Platform(gates[1].x - 600, player.position.y-130*1.5, 320, 22)
    platforms[3] = new Platform(gates[2].x - 520, player.position.y-110*1.8, 320, 22)
    platforms[4] = new Platform(gates[3].x - 520, player.position.y-110*1.8, 320, 22)
    platforms[5] = new Platform(gates[4].x - 520, player.position.y-110*1.8, 320, 22)
}

// ----------------------- SETTINGS FUNCTIONS -----------------------

function createSettingsButton() {
    //let buttonX = constrain(1200, 1200, 1200)

    //let buttonX = constrain(camera.position.x+600, camera.position.x+600, camera.position.x+600)
    //let buttonY = constrain(camera.position.y+20, camera.position.y+20, camera.position.y+20)
    let buttonX = 100
    let buttonY = 630
    console.log('width: '+width)
    console.log('height: '+height)
    //settingsButton = createButton('Settings')
    settingsButton = createImg('assets/settings.avif')
    //settingsButton.position(player.position.x + 500, buttonY)
    settingsButton.position(buttonX, buttonY)
    settingsButton.size(30, 30)
    settingsButton.mousePressed(buttonPressed)
    /*/settingsButton.style('position', 'absolute')
    //imgButton.style('position', 'absolute');
    settingsButton.style('left', buttonX + 'px');
    settingsButton.style('top', buttonY + 'px');*/
}

function buttonPressed() {
    GAME_STATE = 'SETTINGS'

    noLoop()
}

function createSliders() {
    musSliderPosX = (player.position.x + 100)
    musSliderPosY = (height / 3.5) + 70
    musSlider = createSlider(0, 1, 0.5, 0.01);           // Arguments: min, max, default, step
    musSlider.position( musSliderPosX, musSliderPosY );
    musSlider.input( () => {
        mus.setVolume(musSlider.value())
    })
    musSlider.size(200)
    

    audioSliderPosX = (width / 2)
    audioSliderPosY = (height / 2) + 120
    audioSlider = createSlider(0, 1, 0.5, 0.01)
    audioSlider.position( audioSliderPosX, audioSliderPosY )
    audioSlider.input( () => {
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
    text("Press D to move Right", camera.position.x - 177, Y + 2*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press S to Shot", camera.position.x - 135, Y + 3*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press Q to teleport when in front of graves", camera.position.x - 330, Y + 4*45 )

    fill(255, 0, 0)
    textSize(30)
    textFont('Rubik Doodle Shadow')
    text("Press I for Instructions", camera.position.x - 190, Y + 5*45 )

    fill(120, 255, 200)
    textSize(35)
    textFont('Rubik Doodle Shadow')
    text("Press ESC to resume!", camera.position.x - 200, Y + 380 )
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
                spawnZombies(1)
                currentWave++;
            }
            
           // console.log('current round: '+ currentRound)
        }
    } else {
       // spawnZombies(1*currRound)
        spawnZombies(1)
    }
    
       
}


function spawnZombies(numZombies) {
    newWaveTime = millis()

    let spawnArea = 500
    let spawnX = player.position.x + random(-spawnArea / 2, spawnArea / 2)
    let spawnY = player.position.y + random(-spawnArea / 2, spawnArea / 2)
    
    for(let i = 0; i < numZombies;  i++) {
        let rand_x = Math.random() * ( (player.position.x + 500) - (player.position.x - 700) ) + (player.position.x - 500)
        //ssslet rand_y = Math.random() * ( 515 - (player.position.y - 00) ) + (player.position.y - 200)
        zombies[i] = new Zombie(rand_x, 515, 0.3, 5, 2, zombie1R, createSprite())
    }

}

function checkKillstreak() {
    if (currentLives > lifeCounter) {           // Resets the killStreak if needed
        killStreak = 0
        currentLives = lifeCounter
    }
    
}

function displaySuperPower() {

}