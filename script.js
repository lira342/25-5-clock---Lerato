let breakIncrementButton = document.getElementById('break-increment');
let breakDecrementButton = document.getElementById('break-decrement');
let sessionIncrementButton = document.getElementById('session-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timerLabel = document.getElementById('timer-label');
let timeLeft = document.getElementById('time-left');
let beepSound = document.getElementById('beep');

let timer;
let timerStatus = "stopped";
let isSession = true;

function initialize() {
  breakLength.innerText = '5';
  sessionLength.innerText = '25';
  timeLeft.innerText = '25:00';
  timerStatus = "stopped";
  isSession = true;
  timerLabel.innerText = "Session";
  clearInterval(timer);
  beepSound.pause();
  beepSound.currentTime = 0;
}

function startTimer() {
  timerStatus = "running";
  timer = setInterval(decrementTime, 1000);
}

function stopTimer() {
  timerStatus = "stopped";
  clearInterval(timer);
}

function decrementTime() {
  let timeDisplay = timeLeft.innerText.split(":");
  let minuteDisplay = parseInt(timeDisplay[0]);
  let secondDisplay = parseInt(timeDisplay[1]);

  if (secondDisplay === 0) {
    if (minuteDisplay === 0) {
      beepSound.play();
      if (isSession) {
        isSession = false;
        timerLabel.innerText = "Break";
        minuteDisplay = parseInt(breakLength.innerText);
      } else {
        isSession = true;
        timerLabel.innerText = "Session";
        minuteDisplay = parseInt(sessionLength.innerText);
      }
    } else {
      minuteDisplay -= 1;
      secondDisplay = 59;
    }
  } else {
    secondDisplay -= 1;
  }

  if (minuteDisplay <= 9) {
    minuteDisplay = "0" + minuteDisplay;
  }

  if (secondDisplay <= 9) {
    secondDisplay = "0" + secondDisplay;
  }

  timeLeft.innerText = minuteDisplay + ":" + secondDisplay;
}

breakDecrementButton.addEventListener("click", () => {
  let newBreakLength = parseInt(breakLength.innerText) - 1;
  if (newBreakLength >= 1) {
    breakLength.innerText = newBreakLength;
    if (!timer && !isSession) {
      timeLeft.innerText = newBreakLength.toString().padStart(2, "0") + ":00";
    }
  }
});

breakIncrementButton.addEventListener("click", () => {
  let newBreakLength = parseInt(breakLength.innerText) + 1;
  if (newBreakLength <= 60) {
    breakLength.innerText = newBreakLength;
    if (!timer && !isSession) {
      timeLeft.innerText = newBreakLength.toString().padStart(2, "0") + ":00";
    }
  }
});

sessionDecrementButton.addEventListener("click", () => {
  let newSessionLength = parseInt(sessionLength.innerText) - 1;
  if (newSessionLength >= 1) {
    sessionLength.innerText = newSessionLength;
    if (!timer && isSession) {
      timeLeft.innerText = newSessionLength.toString().padStart(2, "0") + ":00";
    }
  }
});

sessionIncrementButton.addEventListener("click", () => {
  let newSessionLength = parseInt(sessionLength.innerText) + 1;
  if (newSessionLength <= 60) {
    sessionLength.innerText = newSessionLength;
    if (!timer && isSession) {
      timeLeft.innerText = newSessionLength.toString().padStart(2, "0") + ":00";
    }
  }
});

startStopButton.addEventListener("click", () => {
  if (timerStatus === "stopped") {
    startTimer();
  } else if (timerStatus === "running") {
    stopTimer();
  }
});

resetButton.addEventListener("click", () => {
  initialize();
});

initialize();
