document.addEventListener("DOMContentLoaded", () => {
  const rock = document.querySelector(".rock");
  const paper = document.querySelector(".paper");
  const scissors = document.querySelector(".scissors");

  let playerChoice = null;

  function rockPlayedHandler() {
    playerChoice = "rock";
    const output = `you chose ${playerChoice} bruv`;
    document.querySelector(".display").innerHTML = output;
  }

  function paperPlayedHandler() {
    playerChoice = "paper";
    const output = `you chose ${playerChoice} fam`;
    document.querySelector(".display").innerHTML = output;
  }

  function scissorsPlayedHandler() {
    playerChoice = "scissors";
    const output = `you chose ${playerChoice} dawg`;
    document.querySelector(".display").innerHTML = output;
  }

  rock.addEventListener("click", rockPlayedHandler);
  paper.addEventListener("click", paperPlayedHandler);
  scissors.addEventListener("click", scissorsPlayedHandler);
});
