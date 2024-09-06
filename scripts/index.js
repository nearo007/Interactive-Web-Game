let score = JSON.parse(localStorage.getItem('score')) ||  {wins: 0, losses: 0, ties: 0};

document.title = 'Pedra Papel Tesoura';

const resultTextElement = document.querySelector('.result-text');
alterInnerHTML(resultTextElement, '...')

const scoreTextElement = document.querySelector('.score-text');

alterInnerHTML(scoreTextElement, `Vitórias: ${score.wins} --- Derrotas: ${score.losses} --- Empates: ${score.ties}`);

let options = JSON.parse(localStorage.getItem('options')) || {background: 0, sound: 0.2};
let isAutoPlaying = false;
let autoPlayTimer;
let autoPlaySpeed = 1;

if (!options.sound) {document.querySelector('.button-sound-toggle').innerHTML = 'SFX: OFF';};

const colorNames = ['Purple', 'Blue', 'Pink', 'Green', 'Yellow', 'RGB'];
document.querySelector('.button-background').innerHTML = colorNames[options.background];
changeBackground();

const rockButton = document.querySelector('.button-rock');
rockButton.addEventListener('click', () => {
    playGame('PEDRA')
    playSound('sound-click1');
});

const paperButton = document.querySelector('.button-paper');
paperButton.addEventListener('click', () => {
    playGame('PAPEL')
    playSound('sound-click1');                
});

const scissorsButton = document.querySelector('.button-scissors');
scissorsButton.addEventListener('click', () => {
    playGame('TESOURA')
    playSound('sound-click1');
});

const resetButton = document.querySelector('.button-reset');
resetButton.addEventListener('click', () => {
    resetScore()
    playSound('sound-click1');
});

const autoPlayButton = document.querySelector('.button-autoplay');
autoPlayButton.addEventListener('click', () => {
    autoPlay()
    playSound('sound-click1');
    if (isAutoPlaying) {
        document.querySelector('.button-autoplay').innerHTML = 'Stop Playing';
    }
    else {
        document.querySelector('.button-autoplay').innerHTML = 'Auto Play';
    }
});

const speedButton = document.querySelector('.button-speed');
speedButton.addEventListener('click', () => {
    changeSpeed()
    playSound('sound-click1');
})

const soundToogleButton = document.querySelector('.button-sound-toggle');
soundToogleButton.addEventListener('click', () => {
    toggleSound();
    playSound('sound-click1');
    localStorage.setItem('options', JSON.stringify(options));
    if (options.sound) {
        document.querySelector('.button-sound-toggle').innerHTML = 'SFX: ON';
    }
    else {
        document.querySelector('.button-sound-toggle').innerHTML = 'SFX: OFF';
    }
});

const backgroundButton = document.querySelector('.button-background');
backgroundButton.addEventListener('click', () => {
    if (options.background !== 5) {
            options.background ++;
    }
    else {
        options.background = 0;
    }
    localStorage.setItem('options', JSON.stringify(options));
    changeBackground();
    playSound('sound-click1');

    document.querySelector('.button-background').innerHTML = colorNames[options.background];
})

document.body.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (event.key === '1') {
        playGame('PEDRA');
        playSound('sound-click1');
    }
    else if (event.key === '2') {
        playGame('PAPEL');
        playSound('sound-click1');
    }
    else if (event.key === '3') {
        playGame('TESOURA');
        playSound('sound-click1');
    }
    else if (event.key === 'Backspace') {
        resetScore();
        playSound('sound-click1');
    }
    else if (event.key === 'Shift') {
        changeSpeed();
        playSound('sound-click1');
    }
    else if (event.key === 'Enter') {
        autoPlay();
        playSound('sound-click1');
        
        if (isAutoPlaying) {
        document.querySelector('.button-autoplay').innerHTML = 'Stop Playing';
        }
        else {
            document.querySelector('.button-autoplay').innerHTML = 'Auto Play';
        }
    }
    else if (event.key === 'b') {
        if (options.background !== 5) {
            options.background ++;
        }
        else {
            options.background = 0;
        }
        localStorage.setItem('options', JSON.stringify(options));
        document.querySelector('.button-background').innerHTML = colorNames[options.background];
        changeBackground();
        playSound('sound-click1');
        
    }
    else if (event.key === 'm') {
        toggleSound();
        playSound('sound-click1');
        localStorage.setItem('options', JSON.stringify(options));
        if (options.sound) {
            document.querySelector('.button-sound-toggle').innerHTML = 'SFX: ON';
        }
        else {
            document.querySelector('.button-sound-toggle').innerHTML = 'SFX: OFF';
        }
    }
});


