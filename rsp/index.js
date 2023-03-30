// import RockScissorsPaper from "./RockScissorsPaper.js";

// const rsp = new RockScissorsPaper();
// console.log("rsp", rsp);

const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');

const HAND_POSITIONS = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
};
let computerChoice = 'scissors';
let intervalId;

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const changeComputerHand = () => {
  switch (computerChoice) {
    case 'rock':
      computerChoice = 'scissors';
      break;
    case 'scissors':
      computerChoice = 'paper';
      break;
    case 'paper':
      computerChoice = 'rock';
      break;
    default:
      break;
  }
  $computer.style.backgroundPositionX = HAND_POSITIONS[computerChoice];
};

const updateScore = (message, score) => {
  $score.textContent = `${message} 총: ${score}점`;
};

const resetInterval = () => {
  intervalId = setInterval(changeComputerHand, 50);
};
const onClickRSP = (event) => {
  if (!intervalId) {
    return;
  }
  stopInterval();

  const myChoice = event.target.id;
  const {score, message} = getScoreAndMessage(myChoice);
  updateResult(score, message);
};

const stopInterval = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const updateResult = (scores, message) => {
  updateScore(message, score);
  setTimeout(resetInterval, 1000);
};

const getScoreAndMessage = () => {
  const myChoice = event.target.id;
  const myScore = scoreTable[myChoice];
  const computerScore = scoreTable[computerChoice];
  const diff = myScore - computerScore;
  if ([2, -1].includes(diff)) {
    score += 1;
    message = '승리';
  } else if ([-2, 1].includes(diff)) {
    score -= 1;
    message = '패배';
  } else {
    message = '무승부';
  }
  return {score, message};
};
let score = 0;

resetInterval();
const buttons = [$rock, $scissors, $paper];

buttons.forEach((button) => {
  button.addEventListener('click', onClickRSP);
});
