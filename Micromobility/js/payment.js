document.addEventListener("DOMContentLoaded", () => {
  const bookingDetails = document.getElementById("bookingDetails");
  const paymentMethod = document.getElementById("paymentMethod");
  const changeMethodBtn = document.getElementById("changeMethodBtn");
  const payNowBtn = document.getElementById("payNowBtn");

  let currentBooking = JSON.parse(localStorage.getItem("currentBooking"));

  if (!currentBooking) {
    alert("No booking found. Please book a ride first.");
    window.location.href = "booking.html";
    return;
  }

  // Display booking details
  bookingDetails.innerHTML = `
    <p><strong>City:</strong> ${currentBooking.city}</p>
    <p><strong>Station:</strong> ${currentBooking.station}</p>
    <p><strong>Attraction:</strong> ${currentBooking.attraction}</p>
    <p><strong>Distance:</strong> ${currentBooking.distance} km</p>
    <p><strong>Price:</strong> ¥${currentBooking.price}</p>
  `;

  changeMethodBtn.addEventListener("click", () => {
    alert(`Payment method changed to: ${paymentMethod.value}`);
  });

  payNowBtn.addEventListener("click", () => {
    alert(`Payment of ¥${currentBooking.price} completed using ${paymentMethod.value}`);
    // Add to booking history
    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    history.push(currentBooking);
    localStorage.setItem("bookingHistory", JSON.stringify(history));
    localStorage.removeItem("currentBooking");
    window.location.href = "dashboard.html";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "login.html";
  });
});