function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'PEDRA') {
        if (computerMove === 'PEDRA') {
            result = 'Empate!';
        }
        else if (computerMove === 'PAPEL') {
            result = 'Você perdeu!';
        }
        else {
            result = 'Você ganhou!';
        }
    }

    else if (playerMove === 'PAPEL') {
        if (computerMove === 'PEDRA') {
            result = 'Você ganhou!';
        }
        else if (computerMove === 'PAPEL') {
            result = 'Empate!';
        }
        else {
            result = 'Você perdeu!';
        }
    }

    else if (playerMove === 'TESOURA') {
        if (computerMove === 'PEDRA') {
            result = 'Você perdeu!';
        }
        else if (computerMove === 'PAPEL') {
            result = 'Você ganhou!';
        }
        else {
            result = 'Empate!';
        }
    }
    if (result === 'Você ganhou!') {
        score.wins ++;
    }
    else if (result === 'Você perdeu!') {
        score.losses ++;
    }
    else {
        score.ties ++;
    }
    
    if (playerMove === 'PEDRA') {
        playerMove = "<img  class='player-result-icon' src='images/rock-emoji.png'>";
    }
    else if (playerMove === 'PAPEL') {
        playerMove = "<img  class='player-result-icon' src='images/paper-emoji.png'>";
    }
    else {
        playerMove = "<img  class='player-result-icon' src='images/scissors-emoji.png'>";
    }

    if (computerMove === 'PEDRA') {
        computerMove = "<img  class='player-result-icon' src='images/rock-emoji.png'>";
    }
    else if (computerMove === 'PAPEL') {
        computerMove = "<img  class='player-result-icon' src='images/paper-emoji.png'>";
    }
    else {
        computerMove = "<img  class='player-result-icon' src='images/scissors-emoji.png'>";
    }

    document.title = `${result}`;
    localStorage.setItem('score', JSON.stringify(score));
    alterInnerHTML(resultTextElement, `Você: ${playerMove}, Computador: ${computerMove}. ${result}`);
    alterInnerHTML(scoreTextElement, `Vitórias: ${score.wins} / Derrotas: ${score.losses} / Empates: ${score.ties}`);
};

function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'PEDRA';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'PAPEL';
    }
    else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'TESOURA';
    }
    return computerMove;
};
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    
    document.title = 'Pedra Papel Tesoura';
    localStorage.setItem('score', JSON.stringify(score));
    alterInnerHTML(resultTextElement, '...');
    alterInnerHTML(scoreTextElement, `Vitórias: ${score.wins} / Derrotas: ${score.losses} / Empates: ${score.ties}`);
}
function autoPlay() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayTimer = setInterval(function () {
            playGame(pickComputerMove())
            playSound('sound-click1');
        }, (1000 / autoPlaySpeed));
        
    }
    else {
        isAutoPlaying = false;                    
        clearInterval(autoPlayTimer);
    }
}
function changeSpeed() {
    const buttonValue = document.querySelector('.button-speed');
    if (autoPlaySpeed !== 8) {
        autoPlaySpeed *= 2;
        buttonValue.innerHTML = `${autoPlaySpeed}X`;
    }
    else {
        autoPlaySpeed = 1;
        buttonValue.innerHTML = `${autoPlaySpeed}X`;
    }
    if (isAutoPlaying) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(function () {
            playGame(pickComputerMove())
            playSound('sound-click1');
        }, (1000 / autoPlaySpeed));
    }
}

function changeBackground() {
    if (options.background === 0) {
        changeCSS('background-div', 'background-color', 'rgb(87, 0, 130);');
        changeCSS('background-div', 'animation', 'none');
    }
    else if (options.background === 1) {
        changeCSS('background-div', 'background-color', 'rgb(0, 95, 130);');
    }
    else if (options.background === 2) {
        changeCSS('background-div', 'background-color', 'rgb(130, 0, 95);');
    }
    else if (options.background === 3) {
        changeCSS('background-div', 'background-color', 'rgb(52, 130, 0);');
    }
    else if (options.background === 4) {
        changeCSS('background-div', 'background-color', 'rgb(121, 113, 0);');
    }
    else if (options.background === 5) {
        changeCSS('background-div', 'animation', 'rgb-animation 10s linear infinite;');
    }
}

function alterInnerHTML(old_content, new_content) {
    old_content.innerHTML = new_content;
}

function changeCSS(className, property, value) {
    const style = document.createElement('style');
    style.innerHTML = `.${className} { ${property}: ${value}; }`;
    document.head.appendChild(style);
}
function toggleSound() {
    if (options.sound) {
        options.sound = 0;
        document.querySelector('.button-sound-toggle').innerHTML = 'SFX: OFF';
    }
    else {
        options.sound = 0.2;
        document.querySelector('.button-sound-toggle').innerHTML = 'SFX: ON';
    }
}
function playSound(sound) {
    const clickSound = document.getElementById(sound);
    clickSound.volume = options.sound;
    clickSound.currentTime = 0;
    clickSound.play();
}