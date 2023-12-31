'use strict';

// variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const btnRollPl1 = document.querySelector('.btn--roll.player--0');
const btnRollPl2 = document.querySelector('.btn--roll.player--1');
const btnHoldPl1 = document.querySelector('.btn--hold.player--0');
const btnHoldPl2 = document.querySelector('.btn--hold.player--1');

// Starting Conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let isPlaying = true;

const switchPlayer = function () {
  // Switch Active Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  btnRollPl1.classList.toggle('hidden');
  btnRollPl2.classList.toggle('hidden');
  btnHoldPl1.classList.toggle('hidden');
  btnHoldPl2.classList.toggle('hidden');
};

// Dynamic Selecting
const currentScoreActivePlayer = document.querySelector(
  `#current--${activePlayer}`
);

//Implementing Logic OF Game

const roolingHandler = () => {
  if (isPlaying) {
    // Generating Random Dice Roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(typeof dice);

    // DIsplaying Dice image
    diceEl.classList.remove('hidden');

    // Check for the dice rolled = 1 if true then SwitchPlayer else add the rolled dice value in currentScore

    if (dice != 1) {
      currentScore += dice;

      // Dynamic Selecting
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Set currentScore to Zero
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      //Switch activePlayer
      switchPlayer();
    }

    //Displaying the rolled dice image
    diceEl.src = `/assets/images/dice-${dice}.png`;
  }
};

// 1. Rolling Dice Functionality
btnRollPl1.addEventListener('click', roolingHandler);
btnRollPl2.addEventListener('click', roolingHandler);

const holdHandler = () => {
  if (isPlaying) {
    // add currentScore to Global score of active Player
    score[activePlayer] += currentScore;

    // Set currentScore to Zero
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    //Displaying Global score of active player
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // console.log(`score--${activePlayer}`)

    //Check if Global Score >=100 then set isPlaying to false and declare that player Winner
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      isPlaying = false;
      diceEl.classList.add('hidden');
    }

    //Else Switch Active Player
    else {
      switchPlayer();
    }
  }
};

// hold button --> currentScore to global score & switching active player
btnHoldPl1.addEventListener('click', holdHandler);
btnHoldPl2.addEventListener('click', holdHandler);

//Resetting Global Scores & currentScores, removing winner & active class and adding active class to player one
btnNew.addEventListener('click', function () {
  //Resetting Scores
  score = [0, 0];

  //Resetting currentScores
  currentScore = 0;

  //Displaying Global Score & currentScore To zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  // removing winner & active class and adding active class to player one
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  btnRollPl1.classList.remove('hidden');
  btnHoldPl1.classList.remove('hidden');
  btnRollPl2.classList.add('hidden');
  btnHoldPl2.classList.add('hidden');

  //setting player 1 to active and isPlaying to true
  activePlayer = 0;
  isPlaying = true;

  diceEl.classList.add('hidden');
});

// Modal Functionality

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelector('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = function () {
  console.log('clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  console.log('clicked');
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const btnOpenModal = document.querySelectorAll('.show-modal');

// for (let i = 0; i < btnOpenModal.length; i++) {

//     btnOpenModal[i].addEventListener('click', openModal)
//     btnCloseModal.addEventListener('click', closeModal)
//     overlay.addEventListener('click', closeModal)
//     console.log(i);

// }
