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
let enterID = document.querySelector("#enterID");
let findID = document.querySelector("#findID");
let findScore = document.querySelector("#findScore");

let insertBtn = document.querySelector("#insert");
let findBtn = document.querySelector("#find");

function InsertData() {}

function FindData() {}

insertBtn.addEventListener("click", InsertData);
findBtn.addEventListener("click", FindData);
