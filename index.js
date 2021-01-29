const MAX_COUNT_PAIRS = 6;
const values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

let isCardOpen = false;
let flag = false;
let firstCard, secondCard, countPairs;
const gameContainer = document.querySelector('.game');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(values);

values.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    const imgFront = document.createElement('img');
    const imgBack = document.createElement('img');
    imgFront.src = './img/js-badge.svg';
    imgBack.src = `./img/${value}.svg`
    imgBack.classList.add('back-face');
    imgFront.classList.add('front-face');
    card.appendChild(imgBack);
    card.appendChild(imgFront);
    card.value = value;
    card.addEventListener('click', onCardClick)
    gameContainer.appendChild(card);
});


function onCardClick () {
    if (flag) {
        return;
    }
    if (this === firstCard) {
        return;
    }
    this.classList.add('flip'); 
    if(!isCardOpen) {             
        isCardOpen = true;
        firstCard = this;
        return;
    }
    secondCard = this;           
    isCardOpen = false;
    checkCards();                  
};

function checkCards () {   
    if (firstCard.value === secondCard.value) {
        countPairs++;
        disableCards();
        return;
    }
    closeCards();
};

function disableCards () {
    firstCard.removeEventListener('click', onCardClick);
    secondCard.removeEventListener(`click`, onCardClick);
    if (countPairs === MAX_COUNT_PAIRS) {
        alert('Вы победили!');
    }
};

function closeCards () {
    flag = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        reset();
    }, 500)
    

};

function reset () {
    flag = false;
    firstCard = null;
    secondCard = null;
    isCardOpen = false;
}
