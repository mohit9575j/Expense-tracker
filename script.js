document.addEventListener("DOMContentLoaded", loadExpenses);

// Form submit event listener
document.getElementById("expense-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Input values lena
    const desc = document.getElementById("expense-desc").value.trim();
    const amount = document.getElementById("expense-amount").value.trim();
    const category = document.getElementById("expense-category").value;

    if (!desc || !amount || !category) {
        alert("Please fill all fields.");
        return;
    }

    const expense = { id: Date.now(), desc, amount, category };

    // Local Storage me save karna
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Table me show karna
    addExpenseToTable(expense);

    // Form reset karna
    document.getElementById("expense-form").reset();
});

// Function to load existing expenses from Local Storage
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.forEach(addExpenseToTable);
}

// Function to add expense to table
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

// Event listener for delete button
document.getElementById("expense-list").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.getAttribute("data-id");
        deleteExpense(id);
        event.target.closest("tr").remove();
    }
});

// Function to delete expense from Local Storage
function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = expenses.filter(expense => expense.id != id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
