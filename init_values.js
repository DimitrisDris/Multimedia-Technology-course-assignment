var groundSprites
var GRAVITY = 0.5
var JUMP = -14
var isGameOver
var beforeEndGame 
var score
var timer
var minPlayAreaX
var maxPlayAreaX

var currentRound 
var TOTAL_ROUNDS
var currentWave
var WAVES
var newWaveStart
var newWaveTime
var GAME_STATE
var runGameBool


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

let bulletImg
let tombstoneImg
let ground

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

var openSettingsButton = false 

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

    ground = loadImage('assets/Tile (2).png')
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
    newWaveStart = true
    runGameBool = false
    //pistolShot = false
    TOTAL_ROUNDS = 2
    score = 0
    player_dir = 1      // Player direction for mirroring
    currentRound = 1
    currentWave = 1
    newWaveTime = millis()

    minPlayAreaX = -500
    maxPlayAreaX = 3500

    groundSprites = new Group()

    settingsButton = createImg('assets/settings.avif')
    settingsButton.position(width, 30)
    settingsButton.size(30, 30)
    settingsButton.mousePressed(buttonPressed)

    createSliders()

    for (var n = -10; n < (width / 50 + 1) - 8; n++) {
        var groundSprite = createSprite(n * 50, height - 25, 50, 50)

        groundSprite.addImage(ground)
        ground.resize(50, 50)

        groundSprites.add(groundSprite)
    }     

    for(let i = 0; i < 1;  i++) {
        portals[i] = new Portal(300, 500, 1.2, tombstoneImg)    }

    for(let i = 0; i < 1;  i++) {
        gates[i] = new Gate(1100, 450, false)
    }

    
    

        // Player sprite and animations 
    player = createSprite(100, 515)
    player.addAnimation('Idle', playerIdle)
    player.addAnimation('Run', playerRun)
    player.addAnimation('Jump', playerJump)
    player.addAnimation('Shoot', playerShoot)
    player.addAnimation('Dead', playerDead)
    player.addAnimation('Lara', laraRun)
    player.scale = 0.25

    for(let i = 1; i <= 2* currentRound;  i++) {
        platforms[i-1] = new Platform(1100-500*i/1.25, player.position.y-130*i, 200, 20)
    }
    

    // Zombies 
    spawnZombies(2)
    /*for(let i = 0; i < 3;  i++) {
        let rand_x = Math.random() * ( (player.position.x + 800) - (player.position.x - 700) ) + (player.position.x - 150)
        //ssslet rand_y = Math.random() * ( 515 - (player.position.y - 00) ) + (player.position.y - 200)
        zombies[i] = new Zombie(rand_x, 515, 0.3, 5, 2, zombie1R, createSprite())
    }*/

    

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
    
    

}

// ----------------------- SETTINGS FUNCTIONS -----------------------

function buttonPressed() {
    GAME_STATE = 'SETTINGS'
    openSettingsButton = !openSettingsButton

    noLoop()
}

function createSliders() {
    musSliderPosX = (width / 2)
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

function startNewWave() {
    newWaveStart = true
    if (currentWave === 3) {
        currentWave = 1;
        currentRound++;
        return;
    } else {
        currentWave++;
        spawnZombies(2*currentWave)
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