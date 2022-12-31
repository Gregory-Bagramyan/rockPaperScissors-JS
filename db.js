// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import firebaseConfig from "/config.js";
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

function InsertData() {
  set({ Name: enterID.value });
}

function FindData() {}

insertBtn.addEventListener("click", InsertData);
findBtn.addEventListener("click", FindData);
