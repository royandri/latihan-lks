let data = {
    field: document.getElementById("lks-box-game-canvas"),
    ball:  document.getElementById("lks-ball-object"),
    halangan: document.getElementById("lks-halangan-object"),
    halangan_img: document.getElementById("lks-img-halangan"),
    ball_img: document.getElementById("lks-img-ball-object"),
    restart: document.getElementById("lks-game-over-control"),
    start: document.getElementById("lks-start-button"),
    score: document.getElementById("lks-score"),
    high_score: document.getElementById("lks-high-score"),
    jump: document.getElementById("lks-jump-control"),
    canvas: document.getElementById("lks-game-canvas")
}

let isJump = true;
let startCount = 0;
let score = 0;
let highScore = 0;
let speed = 3;
let animationSpeed = 13;
let tempSpeed = 50;
const setMarginHalangan = 900;
const setHalangan = ["halangan-1.png", "halangan-2.png", "halangan-3.png"];
const setBallImg = './assets/img/bola.png';
const showRestart = 'none';
const showStart = 'block';
const showJump = 'none';
const animationStart = 'paused';
const mousClickAudio = new Audio ('./assets/sounds/sfx_mouse_click-2.wav');
const jumpClickAudio = new Audio ('./assets/sounds/sfx_wing.wav');
const pointAudio = new Audio ('./assets/sounds/sfx_point.wav');
const dieAudio = new Audio ('./assets/sounds/sfx_hit.wav');


let emojiAdventure = {
    init: () => {
        score = 0;
        speed = 3;
        tempSpeed = 50;
        animationSpeed = 13;
        data.ball.style.bottom = '-73px';
        data.ball_img.src = setBallImg;
        data.halangan.style.marginLeft = setMarginHalangan + 'px';
        data.restart.style.display = showRestart;
        data.start.style.display = showStart;
        data.halangan.style.display = 'none';
        data.jump.style.display = 'none';
        data.score.innerHTML = score;
        data.canvas.style.animationPlayState = animationStart;
        data.canvas.style.animationDuration = animationSpeed + 's';
    },
    
    startGame: () => {
        data.start.style.display = 'none';
        data.jump.style.display = 'block';
        data.canvas.style.animationPlayState = 'running';
        startCount += 1;
        var marginhalangan = parseInt(data.halangan.style.marginLeft);

        setInterval(() => {
            if(marginhalangan < 880) {
                data.halangan.style.display = 'block';
            }else {
                data.halangan.style.display = 'none';
                
            }

            if(score == tempSpeed) {
                speed+=1;
                tempSpeed *= 2;
                animationSpeed -= 1;
            }

            if(marginhalangan > -20){
                marginhalangan -= speed;
                data.halangan.style.marginLeft = marginhalangan + 'px';
                data.canvas.style.animationDuration = animationSpeed + 's';
            }

            if(marginhalangan <= -20){
                pointAudio.play();
                score +=10;
                marginhalangan = setMarginHalangan;
                data.halangan_img.src = './assets/img/' +setHalangan[Math.floor(Math.random() * setHalangan.length)];
                data.score.innerHTML = score;
            }

            emojiAdventure.crash();
        }, 15);
    },

    crash: () => {
        let marginhalangan = parseInt(data.halangan.style.marginLeft);
        let marginarea = parseInt(data.ball.style.top);

        if((marginhalangan <= 100 && marginhalangan > 50) && (marginarea > 150 || isNaN(marginarea))) {
            emojiAdventure.end();
            data.ball_img.src = './assets/img/game-over.png';
            data.restart.style.display = 'block';
            data.start.style.display = 'none';
            document.getElementById("lks-box-high-score").style.display = 'block';
            data.jump.style.display = 'none';
            data.canvas.style.animationPlayState = animationStart;

            if(score > highScore) {
                highScore = score;  
            } 

            data.high_score.innerHTML = highScore;
            dieAudio.play();
        }
    },

    end: () => {  
        for (let index = 0; index <= startCount; index++) {
            clearInterval(index);
        }
    },

    makeEaseOut : (timing) => {
        return function(timeFraction) {
            return 1 - timing(1 - timeFraction);
        }
    },

    bounce : (timeFraction) => {    
        for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
            }
        }
    },

    async animate(options) {
        return new Promise((resolve, reject) => {
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                var timeFraction = (time - start) / options.duration;
                if (timeFraction > 1) timeFraction = 1;
                var progress = options.timing(timeFraction)

              
                options.draw(progress);
          
                if (timeFraction < 0.36) {
                    requestAnimationFrame(animate);
                }else {
                    emojiAdventure.endJump();
                }
            });
            resolve();
        })
    },

    startJump: () => {
        if(isJump) {
            jumpClickAudio.play();
            emojiAdventure.endJump();
            let to = data.field.clientHeight - data.ball.clientHeight;
            emojiAdventure.animate({
                duration: 2500,
                timing: emojiAdventure.makeEaseOut(emojiAdventure.bounce),
                draw(progress) {
                    data.ball.style.top = ((to * progress)+73) + 'px';
                }
            });
        }
    },

    endJump: () => {
        isJump = !isJump;
    },

    playSound: (sound) => {
        return new Promise((resolve, reject) => {
            sound.play();
            resolve();
        })
    },
    
}

document.getElementById("lks-jump-control").addEventListener('click', () => {
    emojiAdventure.startJump();
})

document.getElementById("lks-start-button").addEventListener('click', () => {
    emojiAdventure.playSound(mousClickAudio).then(() => {
        emojiAdventure.startGame();
    })
})

document.getElementById("lks-restart-button").addEventListener('click', () => {
    emojiAdventure.playSound(mousClickAudio).then(() => {
        emojiAdventure.init();
    })
})

document.addEventListener("DOMContentLoaded", (e) => {
    emojiAdventure.init();
    
});

