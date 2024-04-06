const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const dateGenerator = (timestamp:string) => {

  const fullDate = new Date(timestamp);
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();

  return `${date} ${month}`
}

export const fullDateGenerator = (timestamp:string) => {

  const fullDate = new Date(timestamp);
  const year = fullDate.getFullYear();
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();

  return `${date} ${month} ${year}`
}
