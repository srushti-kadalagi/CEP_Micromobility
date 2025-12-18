document.addEventListener("DOMContentLoaded", () => {
  // Redirect if not logged in
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login to book a ride");
    window.location.href = "login.html";
    return;
  }

  const cityCards = document.querySelectorAll(".city-card");
  const stationAttractions = document.querySelector(".station-attractions");
  const cityTitle = document.getElementById("cityTitle");
  const stationSelect = document.getElementById("stationSelect");
  const attractionsGrid = document.getElementById("attractionsGrid");
  const attractionSearch = document.getElementById("attractionSearch");

  // Create background overlay div
  let bgOverlay = document.querySelector(".bg-overlay");
  if (!bgOverlay) {
    bgOverlay = document.createElement("div");
    bgOverlay.classList.add("bg-overlay");
    document.body.appendChild(bgOverlay);
  }

  const pricePerKm = 50;

  // Data
  const data = {
    Tokyo: {
      stations: ["Tokyo Station", "Shinjuku Station", "Asakusa Station"],
      attractions: [
        { name: "Tokyo Tower", station: "Tokyo Station", distance: 3.0 },
        { name: "Tokyo Skytree", station: "Tokyo Station", distance: 4.8 },
        { name: "Senso-ji", station: "Tokyo Station", distance: 5.1 },
        { name: "Meiji Jingu", station: "Shinjuku Station", distance: 2.5 },
        { name: "Imperial Palace", station: "Shinjuku Station", distance: 4.0 }
      ]
    },
    Osaka: {
      stations: ["Osaka Station", "Namba Station"],
      attractions: [
        { name: "Osaka Castle", station: "Osaka Station", distance: 3.2 },
        { name: "Umeda Sky Building", station: "Osaka Station", distance: 2.5 },
        { name: "Dotonbori", station: "Namba Station", distance: 1.8 }
      ]
    },
    Kyoto: {
      stations: ["Kyoto Station", "Gion Station"],
      attractions: [
        { name: "Kiyomizu-dera", station: "Kyoto Station", distance: 3.6 },
        { name: "Fushimi Inari", station: "Kyoto Station", distance: 4.0 },
        { name: "Gion District", station: "Gion Station", distance: 2.0 }
      ]
    }
  };

  let selectedCity = null;
  let filteredAttractions = [];

  // Step 1: Select City with smooth background animation
  cityCards.forEach(card => {
    card.addEventListener("click", () => {
      selectedCity = card.dataset.city;
      cityTitle.textContent = selectedCity;
      stationAttractions.classList.remove("hidden");

      // Set the background image based on city
      let bgImage = "";
      switch(selectedCity){
        case "Tokyo":
          bgImage = "../assets/images/scooters/scooter1.jpg";
          break;
        case "Osaka":
          bgImage = "../assets/images/scooters/scooter2.jpg";
          break;
        case "Kyoto":
          bgImage = "../assets/images/scooters/scooter3.jpg";
          break;
      }

      // Apply background with sakura overlay
      bgOverlay.style.backgroundImage = `linear-gradient(rgba(255, 182, 193, 0.35), rgba(255, 182, 193, 0.35)), url(${bgImage})`;
      bgOverlay.classList.add("visible");

      populateStations();
      populateAttractions();
    });
  });

  function populateStations() {
    stationSelect.innerHTML = "";
    data[selectedCity].stations.forEach(station => {
      const option = document.createElement("option");
      option.value = station;
      option.textContent = station;
      stationSelect.appendChild(option);
    });
  }

  function populateAttractions() {
    const selectedStation = stationSelect.value;
    filteredAttractions = data[selectedCity].attractions.filter(
      a => a.station === selectedStation
    );
    displayAttractions(filteredAttractions);
  }

  function displayAttractions(attractions) {
    attractionsGrid.innerHTML = "";
    attractions.forEach(attraction => {
      const card = document.createElement("div");
      card.classList.add("attraction-card");

      const price = attraction.distance * pricePerKm;

      card.innerHTML = `
        <h4>${attraction.name}</h4>
        <p>Distance: ${attraction.distance} km</p>
        <div class="price-badge">Price: ¥${price}</div>
        <button onclick="window.open('https://www.google.com/maps/dir/${encodeURIComponent(stationSelect.value)}/${encodeURIComponent(attraction.name)}', '_blank')">View Route</button>
        <button class="book-btn">Book Ride</button>
      `;

      // Book ride button
      card.querySelector(".book-btn").addEventListener("click", () => {
        const booking = {
          city: selectedCity,
          station: stationSelect.value,
          attraction: attraction.name,
          distance: attraction.distance,
          price: price,
          time: new Date().toLocaleString()
        };
        localStorage.setItem("currentBooking", JSON.stringify(booking));
        alert("Booking confirmed!");
        window.location.href = "payment.html";
      });

      attractionsGrid.appendChild(card);
    });
  }

  // On station change
  stationSelect.addEventListener("change", populateAttractions);

  // Search attractions
  attractionSearch.addEventListener("input", () => {
    const query = attractionSearch.value.toLowerCase();
    const results = filteredAttractions.filter(a => a.name.toLowerCase().includes(query));
    displayAttractions(results);
  });

});
