const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();

newGuess.addEventListener("keyup", checkKey);
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restart);
let triesCounter = 0;

function newRandom(){
    theGuess = Math.floor(Math.random() * 100 + 1);
    console.log(theGuess);
}

function checkKey(e){
    if ((e.code === "Enter" || e.code === "NumpadEnter") && !newGuess.hasAttribute("readonly")) {
    checkGuess();
    }
}

function checkGuess(){
    newGuess.focus();
    let result = processGuess(newGuess.value);
    if (result === "win" || result === "lost") {
        checkButton.style.visibility = "hidden";
        restartButton.style.visibility = "visible";
        restartButton.focus();
    }
}

function processGuess(newValue){
    let userGuess = parseInt(newValue);
    newGuess.value = "";
    if (isNaN(userGuess)) {
        message.textContent = "Give number!";
        message.style.backgroundColor = "var(--msg-wrong-color)";
    } else if (userGuess>=1 && userGuess<=100){
        if (previousGuesses.indexOf(userGuess)=== -1) {
            triesCounter += 1;
            previousGuesses.push(userGuess);
            lowHigh.textContent = "Previous tries: " + previousGuesses.join(" ");
            if (triesCounter <= 10) {
                if (userGuess === theGuess) {
                    message.textContent = "Well done, you find it!";
                    message.style.backgroundColor = "var(--msg-win-color)";
                    newGuess.setAttribute("readonly", "");
                    return "win";
                } else if (triesCounter === 10) {
                    message.textContent = "Game over, you lose!";
                    message.style.backgroundColor = "var(--msg-wrong-color)";
                    newGuess.setAttribute("readonly", "");
                    return "lost";
                } else if (userGuess > theGuess) {
                    message.textContent = "Wrong, it is lower.";
                    message.style.backgroundColor = "var(--msg-wrong-color)";
                } else {
                    message.textContent = "Wrong, it is higher.";
                    message.style.backgroundColor = "var(--msg-wrong-color)";
                }
            }
        } else {
            message.textContent = "You have already try this number!";
            message.style.backgroundColor = "var(--msg-wrong-color)";
        }
    } else {
        message.textContent = "Give a number between 1 and 100.";
        message.style.backgroundColor = "var(--msg-wrong-color)";
    }
    
}

function restart(){
    restartButton.style.visibility = "hidden";
    lowHigh.textContent = "";
    message.textContent = "";
    newRandom();
    previousGuesses = [];
    triesCounter = 0;
    checkButton.style.visibility = "visible";
    newGuess.removeAttribute("readonly");
    newGuess.focus();
}
