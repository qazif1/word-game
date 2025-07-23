// Landing page elements
const landingPage = document.getElementById("landingPage");
const gameContainer = document.getElementById("gameContainer");
const playGameBtn = document.getElementById("playGameBtn");

playGameBtn.addEventListener("click", () => {
  landingPage.style.display = "none";
  gameContainer.style.display = "block";
});

// Game elements
const main = document.querySelector(".main");
const wordElement = document.querySelector(".word");
const wordImage = document.querySelector(".word-img");
const typeArea = document.querySelector(".typingArea");
const btn = document.querySelector(".btn");
const audioBtn = document.querySelector(".audio-btn");

// Hide image at the start
wordImage.style.display = "none";

// Word list with images and audio
const words = [
  { text: "close", img: "close.jpg", audio: "close.mp3" },
  { text: "dance", img: "dance.jpg", audio: "dance.mp3" },
  { text: "draw", img: "draw.jpg", audio: "draw.mp3" },
  { text: "drink", img: "drink.jpg", audio: "drink.mp3" },
  { text: "eat", img: "eat.jpg", audio: "eat.mp3" },
  { text: "jump", img: "jump.jpg", audio: "jump.mp3" },
  { text: "listen", img: "listen.jpg", audio: "listen.mp3" },
  { text: "open", img: "open.jpg", audio: "open.mp3" },
  { text: "play", img: "play.jpg", audio: "play.mp3" },
  { text: "read", img: "read.jpg", audio: "read.mp3" },
  { text: "run", img: "run.jpg", audio: "run.mp3" },
  { text: "sing", img: "sing.jpg", audio: "sing.mp3" },
  { text: "sit", img: "sit.jpg", audio: "sit.mp3" },
  { text: "sleep", img: "sleep.jpg", audio: "sleep.mp3" },
  { text: "stand", img: "stand.jpg", audio: "stand.mp3" },
  { text: "swim", img: "swim.jpg", audio: "swim.mp3" },
  { text: "walk", img: "walk.jpg", audio: "walk.mp3" },
  { text: "wash", img: "wash.jpg", audio: "wash.mp3" },
  { text: "write", img: "write.jpg", audio: "write.mp3" },
  { text: "cook", img: "cook.jpg", audio: "cook.mp3" }
];

let game = {
  score: 0,
  currentIndex: 0,
  roundWords: [],
  currentWord: "",
  currentAudio: null
};

// Button logic (Start/Done/Restart)
btn.addEventListener("click", () => {
  if (btn.textContent === "Start") {
    startGame();
  } else if (btn.textContent === "Done") {
    checkAnswer();
  } else if (btn.textContent === "Restart") {
    startGame();
  }
});

// Audio button
audioBtn.addEventListener("click", () => {
  if (game.currentAudio) {
    const audio = new Audio(game.currentAudio);
    audio.play();
  }
});

// Start the game
function startGame() {
  // Duplicate each word and shuffle
  game.roundWords = shuffleArray([...words, ...words]);
  game.score = 0;
  game.currentIndex = 0;
  typeArea.disabled = false;
  typeArea.value = "";
  btn.textContent = "Done";
  showWord();
}

// Show current word
function showWord() {
  let current = game.roundWords[game.currentIndex];
  game.currentWord = current.text;
  wordElement.textContent = current.text;
  wordImage.src = current.img;
  wordImage.alt = current.text;
  wordImage.style.display = "block";
  game.currentAudio = current.audio;
  updateScoreDisplay();
  typeArea.value = "";
  typeArea.focus();
}

// Check user's answer
function checkAnswer() {
  const userAnswer = typeArea.value.trim().toLowerCase();
  const correctWord = game.currentWord.toLowerCase();

  if (userAnswer === correctWord) {
    game.score++;
    wordElement.textContent = "Correct!";
    wordElement.style.color = "green";
  } else {
    wordElement.textContent = `Try Again! (${correctWord})`;
    wordElement.style.color = "red";
  }

  setTimeout(() => {
    wordElement.style.color = "black";
    game.currentIndex++;
    if (game.currentIndex < game.roundWords.length) {
      showWord();
    } else {
      endGame();
    }
  }, 1000);
}

// End of round
function endGame() {
  wordImage.style.display = "none";
  wordElement.textContent = `You scored ${game.score} out of ${game.roundWords.length}!`;
  btn.textContent = "Restart";
}

// Shuffle helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Score display
function updateScoreDisplay() {
  main.querySelector(".score-display")?.remove();
  const scoreDisplay = document.createElement("div");
  scoreDisplay.className = "score-display";
  scoreDisplay.textContent = `Score: ${game.score} / ${game.roundWords.length}`;
  main.appendChild(scoreDisplay);
}
