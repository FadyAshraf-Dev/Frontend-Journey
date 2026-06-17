      const day = document.querySelector("#day");
      const hour = document.querySelector("#hour");
      const minute = document.querySelector("#minute");
      const second = document.querySelector("#second");
      const AMPM = document.querySelector("#AMPM");

      // Grab the parent clock row to control initialization states
      const clockRow = document.querySelector(".row");

      function updateClock() {
        const date = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // 1. Process and append data states into the active markup elements
        day.innerText = days[date.getDay()];

        // Handle 12-hour format converting 0 to 12 for midnight cleanly
        let currentHour = date.getHours();
        let displayHour = currentHour % 12;
        displayHour = displayHour ? displayHour : 12;
        hour.innerText = displayHour;

        // Pad single digits with leading zeros for standard clock layout consistency
        minute.innerText = String(date.getMinutes()).padStart(2, "0");
        second.innerText = String(date.getSeconds()).padStart(2, "0");

        AMPM.innerText = currentHour >= 12 ? "PM" : "AM";

        // 2. The moment data drops into DOM nodes, add the visibility class
        clockRow.classList.add("initialized");
      }

      // EXECUTE IMMEDIATELY: Populates data instantly on document paint setup
      updateClock();

      // MAINTAIN UPDATES: Keep checking every subsequent second smoothly
      setInterval(updateClock, 1000);
