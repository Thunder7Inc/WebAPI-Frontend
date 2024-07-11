const withdrawlBtn = document.getElementById("withdrawlBtn");

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

withdrawlBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("accountNumber").value;
  const amount = document.getElementById("amount").value;
  const pin = document.getElementById("pin").value;

  fetch("https://thunderapi.azurewebsites.net/api/Transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId: accountNumber,
      type: 1,
      amount: amount,
      pin: pin,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      res.json();
      showToast(`Successfully Withdrawl of amount ${amount}`, 1000, "green");
    })
    .catch((error) => {
      showToast(error, 3000, "red");
      console.error("Error fetching data:", error);
    });
  document.getElementById("withdrawForm").reset();
});
