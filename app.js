document.addEventListener("DOMContentLoaded", () => {
  const rock = document.querySelector(".rock");
  const paper = document.querySelector(".paper");
  const scissors = document.querySelector(".scissors");

  let playerChoice = null;
  const posibleChoices = ["rock", "paper", "scissors"];
  let robotChoice = null;

  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  function robotChoosing() {
    robotChoice =
      posibleChoices[Math.floor(Math.random() * posibleChoices.length)];
    return robotChoice;
  }

  function displayPlayerChoice(playerChoice) {
    const playerChoiceDisplay = `you chose ${playerChoice} bruv`;
    document.querySelector(".player-choice-display").innerHTML =
      playerChoiceDisplay;
  }

  function displayRobotChoice(robotChoice) {
    const robotChoiceDisplay = `I chose ${robotChoice} dawg`;
    document.querySelector(".robot-choice-display").innerHTML =
      robotChoiceDisplay;
  }

  function determinWinnerSentence() {
    // count points function
    if (playerChoice === robotChoice) {
      return "it's a draw my man";
    } else if (
      (playerChoice === "rock" && robotChoice === "scissors") ||
      (playerChoice === "paper" && robotChoice === "rock") ||
      (playerChoice === "scissors" && robotChoice === "paper")
    ) {
      return "you won congrats I hope you're happy..";
    } else if (
      (robotChoice === "rock" && playerChoice === "scissors") ||
      (robotChoice === "paper" && playerChoice === "rock") ||
      (robotChoice === "scissors" && playerChoice === "paper")
    ) {
      return "I won sorry but you're laaame";
    }
  }

  function displayEngGameSentence(endGameSentence) {
    console.log(endGameSentence);
    document.querySelector(".display-end-game-sentence-box div").innerHTML =
      endGameSentence;
  }

  async function rockPlayedHandler() {
    playerChoice = "rock";
    initiateGameSequence();
  }

  async function paperPlayedHandler() {
    playerChoice = "paper";
    initiateGameSequence();
  }

  async function scissorsPlayedHandler() {
    playerChoice = "scissors";
    initiateGameSequence();
  }

  async function initiateGameSequence() {
    displayPlayerChoice(playerChoice);
    await delay(700);
    displayRobotChoice(robotChoosing());
    const endGameSentence = determinWinnerSentence();
    await delay(700);
    displayEngGameSentence(endGameSentence);
  }

  rock.addEventListener("click", rockPlayedHandler);
  paper.addEventListener("click", paperPlayedHandler);
  scissors.addEventListener("click", scissorsPlayedHandler);
});
