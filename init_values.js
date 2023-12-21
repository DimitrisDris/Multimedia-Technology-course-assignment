var groundSprites
var GRAVITY = 0.5
var JUMP = -12
var isGameOver
var score

var player
var platforms = new Array()
var zombies = new Array()
var onTop
var zombie
var heart = new Array()
var lifeCounter

var keys = new Array()
var gates = new Array()

var portals = new Array()
var onPortal
let bullets = []
let s = 40

let playerSkin
let playerSkinR

var ROUNDS 


var drops = new Array()
var dropCounter = 0

// Animations
let playerIdle
let playerRun
let playerJump
let playerShoot

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
var volumeSlider
var musSlider 
var mus 
var grizzly
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

    ground = loadImage('assets/Tile (2).png')
    zombie1 = loadImage('assets/zombie1.png')
    zombie1R = loadImage('assets/zombie1R.png')
    backgroundImg = loadImage('assets/BG.png')

    life = loadImage('assets/life.png')
    nolife = loadImage('assets/nolife.png')

    zombieCounter = loadImage('assets/zombieCounter.png')

    gate = loadImage('assets/gate.png')
    openGate = loadImage('assets/openGate.png')
    key = loadImage('assets/key.png')

    

    // Sounds 

    // mus = loadSound('sound/mehican_psy_trance_background.mp3')
    // grizzly = loadSound('sound/grizzly_scream.mp3')
}

function startGame() {



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

    player = createSprite(100, 500)
    player.addAnimation('Idle', playerIdle)
    player.addAnimation('Run', playerRun)
    player.addAnimation('Jump', playerJump)
    player.addAnimation('Shoot', playerShoot)
    player.scale = 0.25
    
    /*player.addImage(playerSkin)
    playerSkin.resize(0, 110)
    playerSkinR.resize(0, 110)*/


    for(let i = 0; i < 10;  i++) {
        platforms[i] = new Platform(-300*i, 100*i, 200, 20)
    }

    for(let i = 0; i < 1;  i++) {
        zombies[i] = new Zombie(300, 515, 5, 2, createSprite())
    }

    for(let i = 0; i < 1;  i++) {
        portals[i] = new Portal(300, 500, 500, 500)
    }

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
    for(let i = 0; i < 1;  i++) {
        gates[i] = new Gate(1300, 450, false)
    }

}

function buttonPressed() {
    openSettingsButton = !openSettingsButton

    noLoop()
}

function createSliders() {
    musSlider = createSlider(0, 1, 0.5, 0.01);           // Arguments: min, max, default, step
    musSlider.position( (width / 4) + 20, (height / 7) + 20 );

    musSlider.input( () => {
        mus.setVolume(musSlider.value())
    })

    musSlider.hide();
}

function showSliders() {
    if (musSlider) {
        musSlider.show()
    }
}

function hideSliders() {
    // Hide sliders if they exist
    if (musSlider) {
        musSlider.hide();
    }
}