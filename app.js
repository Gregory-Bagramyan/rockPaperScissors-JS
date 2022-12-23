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
    return posibleChoices[Math.floor(Math.random() * posibleChoices.length)];
  }

  async function rockPlayedHandler() {
    playerChoice = "rock";
    const playerChoiceDisplay = `you chose ${playerChoice} bruv`;
    document.querySelector(".player-choice-display").innerHTML =
      playerChoiceDisplay;
    robotChoice = robotChoosing();
    await delay(800);
    const robotChoiceDisplay = `I chose ${robotChoice} dawg`;
    document.querySelector(".robot-choice-display").innerHTML =
      robotChoiceDisplay;
  }

  async function paperPlayedHandler() {
    playerChoice = "paper";
    const playerChoiceDisplay = `you chose ${playerChoice} fam`;
    document.querySelector(".player-choice-display").innerHTML =
      playerChoiceDisplay;
    robotChoice = robotChoosing();
    await delay(800);
    const robotChoiceDisplay = `I chose ${robotChoice} brruv`;
    document.querySelector(".robot-choice-display").innerHTML =
      robotChoiceDisplay;
  }

  async function scissorsPlayedHandler() {
    playerChoice = "scissors";
    const playerChoiceDisplay = `you chose ${playerChoice} dawg`;
    document.querySelector(".player-choice-display").innerHTML =
      playerChoiceDisplay;
    robotChoice = robotChoosing();
    await delay(800);
    const robotChoiceDisplay = `I chose ${robotChoice} fam`;
    document.querySelector(".robot-choice-display").innerHTML =
      robotChoiceDisplay;
  }

  rock.addEventListener("click", rockPlayedHandler);
  paper.addEventListener("click", paperPlayedHandler);
  scissors.addEventListener("click", scissorsPlayedHandler);
});
