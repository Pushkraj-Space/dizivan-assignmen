export function formatDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let ampm = "AM";
  
    if (hours >= 12) {
      ampm = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }
  
    const formattedDay = (day < 10 ? "0" : "") + day;
    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  
    return `${formattedDay}-${months[monthIndex]}-${year} ${hours}:${formattedMinutes} ${ampm}`;
}