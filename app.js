import { InsertData, insertBtn } from "./db.js";

document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const rock = document.querySelector(".rock");
  const paper = document.querySelector(".paper");
  const scissors = document.querySelector(".scissors");
  const playerOptionsBox = document.querySelector(".player-selection");
  const playerOptions = document.querySelectorAll(".player-selection li");
  const french = document.querySelector(".french");
  const english = document.querySelector(".english");
  const robotChoiceDisplay = document.querySelector(".robot-choice-display");
  const playerChoiceDisplay = document.querySelector(".player-choice-display");
  const endGameDisplay = document.querySelector(
    ".display-end-game-sentence-box div"
  );
  const playerScoreDisplay = document.querySelector(".display-player-score");
  const robotScoreDisplay = document.querySelector(".display-robot-score");

  let language = "english";
  let playerChoice = null;
  let playerChoiceFrench = null;
  const posibleChoices = ["rock", "paper", "scissors"];
  let robotChoice = null;
  let robotChoiceFrench = null;
  let roundWinner = null;
  let playerPoints = 0;
  let robotPoints = 0;
  let totalScore = 0;
  let playerDisplayScoreSentence = "Player's Score for the round";
  let robotDisplayScoreSentence = "Robots' Score for the round";

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

  function determinWinner() {
    if (playerChoice === robotChoice) {
      roundWinner = "draw";
    } else if (
      (playerChoice === "rock" && robotChoice === "scissors") ||
      (playerChoice === "paper" && robotChoice === "rock") ||
      (playerChoice === "scissors" && robotChoice === "paper")
    ) {
      roundWinner = "player";
    } else if (
      (robotChoice === "rock" && playerChoice === "scissors") ||
      (robotChoice === "paper" && playerChoice === "rock") ||
      (robotChoice === "scissors" && playerChoice === "paper")
    ) {
      roundWinner = "robot";
    }
  }

  function countPoints() {
    if (roundWinner === "player") {
      playerPoints += 1;
    } else if (roundWinner === "robot") {
      robotPoints += 1;
    }
  }

  function determinWinnerSentence() {
    // count points function
    if (roundWinner === "draw") {
      return language === "english"
        ? "it's a draw my man"
        : "égalité la famille";
    } else if (roundWinner === "player") {
      return language === "english"
        ? "you won congrats I hope you're happy.."
        : "t'as gagné félicitation j'espère que t'es content.e";
    } else if (roundWinner === "robot") {
      return language === "english"
        ? "I won sorry but you're laaame"
        : "J'ai gagné dsl mais t'es naaze";
    }
  }

  function displayScores() {
    playerScoreDisplay.innerHTML = `${playerDisplayScoreSentence}: ${playerPoints}`;
    robotScoreDisplay.innerHTML = `${robotDisplayScoreSentence}: ${robotPoints}`;
  }

  function displayEngGameSentence(endGameSentence) {
    endGameDisplay.innerHTML = endGameSentence;
  }

  function rockPlayedHandler() {
    playerChoice = "rock";
    initiateGameSequence();
  }

  function paperPlayedHandler() {
    playerChoice = "paper";
    initiateGameSequence();
  }

  function scissorsPlayedHandler() {
    playerChoice = "scissors";
    initiateGameSequence();
  }

  async function initiateGameSequence() {
    disableClicks();
    removeDisplays();
    await delay(200);
    displayPlayerChoice(playerChoice);
    await delay(700);
    displayRobotChoice(robotChoosing());
    determinWinner();
    countPoints();
    const endGameSentence = determinWinnerSentence();
    await delay(700);
    displayEngGameSentence(endGameSentence);
    await delay(700);
    displayScores();
    checkTotalScore();
    enableClicks();
  }

  function translateToFrench() {
    removeDisplays();

    language = "french";
    h1.innerHTML = "Choisie ton arme";
    rock.innerHTML = "Pierre";
    paper.innerHTML = "Feuille";
    scissors.innerHTML = "Ciseaux";
    playerDisplayScoreSentence = "Score du joueur pour le round";
    robotDisplayScoreSentence = "Score du robot pour le round";
    playerScoreDisplay.innerHTML = `${playerDisplayScoreSentence}: ${playerPoints}`;
    robotScoreDisplay.innerHTML = `${robotDisplayScoreSentence}: ${robotPoints}`;
  }

  function translateToEnglish() {
    disableClicks();
    language = "english";
    h1.innerHTML = "Choose your weapon";
    rock.innerHTML = "Rock";
    paper.innerHTML = "Paper";
    scissors.innerHTML = "Scissors";
    playerDisplayScoreSentence = "Player's Score For The Round";
    robotDisplayScoreSentence = "Robots' Score For The Round";
    playerScoreDisplay.innerHTML = `${playerDisplayScoreSentence}: ${playerPoints}`;
    robotScoreDisplay.innerHTML = `${robotDisplayScoreSentence}: ${robotPoints}`;
  }

  function disableClicks() {
    rock.removeEventListener("click", rockPlayedHandler);
    paper.removeEventListener("click", paperPlayedHandler);
    scissors.removeEventListener("click", scissorsPlayedHandler);
    // rock.style.backgroundColor = "grey";
    playerOptions.forEach((item) =>
      item.innerHTML.toLowerCase() === playerChoice
        ? item.classList.add("blue-background")
        : item.classList.add("grey-background")
    );
    playerOptions.forEach((item) => item.classList.remove("blue-hover"));
  }

  function enableClicks() {
    rock.addEventListener("click", rockPlayedHandler);
    paper.addEventListener("click", paperPlayedHandler);
    scissors.addEventListener("click", scissorsPlayedHandler);
    playerOptions.forEach((item) => item.classList.remove("grey-background"));
    playerOptions.forEach((item) => item.classList.remove("blue-background"));
    playerOptions.forEach((item) => item.classList.add("green-background"));
    playerOptions.forEach((item) => item.classList.add("blue-hover"));
  }

  function removeDisplays() {
    playerChoiceDisplay.innerHTML = null;
    robotChoiceDisplay.innerHTML = null;
    endGameDisplay.innerHTML = null;
  }

  function checkTotalScore() {
    if (playerPoints === 3) {
      totalScore += 1;
      resetRoundPoints();
      // displayTotalScore()
      removeRoundScores();
      console.log(`total Score = ${totalScore}`);
    } else if (robotPoints === 3) {
      gameOver();
      console.log(`Final Total Score = ${totalScore}`);
      console.log("game over");
      console.log(`total Score = ${totalScore}`);
    }
  }

  function removeRoundScores() {
    playerScoreDisplay.innerHTML = null;
    robotScoreDisplay.innerHTML = null;
  }

  function resetRoundPoints() {
    playerPoints = 0;
    robotPoints = 0;
  }

  function gameOver() {
    resetRoundPoints();
    totalScore = 0;
    removeRoundScores();
    // displaySaveScore()
    // displayHighestScore()
  }

  function callInsertData() {
    console.log(`${totalScore} from app`);
    InsertData(totalScore);
  }

  french.addEventListener("click", translateToFrench);
  english.addEventListener("click", translateToEnglish);
  insertBtn.addEventListener("click", callInsertData);
  enableClicks();
});
