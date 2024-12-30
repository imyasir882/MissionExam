document.addEventListener("DOMContentLoaded", () => {
    // Stopwatch and time update
    const timeElement = document.querySelector(".stopwatch .time");
    const progressBar = document.querySelector(".stopwatch .bar");
    const preparationText = document.querySelector(".stopwatch div:last-child");
  
    // Exam events
    const events = [
      { date: "2025-01-02", name: "Linear Algebra 📚" },
      { date: "2025-01-03", name: "Database Systems 🖥️" },
      { date: "2025-01-08", name: "Web Technologies 🌐" },
      { date: "2025-01-14", name: "Computer Networks 🌍" },
      { date: "2025-01-15", name: "Formal Methods 📘" },
    ];
  
    function getNextEvent() {
      const now = new Date();
      return events
        .map(event => ({
          ...event,
          date: new Date(`${event.date}T00:00:00`), // Parse to Date object
        }))
        .find(event => event.date > now);
    }
  
    function updateStopwatch() {
      const now = new Date();
      const nextEvent = getNextEvent();
  
      if (nextEvent) {
        const timeRemaining = nextEvent.date - now;
  
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
        // Display remaining time
        timeElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
        // Display event name and progress
        preparationText.textContent = `Next: ${nextEvent.name}`;
      } else {
        // No more events
        timeElement.textContent = "All exams done!";
        preparationText.textContent = "Mission Complete! 🎉";
      }
    }
  
    // Update every second
    setInterval(updateStopwatch, 1000);
  });
  