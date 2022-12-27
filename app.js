document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const rock = document.querySelector(".rock");
  const paper = document.querySelector(".paper");
  const scissors = document.querySelector(".scissors");
  const french = document.querySelector(".french");
  const english = document.querySelector(".english");
  let robotChoiceDisplay = document.querySelector(".robot-choice-display");
  let playerChoiceDisplay = document.querySelector(".player-choice-display");
  let endGameDisplay = document.querySelector(
    ".display-end-game-sentence-box div"
  );

  let language = "english";
  let playerChoice = null;
  let playerChoiceFrench = null;
  const posibleChoices = ["rock", "paper", "scissors"];
  let robotChoice = null;
  let robotChoiceFrench = null;

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
    if (language === "english") {
      const playerChoiceSentence = `you chose ${playerChoice} bruv`;
      playerChoiceDisplay.innerHTML = playerChoiceSentence;
    } else if (language === "french") {
      if (playerChoice === "rock") {
        playerChoiceFrench = "pierre";
      } else if (playerChoice === "paper") {
        playerChoiceFrench = "feuille";
      } else if (playerChoice === "scissors") {
        playerChoiceFrench = "ciseaux";
      }
      const playerChoiceSentence = `t'as choisi ${playerChoiceFrench} mon pote`;
      playerChoiceDisplay.innerHTML = playerChoiceSentence;
    }
  }

  function displayRobotChoice(robotChoice) {
    if (language === "english") {
      const robotChoiceSentence = `I chose ${robotChoice} dawg`;
      robotChoiceDisplay.innerHTML = robotChoiceSentence;
    } else if (language === "french") {
      if (robotChoice === "rock") {
        robotChoiceFrench = "pierre";
      } else if (robotChoice === "paper") {
        robotChoiceFrench = "feuille";
      } else if (robotChoice === "scissors") {
        robotChoiceFrench = "ciseaux";
      }
      const robotChoiceSentence = `J'ai choisi ${robotChoiceFrench} gros`;
      robotChoiceDisplay.innerHTML = robotChoiceSentence;
    }
  }

  function determinWinnerSentence() {
    // count points function
    if (playerChoice === robotChoice) {
      return language === "english"
        ? "it's a draw my man"
        : "égalité la famille";
    } else if (
      (playerChoice === "rock" && robotChoice === "scissors") ||
      (playerChoice === "paper" && robotChoice === "rock") ||
      (playerChoice === "scissors" && robotChoice === "paper")
    ) {
      return language === "english"
        ? "you won congrats I hope you're happy.."
        : "t'as gagné félicitation j'espère que t'es content.e";
    } else if (
      (robotChoice === "rock" && playerChoice === "scissors") ||
      (robotChoice === "paper" && playerChoice === "rock") ||
      (robotChoice === "scissors" && playerChoice === "paper")
    ) {
      return language === "english"
        ? "I won sorry but you're laaame"
        : "J'ai gagné dsl mais t'es naaze";
    }
  }

  function displayEngGameSentence(endGameSentence) {
    endGameDisplay.innerHTML = endGameSentence;
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
    playerChoiceDisplay.innerHTML = null;
    robotChoiceDisplay.innerHTML = null;
    endGameDisplay.innerHTML = null;

    language = "french";
    h1.innerHTML = "Choisie ton arme";
    rock.innerHTML = "Pierre";
    paper.innerHTML = "Feuille";
    scissors.innerHTML = "Ciseaux";
  }

  function translateToEnglish() {
    playerChoiceDisplay.innerHTML = null;
    robotChoiceDisplay.innerHTML = null;
    endGameDisplay.innerHTML = null;

    language = "english";
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
