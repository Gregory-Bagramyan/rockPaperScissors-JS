document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const rock = document.querySelector(".rock");
  const paper = document.querySelector(".paper");
  const scissors = document.querySelector(".scissors");
  const french = document.querySelector(".french");
  const english = document.querySelector(".english");

  const language = "english";
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

  function translateToFrench() {
    h1.innerHTML = "Choisie ton arme";
    rock.innerHTML = "Pierre";
    paper.innerHTML = "Feuille";
    scissors.innerHTML = "Ciseaux";
  }

  function translateToEnglish() {
    h1.innerHTML = "Choose your weapon";
    rock.innerHTML = "Rock";
    paper.innerHTML = "Paper";
    scissors.innerHTML = "Scissors";
  }

  rock.addEventListener("click", rockPlayedHandler);
  paper.addEventListener("click", paperPlayedHandler);
  scissors.addEventListener("click", scissorsPlayedHandler);
  french.addEventListener("click", translateToFrench);
  english.addEventListener("click", translateToEnglish);
});
