document.addEventListener("DOMContentLoaded", () => {
  // Redirect if not logged in
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login to access dashboard");
    window.location.href = "login.html";
    return;
  }

  // User info
  const userName = document.getElementById("userName");
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");

  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  userName.textContent = name;
  profileName.textContent = name;
  profileEmail.textContent = email;

  // Current booking
  const currentBookingDiv = document.getElementById("currentBooking");
  let currentBooking = JSON.parse(localStorage.getItem("currentBooking"));

  if (currentBooking) {
    currentBookingDiv.innerHTML = `
      <p><strong>City:</strong> ${currentBooking.city}</p>
      <p><strong>Station:</strong> ${currentBooking.station}</p>
      <p><strong>Attraction:</strong> ${currentBooking.attraction}</p>
      <p><strong>Distance:</strong> ${currentBooking.distance} km</p>
      <p><strong>Price:</strong> ¥${currentBooking.price}</p>
      <p><strong>Time:</strong> ${currentBooking.time}</p>
      <button onclick="window.location.href='payment.html'">Proceed to Payment</button>
    `;
  } else {
    currentBookingDiv.textContent = "No current booking.";
  }

  // Booking history (dummy data)
  const bookingHistoryDiv = document.getElementById("bookingHistory");
  const dummyHistory = [
    { city: "Tokyo", station: "Tokyo Station", attraction: "Tokyo Tower", distance: 3.0, price: 150, time: "2025-12-10 10:00" },
    { city: "Osaka", station: "Namba Station", attraction: "Dotonbori", distance: 2.0, price: 100, time: "2025-12-11 14:00" },
    { city: "Kyoto", station: "Gion Station", attraction: "Gion District", distance: 2.0, price: 100, time: "2025-12-12 09:00" }
  ];

  dummyHistory.forEach(b => {
    const card = document.createElement("div");
    card.classList.add("booking-history-card");
    card.innerHTML = `
      <p><strong>City:</strong> ${b.city}</p>
      <p><strong>Station:</strong> ${b.station}</p>
      <p><strong>Attraction:</strong> ${b.attraction}</p>
      <p><strong>Distance:</strong> ${b.distance} km</p>
      <p><strong>Price:</strong> ¥${b.price}</p>
      <p><strong>Time:</strong> ${b.time}</p>
    `;
    bookingHistoryDiv.appendChild(card);
  });

  // Show/hide booking history
  const historySection = document.getElementById("historySection");
  document.getElementById("showHistoryBtn").addEventListener("click", () => {
    historySection.classList.toggle("hidden");
  });

  // Ride Status (dummy)
  const rideStatus = document.getElementById("rideStatus");
  rideStatus.textContent = currentBooking ? "Ride scheduled" : "No ride in progress";

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "login.html";
  });
});
