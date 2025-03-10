function startCountdown() {
  // Get the input values
  const days = document.getElementById("days").value.trim();
  const hours = document.getElementById("hours").value.trim();
  const minutes = document.getElementById("minutes").value.trim();
  const seconds = document.getElementById("seconds").value.trim();

  // Regular expression to match exactly two digits
  const twoDigitPattern = /^\d{2}$/;

  // Validate the inputs
  if (!twoDigitPattern.test(days) || !twoDigitPattern.test(hours) ||
      !twoDigitPattern.test(minutes) || !twoDigitPattern.test(seconds)) {
    alert("Please enter exactly two digits for each field.");
    return;
  }

  // Parse the input values as integers
  const daysNum = parseInt(days, 10);
  const hoursNum = parseInt(hours, 10);
  const minutesNum = parseInt(minutes, 10);
  const secondsNum = parseInt(seconds, 10);

  // Check for valid ranges
  if (isNaN(daysNum) || isNaN(hoursNum) || isNaN(minutesNum) || isNaN(secondsNum) ||
      hoursNum >= 24 || minutesNum >= 60 || secondsNum >= 60) {
    alert("Please enter valid numbers: 0-23 for hours, 0-59 for minutes and seconds.");
    return;
  }

  // Calculate the countdown time in milliseconds
  const countdownTime = new Date().getTime() +
    (daysNum * 24 * 60 * 60 * 1000) +
    (hoursNum * 60 * 60 * 1000) +
    (minutesNum * 60 * 1000) +
    (secondsNum * 1000);

  // Save the countdown time in localStorage
  localStorage.setItem("countdownTime", countdownTime);

  // Redirect to countdown.html
  window.location.href = "countdown.html";
}

// Function to initialize the countdown
function initializeCountdown() {
  const countdownTime = parseInt(localStorage.getItem("countdownTime"), 10);

  // Update the countdown every 1 second
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownTime - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements with the corresponding IDs
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // If the countdown is over, stop the interval and reset display
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
    }
  }, 1000);
}

// If you're using the initializeCountdown function on countdown.html, call it on page load
if (window.location.pathname.endsWith("countdown.html")) {
  initializeCountdown();
}



