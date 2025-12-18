document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     REGISTRATION LOGIC
     ========================= */
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Save user info in localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("userLoggedIn", "true");

      alert("Registration successful!");
      window.location.href = "booking.html";
    });
  }


  /* =========================
     LOGIN LOGIC
     ========================= */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("userLoggedIn", "true");
        alert("Login successful!");
        window.location.href = "booking.html";
      } else {
        alert("Invalid email or password");
      }
    });
  }

});
