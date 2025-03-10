const { useState, useEffect } = React;

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for popstate events (e.g., browser back button)
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (path) => {
    // Update the browser history and React state
    window.history.pushState({}, "", path);
    setCurrentPage(path);
  };

  const startCountdown = () => {
    const days = document.getElementById("days").value.trim();
    const hours = document.getElementById("hours").value.trim();
    const minutes = document.getElementById("minutes").value.trim();
    const seconds = document.getElementById("seconds").value.trim();

    console.log(days);
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

    const targetTime =
      new Date().getTime() +
      daysNum * 24 * 60 * 60 * 1000 +
      hoursNum * 60 * 60 * 1000 +
      minutesNum * 60 * 1000 +
      secondsNum * 1000;

    localStorage.setItem("countdownTargetTime", targetTime);
    navigateTo("/countdown.html"); // Navigate to countdown page
  };

  if (currentPage === "/countdown.html") {
    return <CountdownPage navigateTo={navigateTo} />;
  }

  return <SetupPage startCountdown={startCountdown} />;
}

function SetupPage({ startCountdown }) {
  // Function to reset all input fields to "00"
  const resetCountdown = () => {
    document.getElementById("days").value = "00";
    document.getElementById("hours").value = "00";
    document.getElementById("minutes").value = "00";
    document.getElementById("seconds").value = "00";
  };

  return (
    <div className="container">
      <h1>Set Countdown</h1>
      <form id="countdown-form">
        <div className="countdown-inputs">
          <div className="input-box">
            <label htmlFor="days">Days</label>
            <input type="text" id="days" name="days" defaultValue="00" pattern="\d{2}" />
          </div>
          <div className="input-box">
            <label htmlFor="hours">Hours</label>
            <input type="text" id="hours" name="hours" defaultValue="00" pattern="\d{2}" />
          </div>
          <div className="input-box">
            <label htmlFor="minutes">Minutes</label>
            <input type="text" id="minutes" name="minutes" defaultValue="00" pattern="\d{2}" />
          </div>
          <div className="input-box">
            <label htmlFor="seconds">Seconds</label>
            <input type="text" id="seconds" name="seconds" defaultValue="00" pattern="\d{2}" />
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={startCountdown}>
            Countdown
          </button>
          <button id="cancel" type="button" onClick={resetCountdown}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function CountdownPage({ navigateTo }) {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const targetTime = parseInt(localStorage.getItem("countdownTargetTime"), 10);

    if (isNaN(targetTime)) {
      navigateTo("/index.html");
      return;
    }

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        alert("Countdown completed!");
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            .toString()
            .padStart(2, "0"),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            .toString()
            .padStart(2, "0"),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigateTo]);

  return (
    <div id="countdown-container">
      <div className="container">
        <h1>Countdown...</h1>
        <div className="countdown">
          <div className="flip-box">
            <div className="flip-inner">
              <span id="days">{timeLeft.days}</span>
            </div>
            <p>Days</p>
          </div>
          <div className="flip-box">
            <div className="flip-inner">
              <span id="hours">{timeLeft.hours}</span>
            </div>
            <p>Hours</p>
          </div>
          <div className="flip-box">
            <div className="flip-inner">
              <span id="minutes">{timeLeft.minutes}</span>
            </div>
            <p>Minutes</p>
          </div>
          <div className="flip-box">
            <div className="flip-inner">
              <span id="seconds">{timeLeft.seconds}</span>
            </div>
            <p>Seconds</p>
          </div>
        </div>
      </div>
      <button id="cancel" type="button" onClick={() => navigateTo("/index.html")}>
        Cancel
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));




