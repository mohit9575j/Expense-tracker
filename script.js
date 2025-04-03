document.addEventListener("DOMContentLoaded", loadExpenses);

 document.getElementById("expense-form").addEventListener("submit", function (event) {
    event.preventDefault();

     const desc = document.getElementById("expense-desc").value.trim();
    const amount = document.getElementById("expense-amount").value.trim();
    const category = document.getElementById("expense-category").value;

    if (!desc || !amount || !category) {
        alert("Please fill all fields.");
        return;
    }

    const expense = { id: Date.now(), desc, amount, category };

     let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

     addExpenseToTable(expense);

     document.getElementById("expense-form").reset();
});

 function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.forEach(addExpenseToTable);
}

 function addExpenseToTable(expense) {
    const tableBody = document.getElementById("expense-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.desc}</td>
        <td>₹${expense.amount}</td>
        <td>${expense.category}</td>
        <td><button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">Delete</button></td>
    `;

    tableBody.appendChild(row);
}

 document.getElementById("expense-list").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.getAttribute("data-id");
        deleteExpense(id);
        event.target.closest("tr").remove();
    }
});

 function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = expenses.filter(expense => expense.id != id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
