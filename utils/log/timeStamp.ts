export function formattedTimeStamp() {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  return formattedDate
}
