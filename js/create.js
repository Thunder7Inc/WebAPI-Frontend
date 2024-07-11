var IP = "http://thunderapi.azurewebsites.net/api/v1";

document.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
});

async function validateForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  let isValid = true;

  if (username === "") {
    isValid = false;
  } else if (username.length < 1) {
    isValid = false;
  }

  if (password === "") {
    isValid = false;
  } else if (password.length < 3) {
    isValid = false;
  }

  if (isValid) {
    try {
      const response = await fetch(`${IP}/Account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          pin: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      showToast("Account created successfully", 1000, "#37bc6c"); // Add toast for successful account creation
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
const CreateAccount = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const pin = document.getElementById("pin").value;

  fetch(`https://thunderapi.azurewebsites.net/api/v1/Account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "text/plain",
    },
    body: JSON.stringify({
      name: name,
      pin: pin,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      Toastify({
        text: `Account created successfully! ID: ${data.id}`,
        duration: 3000,
        backgroundColor: "#28a745",
      }).showToast();
    })
    .catch((error) => {
      Toastify({
        text: "Error creating account!",
        duration: 3000,
        backgroundColor: "#dc3545",
      }).showToast();
      console.error("Error fetching data:", error);
    });
};

function showToast(message, duration = 1000, color) {
  console.log("Toasted");
  Toastify({
    text: message,
    duration: duration,
    gravity: "top",
    position: "center",
    close: true,
    backgroundColor: color,
  }).showToast();
}
