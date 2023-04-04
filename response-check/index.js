const screen = document.querySelector('#screen');
const result = document.querySelector('#result');
const again = document.querySelector('#again');

let startTime, endTime;
const records = [];

let timeoutId;

const showMessage = (message, className) => {
  // TODO: remove, 변수로 변경
  screen.classList = '';
  screen.classList.add(className);
  screen.textContent = message;
};

const startGame = () => {
  // TODO: 위쪽에서 빼줘도? 초 변환하기 쉽게 변경, => 초만 따로, 함수로 빼기
  const delay = Math.floor(Math.random() * 1000) + 2000;
  showMessage('초록색이 되면 클릭하세요', 'ready');
  resetAgainMessage();
  setupGame(delay);
};

const resetAgainMessage = () => {
  again.textContent = '';
};

const setupGame = (delay) => {
  timeoutId = setTimeout(() => {
    startTime = new Date();
    showMessage('클릭하세요!', 'now');
  }, delay);
};

const endGame = () => {
  const currentTime = new Date() - startTime;
  recordTime(currentTime);
  const averageTime = calculatedAverageTime();
  showMessage(`현재 ${currentTime}ms, 평균: ${averageTime}ms`, 'waiting');
  resetTime();
};

const recordTime = (currentTime) => {
  records.push(currentTime);
};

const calculatedAverageTime = () => {
  return records.reduce((a, b) => a + b) / records.length;
};

const resetTime = () => {
  // TODO: 브라우저에서 찾을 수 없을때 undefined이니까, null로 변경하기
  startTime = undefined;
  endTime = undefined;
  showAgainMessage();
};

const showAgainMessage = () => {
  again.textContent = '다시 시작하려면 파란색 화면을 클릭하세요';
};

const cancelGame = () => {
  clearTimeout(timeoutId);
  showMessage('성급하시군요!', 'waiting');
  showAgainMessage();
};

const onClickScreen = () => {
  const isBeforeStart = screen.classList.contains('ready');
  const isReady = screen.classList.contains('waiting');
  const isEnd = screen.classList.contains('now');
  if (isBeforeStart) {
    cancelGame();
  } else if (isReady) {
    startGame();
  } else if (isEnd) {
    endGame();
  }
  // TODO: 메세지 출력?
};

screen.addEventListener('click', onClickScreen);
