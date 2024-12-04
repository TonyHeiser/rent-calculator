// function manageSalariesForRent(manSalary, womanSalary, rent) {
//   return rent / (manSalary / 100 + womanSalary / 100);
// }

// console.log(manageSalariesForRent(10000, 5000, 4000));
// console.log(manageSalariesForRent(3000, 1500, 5000));

// function manageSalariesForRent2(arr, rent) {
//   let percents = arr.map(e => e * 0.01).reduce((a, b) => a + b);
//   return rent / percents
// }

// console.log(manageSalariesForRent2([10000, 5000, 7000], 4000));

function manageSalariesForRentOptimized(arr, rent) {
  if (arr.length === 0) {
    return "Error: Zero Residents.";
  }

  if (arr.some(salary => salary <= 0)) {
    return "Error: Salary cannot be less than or equal to zero.";
  }

  const totalSalary = arr.reduce((a, b) => a + b);
  if (totalSalary < rent) {
    return "Error: Total salaries are less than the rent."
  }

  return rent / totalSalary * 100
}

console.log(manageSalariesForRentOptimized([10000, 5000, 7000], 4000));
console.log(manageSalariesForRentOptimized([10000], 4000));

