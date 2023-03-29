export class RSP {
  constructor() {
    this.$computer = document.querySelector("#computer");
    this.$score = document.querySelector("#score");
    this.$rock = document.querySelector("#rock");
    this.$scissors = document.querySelector("#scissors");
    this.$paper = document.querySelector("#paper");
    this.IMG_URL = "./rsp.png";
    this.rspX = {
      scissors: "0", // 가위
      rock: "-220px", // 바위
      paper: "-440px", // 보
    };
    this.scoreTable = {
      rock: 0,
      scissors: 1,
      paper: -1,
    };
    this.score = 0;
    this.clickable = true;
    this.intervalId = setInterval(this.changeComputerHand.bind(this), 50);
    [this.$rock, this.$scissors, this.$paper].forEach($btn => {
      $btn.addEventListener("click", this.clickButton.bind(this));
    });
    this.init();
  }

  init() {
    this.$computer.style.background = `url(${this.IMG_URL}) -464px 0`;
    this.$computer.style.backgroundSize = "auto 200px";
    this.updateScore("게임 시작!");
  }

  changeComputerHand() {
    if (this.clickable) {
      if (this.computerChoice === "rock") {
        this.computerChoice = "scissors";
      } else if (this.computerChoice === "scissors") {
        this.computerChoice = "paper";
      } else if (this.computerChoice === "paper") {
        this.computerChoice = "rock";
      }
      this.$computer.style.background = `url(${this.IMG_URL}) ${
        this.rspX[this.computerChoice]
      } 0`;
      this.$computer.style.backgroundSize = "auto 200px";
    }
  }

  updateScore(message) {
    this.$score.textContent = `${message} 총: ${this.score}점`;
  }

  clickButton(event) {
    if (this.clickable) {
      clearInterval(this.intervalId);
      this.clickable = false;
      const myChoice =
        event.target.textContent === "바위"
          ? "rock"
          : event.target.textContent === "가위"
          ? "scissors"
          : "paper";
      const myScore = this.scoreTable[myChoice];
      const computerScore = this.scoreTable[this.computerChoice];
      const diff = myScore - computerScore;
      let message;
      if ([2, -1].includes(diff)) {
        this.score += 1;
        message = "승리";
      } else if ([-2, 1].includes(diff)) {
        this.score -= 1;
        message = "패배";
      } else {
        message = "무승부";
      }
      this.updateScore(message);
      setTimeout(() => {
        this.clickable = true;
        this.intervalId = setInterval(this.changeComputerHand.bind(this), 50);
      }, 1000);
    }
  }
}
