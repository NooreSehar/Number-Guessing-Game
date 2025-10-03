
const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumsArr;

// Main game logic
const play = () => {
  const userGuess = parseInt(guessInput.value);

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  guessedNumsArr.push(userGuess);
  noOfGuesses++;

  if (userGuess !== answer) {
    if (userGuess < answer) {
      hint.innerHTML = " Too Low. Try Again!";
    } else {
      hint.innerHTML = " Too High. Try Again!";
    }

    noOfGuessesRef.innerHTML = `No. of Guesses: ${noOfGuesses}`;
    guessedNumsRef.innerHTML = `Guessed Numbers are: ${guessedNumsArr.join(", ")}`;

    hint.classList.remove("error", "success");
    setTimeout(() => hint.classList.add("error"), 10);

  } else {
    hint.innerHTML = `🎉 Congratulations!<br>
      The number was <b>${answer}</b>.<br>
      You guessed it in <b>${noOfGuesses}</b> tries.`;
    hint.classList.remove("error");
    hint.classList.add("success");

    game.style.display = "none";
    restartButton.style.display = "block";
  }
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 1;
  console.log("Answer:", answer); 

  noOfGuesses = 0;
  guessedNumsArr = [];

  noOfGuessesRef.innerHTML = "No. of Guesses: 0";
  guessedNumsRef.innerHTML = "Guessed Numbers are: None";
  guessInput.value = "";
  hint.innerHTML = "";
  hint.classList.remove("success", "error");

  game.style.display = "block";
  restartButton.style.display = "none";
};

guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") play();
});
guessInput.addEventListener("keydown",(event) =>{
  if(event.keyCode === 13){
    event.preventDefault();
    play();
  }
});
restartButton.addEventListener("click", ()=>{
  game.style.display="grid";
  restartButton.style.display = "none";
  hint.innerHTML= "";
  hint.classList.remove("success");
  init();
})
checkButton.addEventListener("click", play);
window.addEventListener("load", init);
restartButton.addEventListener("click", init);

