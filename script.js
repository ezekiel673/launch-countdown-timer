function startCountdown() {
  const days = document.getElementById("days").value.trim();
  const hours = document.getElementById("hours").value.trim();
  const minutes = document.getElementById("minutes").value.trim();
  const seconds = document.getElementById("seconds").value.trim();

  const twoDigitPattern = /^\d{2}$/;

  if (
    !twoDigitPattern.test(days) ||
    !twoDigitPattern.test(hours) ||
    !twoDigitPattern.test(minutes) ||
    !twoDigitPattern.test(seconds)
  ) {
    alert("Please enter exactly two digits for each field.");
    return;
  }

  const daysNum = parseInt(days, 10);
  const hoursNum = parseInt(hours, 10);
  const minutesNum = parseInt(minutes, 10);
  const secondsNum = parseInt(seconds, 10);

  if (
    isNaN(daysNum) ||
    isNaN(hoursNum) ||
    isNaN(minutesNum) ||
    isNaN(secondsNum) ||
    hoursNum >= 24 ||
    minutesNum >= 60 ||
    secondsNum >= 60
  ) {
    alert("Please enter valid numbers: 0-23 for hours, 0-59 for minutes and seconds.");
    return;
  }

  const countdownTime =
    new Date().getTime() +
    daysNum * 24 * 60 * 60 * 1000 +
    hoursNum * 60 * 60 * 1000 +
    minutesNum * 60 * 1000 +
    secondsNum * 1000;

  localStorage.setItem("countdownTime", countdownTime);
  window.location.href = "./countdown.html";
}

function initializeCountdown() {
  const countdownTime = parseInt(localStorage.getItem("countdownTime"), 10);

  if (isNaN(countdownTime)) {
    alert("Countdown time is not set.");
    return;
  }

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      alert("Countdown completed!");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }, 1000);
}

function resetCountdown() {
  document.getElementById("countdown-form").reset();
  localStorage.removeItem("countdownTime");
  alert("Countdown reset successfully!");
}

if (window.location.pathname === "/countdown.html") {
  initializeCountdown();
}
