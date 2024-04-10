'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';

utils.print('Welcome');

const time = utils.select('.time');
const term = utils.select('.bx-word');
const textInput = utils.select('.text-input');
const txtBox = utils.select('.txt-box');
const startBtn = utils.select('.start');
const resetBtn = utils.select('.reset');
const noOfHits = utils.select('.hits');
const message = utils.select('.message');
const h3 = utils.select('h3');


const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfume', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window', 'population'];

const BgSound = new Audio("./assets/audio/background_music.mp3");
BgSound.type = 'audio/mp3';
BgSound.volume = 0.4;
const hitSound = new Audio("./assets/audio/click.mp3");
hitSound.type = 'audio/mp3';
hitSound.volume = 0.3;

let hits = 0;
let timer = 10;
let gameRunning = false;

function updateTime() {

    time.innerHTML = `${timer}s`;

    if(timer > 0) {
        timer--
    } else if(timer === 0) {
        BgSound.pause();
        textInput.style.visibility = 'hidden';
    }
}

let randomWord = ' ';

function getRandomWord() {
    let selectedWord = words[Math.floor(Math.random() * words.length)];

    const removeIndex = words.indexOf(selectedWord);

    if (removeIndex !== -1) {
        words.splice(removeIndex, 1);
    }
    return selectedWord;
}

function displayRandomWord() {
    randomWord = getRandomWord();
    term.innerHTML = randomWord;
}

utils.listen('click', startBtn, () => {

    setInterval(updateTime, 1000);
    textInput.style.visibility = 'visible';
    BgSound.play();
    BgSound.loop = true;
    setTimeout(() => {
        txtBox.focus();
    }, 0);
    term.style.fontFamily = 'monospace';
    displayRandomWord();
    resetBtn.style.visibility = 'visible';
    startBtn.style.visibility = 'hidden';
    h3.style.marginLeft = '140px';
});

utils.listen('input', txtBox, e => {
    const text = e.target.value;

    if (text === term.innerText) {
        hitSound.play();
        hits++;
        noOfHits.innerHTML = `${hits}`;
        displayRandomWord();
        message.style.visibility = 'visible';
        setTimeout(() => {
            message.style.visibility = 'hidden'; 
        }, 1000);
    } else {
        return false;
    };
    console.log(e.target.value);
    e.target.value = '';
    updateTime();
});

utils.listen('click', resetBtn, () => {
    hits = 0;
    timer = 10;

    words.splice(0, words.length);
    words.push(
        'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
        'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
        'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
        'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
        'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
        'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 
        'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 
        'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 
        'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 
        'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 
        'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 
        'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 
        'planet', 'software', 'update', 'yellow', 'keyboard', 'window', 'population'
    );
    displayRandomWord();
    txtBox.value = '';
    textInput.style.visibility = 'visible';
    BgSound.play();
    BgSound.currentTime = 0;
    noOfHits.innerHTML = `${hits}`;
    time.innerHTML = '--';
    setTimeout(() => {
    txtBox.focus();
    }, 0);
});


