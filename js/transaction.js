const Transaction = () => {
  fetch("https://thunderapi.azurewebsites.net/api/Transaction", {
    method: "GET",
  })
    .then(async (res) => {
      var transactionCard = document.getElementById("card-container");
      var transactions = await res.json();
      var cardsHTML = transactions.map((transaction) => {
        return `
      <div class="card" style="width: 18rem; margin:0 5px;">
  <div class="card-body">
    <h5 class="card-title">Transaction Number : ${transaction.accountId}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Transaction Type :  ${transaction.type}</h6>
    <p class="card-text">Transaction Amount : ${transaction.amount}</p>
    
  </div>
</div>
      `;
      });

      transactionCard.innerHTML = cardsHTML.join("");
    })
    .then(console.log);
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
