function generateSalaryInputs() {
  const residents = parseInt(document.getElementById("residents").value);

  if (residents > 100) {
    residents = 100;
    document.getElementById("residents").value = 100;
  }

  const residentsInputs = document.getElementById("residents-inputs");

  residentsInputs.innerHTML = "";

  for (i = 1; i <= residents; i++) {
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("salary-input");
    inputDiv.innerHTML = `
      <label for="salary${i}">Salary of Resident ${i}: </label>
      <input type="number" id="salary${i}" name="salary${i}" class="residents-inputs__input" required>
    `;
    residentsInputs.appendChild(inputDiv);
  }
}

function collectDataFromInputs() {
  const inputs = document.querySelectorAll(".residents-inputs__input");
  const values = Array.from(inputs).map(input => parseFloat(input.value) || 0);
  return values;
}

function manageSalariesForRentOptimized() {
  const arr = collectDataFromInputs();
  const rent = parseFloat(document.getElementById("rent").value) || 0;
  if (arr.length === 0) {
    return "<h2>Error: Zero Residents.</h2>";
  }

  if (arr.some(salary => salary <= 0)) {
    return "<h2>Error: Salary cannot be less than or equal to zero.</h2>";
  }

  const totalSalary = arr.reduce((a, b) => a + b);
  if (totalSalary < rent) {
    return "<h2>Error: Total salaries are less than the rent.</h2>"
  }

  const rentPercentage = (rent / totalSalary) * 100;
  const payments = arr.map((salary, index) => ({
    resident: `Resident ${index + 1}`,
    amount: (salary / totalSalary * rent).toFixed(2),
  }));

  let resultHTML = `<p>Each person pays <span>${rentPercentage.toFixed(1)}%</span> of their salary.</p>`;
  resultHTML += `<h3>Payments: </h3>`;
  resultHTML += `<ul>`;
  payments.forEach(payment => {
    resultHTML += `<li>${payment.resident} pays: ${payment.amount}</li>`
  });
  resultHTML += `</ul>`;

  return resultHTML;
}

document.querySelector(".calculate-btn").addEventListener("click", function(event) {
  event.preventDefault();
  const result = manageSalariesForRentOptimized();
  const resultContainer = document.getElementById("result-container");
  const resultContainerDiv = document.querySelector(".result-container__div");
  resultContainerDiv.classList.add("show");
  resultContainer.innerHTML = result;
  resultContainerDiv.scrollIntoView({ behavior: "smooth", block: "start" });
})

