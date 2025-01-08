document.addEventListener("DOMContentLoaded", () => {
  // Stopwatch and time update
  const timeElement = document.querySelector(".stopwatch .time");
  const progressBar = document.querySelector(".stopwatch .bar");
  const preparationText = document.querySelector(".stopwatch div:last-child");

  // Exam events with times
  const events = [
    { date: "2025-01-02T09:00:00", endTime: "2025-01-02T12:00:00", name: "Linear Algebra 📚" },
    { date: "2025-01-03T14:00:00", endTime: "2025-01-03T17:00:00", name: "Database Systems 🖥️" },
    { date: "2025-01-08T13:00:00", endTime: "2025-01-08T16:00:00", name: "Web Technologies 🌐" },
    { date: "2025-01-14T09:00:00", endTime: "2025-01-14T12:00:00", name: "Computer Networks 🌍" },
    { date: "2025-01-15T09:00:00", endTime: "2025-01-15T12:00:00", name: "Formal Methods 📛" },
  ];

  function getNextEvent() {
    const now = new Date();
    return events
      .map(event => ({
        ...event,
        date: new Date(event.date),
        endTime: new Date(event.endTime),
      }))
      .find(event => event.endTime > now);
  }

  function updateStopwatch() {
    const now = new Date();
    const nextEvent = getNextEvent();

    if (nextEvent) {
      let timeRemaining;

      if (now < nextEvent.date) {
        // Before exam starts
        timeRemaining = nextEvent.date - now;
        preparationText.textContent = `Next: ${nextEvent.name} (Starts soon)`;
      } else if (now >= nextEvent.date && now <= nextEvent.endTime) {
        // During exam
        timeRemaining = nextEvent.endTime - now;
        preparationText.textContent = `Ongoing: ${nextEvent.name} (Ends soon)`;
      } else {
        // After exam ends
        preparationText.textContent = `${nextEvent.name} completed!`;
        timeElement.textContent = "--:--:--:--";
        return;
      }

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Display remaining time
      timeElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      // No more events
      timeElement.textContent = "All exams done!";
      preparationText.textContent = "Mission Complete! 🎉";
    }
  }

  // Update every second
  setInterval(updateStopwatch, 1000);
});
