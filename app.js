import {
  InsertData,
  insertBtn,
  FindData,
  findBtn,
  highestScoresList,
  getAllDataOnce,
} from "./db.js";

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
  const playerTotalScoreDisplay = document.querySelector(
    ".display-player-total-score"
  );
  const saveScoresBox = document.querySelector(".save-score");
  const saveScoreButton = document.querySelector(".save-player-name-button");
  const highestScore = document.querySelector(".highest-scores-display");
  const highestScoreTitle = document.querySelector(".highest-score-title");
  const playAgain = document.querySelector(".play-again");
  const posibleChoices = ["rock", "paper", "scissors"];

  let language = "english";
  let playerChoice = null;
  let playerChoiceFrench = null;
  let robotChoice = null;
  let robotChoiceFrench = null;
  let roundWinner = null;
  let playerPoints = 0;
  let robotPoints = 0;
  let totalScore = 0;
  let playerDisplayScoreSentence = "Player's Score for the round";
  let robotDisplayScoreSentence = "Robots' Score for the round";
  let playerDisplayTotalScoreSentence = "Total Score";

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

  function displayTotalScore() {
    console.log("displayTotalScores have been triggered");
    playerTotalScoreDisplay.innerHTML = `${playerDisplayTotalScoreSentence}: ${totalScore}`;
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
    playerDisplayTotalScoreSentence = "Score Totale";
    playerScoreDisplay.innerHTML = `${playerDisplayScoreSentence}: ${playerPoints}`;
    robotScoreDisplay.innerHTML = `${robotDisplayScoreSentence}: ${robotPoints}`;
  }

  function translateToEnglish() {
    removeDisplays();
    language = "english";
    h1.innerHTML = "Choose your weapon";
    rock.innerHTML = "Rock";
    paper.innerHTML = "Paper";
    scissors.innerHTML = "Scissors";
    playerDisplayScoreSentence = "Player's Score For The Round";
    robotDisplayScoreSentence = "Robots' Score For The Round";
    playerDisplayTotalScoreSentence = "Total Score";
    playerScoreDisplay.innerHTML = `${playerDisplayScoreSentence}: ${playerPoints}`;
    robotScoreDisplay.innerHTML = `${robotDisplayScoreSentence}: ${robotPoints}`;
  }

  function disableClicks() {
    rock.removeEventListener("click", rockPlayedHandler);
    paper.removeEventListener("click", paperPlayedHandler);
    scissors.removeEventListener("click", scissorsPlayedHandler);
    // rock.style.backgroundColor = "grey";
    playerOptions.forEach((item) =>
      item.className.includes(playerChoice)
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
      removeRoundScores();
      enableClicks();
    } else {
      enableClicks();
    }
  }

  function checkGamoOver() {
    if (robotPoints === 3) {
      gameOver();
    }
  }

  function gameOver() {
    disableClicks();
    console.log("disable clicks from gameOver");
    displaySaveScore();
    // displayHighestScore() triggered by the click
    resetRoundPoints();
    removeRoundScores();
    removeDisplays();
  }

  function displaySaveScore() {
    saveScoresBox.classList.add("open-pop-up");
  }

  async function displayHighestScores() {
    let tableBox = document.createElement("div");
    tableBox.setAttribute("id", "table-box");
    let table = document.createElement("table");
    table.setAttribute("id", "tbody");

    getAllDataOnce().then(function (result) {
      let topScores = result;
      highestScoreTitle.after(tableBox);
      tableBox.appendChild(table);
      tbody.innerHTML =
        "<tr>" +
        "<td>" +
        "Player Name" +
        "</td>" +
        "<td>" +
        "Score" +
        "</td>" +
        "</tr>";
      for (let i = 0; i < topScores.length; i++) {
        // console.log(topScores[i].Name);
        // console.log(topScores[i].Score);
        let tr = "<tr>";
        tr +=
          "<td>" +
          topScores[i].Name +
          "</td>" +
          "<td>" +
          topScores[i].Score +
          "</td></tr>";
        tbody.innerHTML += tr;
        saveScoresBox.classList.remove("open-pop-up");
        highestScore.classList.add("open-pop-up");
        removeTotalScore();
        totalScore = 0;
      }
    });

    // console.log(Object.keys(topScores).length);
  }

  function closeHighestScoresPopUp() {
    highestScore.classList.remove("open-pop-up");
    enableClicks();
  }

  function removeRoundScores() {
    playerScoreDisplay.innerHTML = null;
    robotScoreDisplay.innerHTML = null;
  }

  function removeTotalScore() {
    console.log("removeTotalScore have been triggered");
    playerTotalScoreDisplay.innerHTML = null;
  }

  function resetRoundPoints() {
    playerPoints = 0;
    robotPoints = 0;
  }

  function callInsertData() {
    console.log(`${totalScore} from app`);
    InsertData(totalScore);
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
    await delay(300);
    displayPlayerChoice(playerChoice);
    await delay(300);
    displayRobotChoice(robotChoosing());
    determinWinner();
    countPoints();
    const endGameSentence = determinWinnerSentence();
    await delay(300);
    displayEngGameSentence(endGameSentence);
    await delay(300);
    displayScores();
    checkTotalScore();
    await delay(200);
    displayTotalScore();
    checkGamoOver();
  }

  french.addEventListener("click", translateToFrench);
  english.addEventListener("click", translateToEnglish);
  insertBtn.addEventListener("click", callInsertData);
  saveScoreButton.addEventListener("click", displayHighestScores);
  playAgain.addEventListener("click", closeHighestScoresPopUp);
  // findBtn.addEventListener("click", FindData);
  enableClicks();
  // displayHighestScores();
  // FindData();
});

//generate random id instead of name as an id (to avoid overwriting) (done)
//retrieve top 3 Scores and Player Names (done)
//incorporte save score in game sequence (before reinitializing totalScore)
// -> option to save appears only after a game over
// => Make it a pop up window
//retrieve top 3 scores and display them right after the save of the highest sccore
//make connection to db secure (change from the the not secure one)
//hide API key (dotenv or other methode)
//publish with filezilla
//improve save score and display top3 scores display (as a popup window)
//display total score
//add a flavicon
//add rules and highest score buttons (like FR & ENG but on opposit side)
