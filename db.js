// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import firebaseConfig from "./config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

let db = getDatabase();
let enterName = document.querySelector("#enterName");
let findName = document.querySelector("#findName");
let findScore = document.querySelector("#findScore");

let insertBtn = document.querySelector("#insert");
let findBtn = document.querySelector("#find");

function InsertData(totalScore) {
  console.log(`${totalScore} from db`);
  set(ref(db, "User/" + enterName.value), {
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

function FindData() {}

findBtn.addEventListener("click", FindData);

export { InsertData, insertBtn };
