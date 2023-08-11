// Array of words
const words = [
  "Hello",
  // "Programming",
  "Code",
  // "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  // "Linkedin",
  "Twitter",
  "Github",
  // "Leetcode",
  "Internet",
  "Python",
  "Scala",
  // "Destructuring",
  // "Paradigm",
  "Styling",
  "Cascade",
  // "Documentation",
  // "Coding",
  // "Funny",
  // "Working",
  // "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  // "Playing",
];

// setting levels
const lvls = {
  Easy: 7,
  Normal: 5,
  Hard: 3,
};

// catch selectors
let startButton = document.querySelector(".start");
let select = document.querySelectorAll(".select");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let reloadPage = document.querySelector(".play-again");

// Default Level
let defaultLevelName; // change levels
let defaultLevelSeconds;

// check if user chose the difficult
let checkDefault = false;

// get select values
select.forEach((ele) => {
  ele.addEventListener("change", function () {
    defaultLevelName = ele.value;
    defaultLevelSeconds = lvls[defaultLevelName];

    // check if user chose the difficult
    checkDefault = true;

    // setting levels name & seconds
    return (
      (lvlNameSpan.innerHTML = defaultLevelName),
      (secondsSpan.innerHTML = defaultLevelSeconds),
      (timeLeftSpan.innerHTML = defaultLevelSeconds)
    );
  });
});
// setting levels score
scoreTotal.innerHTML = words.length;

// disable past event
input.onpaste = function () {
  return false;
};

// start game
startButton.onclick = function () {
  if (checkDefault !== true) {
    alert("Chose The Difficult");
  }
  if (checkDefault === true) {
    this.remove();
    input.focus();
    // generate word function
    genWords();
  }
};

function genWords() {
  // get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // empty upcoming words
  upcomingWords.innerHTML = "";
  // generate words
  for (let i = 0; i < words.length; i++) {
    // create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // call start paly function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // stop timer
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        // increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // call generate word function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("You Win");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

reloadPage.onclick = function () {
  document.location.reload();
};
