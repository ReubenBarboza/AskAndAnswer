export function getDateFromFirestoreTimestamp(timestamp) {
  function ordinalSuffixOf(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  }
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

  return `${timestamp.toDate().getDate()}${ordinalSuffixOf(
    timestamp.toDate().getDate()
  )} ${monthNames[timestamp.toDate().getMonth()]}, ${timestamp
    .toDate()
    .getFullYear()}`;
}
