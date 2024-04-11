'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';

utils.print('Welcome');

const time = utils.select('.time');
const term = utils.select('.bx-word');
const textInput = utils.select('.text-input');
const txtBox = utils.select('#txt-box');
const startBtn = utils.select('.start');
const resetBtn = utils.select('.reset');
const noOfHits = utils.select('.hits');
const message = utils.select('.message');
const h3 = utils.select('h3');
const scoreBoard = utils.select('.high-score-dlg');
const ulContent = utils.select('.ul-content');


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
let timer = 10;/* change later */

function updateTime() {

    time.innerHTML = `${timer}s`;

    if(timer > 0) {
        timer--;
    } else if(timer === 0) {
        BgSound.pause();
        textInput.style.visibility = 'hidden';
        addHits(hits, new Date().toLocaleDateString());
        if(highScores.length > 0){
            updateScores();
            scoreBoard.style.visibility = 'visible';
        }
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

    txtBox.disabled = false;
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
        }, 1500);
    } else {
        return false;
    };
    //console.log(e.target.value);
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
        'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 
        'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 
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
    //updateScores();
});


/* highscore */

/* change scoreboard visibility in updatescores */

/* Window.onload = function() {
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    updateScores();
    //scoreBoard.style.visibility = 'visible';
}; */

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function scoreObj(hits, date) {
    return {
        hits: hits,
        date: date,

        getHits: function() {
            return this.hits;
        },
        getDate: function() {
            return this.date;
        }
    };
}

function addHits(hits, date) {
    let score = scoreObj(hits, date);
    if(highScores.length === 0 || hits > highScores[highScores.length - 1].hits) {
        highScores.unshift(score);
        highScores.splice(9);
        highScores.sort((a,b) => b.hits - a.hits);
        
    }
    //updateScores();
}

localStorage.setItem('highScores', JSON.stringify(highScores));

function scoreBoardItem(score, index) {
    const li = utils.create('li');
    li.className = 'li-items';

    const rankSpan = utils.create('span');
    rankSpan.className = 'rank';
    rankSpan.innerText = `#${index + 1}`;
    li.appendChild(rankSpan);

    const hitsSpan = utils.create('span');
    hitsSpan.className = 'hits';
    hitsSpan.innerText = score.hits;
    li.appendChild(hitsSpan);

    const dateSpan = utils.create('span');
    dateSpan.className = 'date';
    dateSpan.innerText = score.date;
    li.appendChild(dateSpan);

    return li;
}

function updateScores() {
    ulContent.innerHTML = '';

    if(highScores.length === 0) {
        const scoreMsg = utils.create('p');
        ulContent.appendChild(scoreMsg);
    } else {
        highScores.forEach(function(score, index) {
            const scBdItem = scoreBoardItem(score, index);
            ulContent.appendChild(scBdItem);
            scoreBoard.style.visibility = 'visible';
        });
    }
}

