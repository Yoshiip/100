export function getFutureMonthYear(monthsToAdd: number): string {
  const startMonth = 8;
  const startYear = 2024;

  const newMonth = (startMonth + monthsToAdd) % 12;
  const yearsToAdd = Math.floor((startMonth + monthsToAdd) / 12);
  const newYear = startYear + yearsToAdd;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthNames[newMonth]} ${newYear}`;
}
