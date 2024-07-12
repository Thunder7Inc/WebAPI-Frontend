const LoadTransactions = () => {
  fetch("https://thunderapi.azurewebsites.net/api/Transaction", {
    method: "GET",
  })
    .then(async (res) => {
      var transactions = await res.json();
      populateDataTable(transactions);
    })
    .catch((error) => {
      console.error("Error fetching transactions:", error);
    });
};

const populateDataTable = (transactions) => {
  // Destroy the existing DataTable if it exists
  // if ($.fn.dataTable.isDataTable("#transactionsTable")) {
  $("#transactionsTable").DataTable().destroy();
  // }

  var dataTable = $("#transactionsTable").DataTable({
    data: transactions,
    columns: [
      { data: "id" },
      { data: "accountId" },
      {
        data: "type",
        render: function (data, type, row) {
          return data === 0 ? "Deposit" : "Withdrawal";
        },
        createdCell: function (td, cellData) {
          $(td).addClass(cellData === 0 ? "table-success" : "table-danger");
        },
      },
      { data: "amount" },
      {
        data: "date",
        render: function (data) {
          const dateObj = new Date(data);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTime = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          return `${formattedDate} ${formattedTime}`;
        },
      },
    ],
    columnDefs: [{ orderable: false, targets: 2 }],
    pagingType: "full_numbers",
    language: {
      paginate: {
        previous: '<span class="fa fa-chevron-left"></span>',
        next: '<span class="fa fa-chevron-right"></span>',
        first: '<span class="fa fa-angle-double-left"></span>',
        last: '<span class="fa fa-angle-double-right"></span>',
      },
      lengthMenu:
        'Display <select class="form-control input-sm">' +
        '<option value="3">3</option>' +
        '<option value="5">5</option>' +
        '<option value="10">10</option>' +
        '<option value="15">15</option>' +
        '<option value="20">20</option>' +
        '<option value="25">25</option>' +
        '<option value="-1">All</option>' +
        "</select> results",
    },
  });

  // Initial filtering
  $("#filterDeposit, #filterWithdraw").on("change", function () {
    dataTable.draw();
  });

  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    const depositFilter = $("#filterDeposit").is(":checked");
    const withdrawFilter = $("#filterWithdraw").is(":checked");
    const status = data[2];

    if (
      (depositFilter && status.includes("Deposit")) ||
      (withdrawFilter && status.includes("Withdrawal"))
    ) {
      return true;
    }
    return false;
  });

  // Apply initial filter
  dataTable.draw();
};

$(document).ready(() => {
  LoadTransactions();
});

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
