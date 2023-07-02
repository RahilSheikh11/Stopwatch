const timeDisplay = document.querySelector("#timeDisplay"); // Get the element with id "timeDisplay"
const startBtn = document.querySelector("#startBtn"); // Get the element with id "startBtn"
const pauseBtn = document.querySelector("#pauseBtn"); // Get the element with id "pauseBtn"
const resetBtn = document.querySelector("#resetBtn"); // Get the element with id "resetBtn"

let startTime = 0; // Variable to store the start time in milliseconds
let elapsedTime = 0; // Variable to store the elapsed time in milliseconds
let currentTime = 0; // Variable to store the current time in milliseconds
let paused = true; // Flag to track whether the timer is paused or not
let intervalId; // Variable to store the interval ID for updating the timer
let hrs = 0; // Variable to store the hours component of the timer
let mins = 0; // Variable to store the minutes component of the timer
let secs = 0; // Variable to store the seconds component of the timer

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false; // Set the flag to indicate that the timer is not paused
    startTime = Date.now() - elapsedTime; // Set the start time by subtracting the elapsed time from the current time
    intervalId = setInterval(updateTime, 1000); // Start the interval to update the timer every second
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true; 
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId); 
  }
});

resetBtn.addEventListener("click", () => {
  paused = true; 
  clearInterval(intervalId);
  startTime = 0; 
  elapsedTime = 0; 
  currentTime = 0; 
  hrs = 0; 
  mins = 0; 
  secs = 0; 
  timeDisplay.textContent = "00:00:00"; 
});

function updateTime() {
  elapsedTime = Date.now() - startTime; 

  secs = Math.floor((elapsedTime / 1000) % 60); 
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60); 
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60); 

  secs = pad(secs); 
  mins = pad(mins);
  hrs = pad(hrs); 

  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}