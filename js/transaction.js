document.addEventListener("DOMContentLoaded", function () {
  fetchTransactions();
});

const fetchTransactions = () => {
  fetch("https://thunderapi.azurewebsites.net/api/Transaction", {
    method: "GET",
  })
    .then(async (res) => {
      const transactionCard = document.getElementById("card-container");
      const transactions = await res.json();
      const cardsHTML = transactions.map((transaction) => {
        const transactionType =
          transaction.type === 0 ? "Deposit" : "Withdrawal";
        const transactionDate = new Date(transaction.date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        return `
              <div class="col-md-4 mb-4">
                  <div class="card" style="width: 100%;">
                      <div class="card-body">
                          <h5 class="card-title">Transaction Number: ${transaction.accountId}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">Transaction Type: ${transactionType}</h6>
                          <p class="card-text">Transaction Amount: $${transaction.amount}</p>
                          <p class="card-text">Transaction Date: ${transactionDate}</p>
                      </div>
                  </div>
              </div>
          `;
      });

      transactionCard.innerHTML = cardsHTML.join("");
    })
    .catch(console.error);
};

function showToast(message, duration = 1000, color) {
  Toastify({
    text: message,
    duration: duration,
    gravity: "top",
    position: "center",
    close: true,
    backgroundColor: color,
  }).showToast();
}
