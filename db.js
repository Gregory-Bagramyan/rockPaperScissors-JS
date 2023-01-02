// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import firebaseConfig from "./config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let highestScore = 1;
let highestScoresList = [];

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child,
  orderByValue,
  limitToLast,
  limitToFirst,
  query,
  orderByChild,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

let db = getDatabase();
let enterName = document.querySelector("#enterName");
let findName = document.querySelector("#findName");
let findScore = document.querySelector("#findScore");

let insertBtn = document.querySelector("#insert");
let findBtn = document.querySelector("#find");

function InsertData(totalScore) {
  set(ref(db, "User/" + "user" + Date.now()), {
    Name: enterName.value,
    Score: totalScore,
  })
    .then(() => {
      alert("data added successfully");
    })
    .catch((error) => {
      alert(error);
    });
}

async function FindData() {
  getAllDataOnce();
}

async function getAllDataOnce() {
  const q = query(ref(db, "User"), orderByChild("Score"));

  get(q).then((snapshot) =>
    snapshot.forEach((childSnapshot) => {
      highestScoresList.push(childSnapshot.val());
    })
  );

  await delay(800);
  highestScoresList.reverse();
  console.log(highestScoresList);
  // console.log(highestScoresList[0].Score);
}

export { InsertData, insertBtn, FindData, findBtn };
