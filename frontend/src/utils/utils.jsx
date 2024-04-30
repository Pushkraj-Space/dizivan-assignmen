
export function getDateAndTime(timestamp) {
  timestamp = new Date(timestamp).getTime() - 330 * 60 * 1000;
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `${minutes}` : minutes;

  return `${day} ${month} ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
}

// export function convertToTitleCaseFromUnderscores(text) {
//   return text
//     .split("_")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }

export function convertToTitleCaseFromUnderscores(text) {
  if (!text || typeof text !== 'string') {
      return ''; 
  }

  return text
      .split("_")
      .map((word) => {
          const firstLetter = word.charAt(0).toUpperCase();
          const restOfWord = word.slice(1).toLowerCase();
          return firstLetter + restOfWord;
      })
      .join(" ");
}



export function convertWeightToKg(weight, unit) {
  switch (unit) {
    case "kilograms":
      return weight;
    case "grams":
      return weight / 1000;
    case "pounds":
      return weight * 0.453592;
    default:
      return weight;
  }
}

export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isMobileNumberValid(mobileNumber) {
  const regex = /^\d{10}$/;
  return regex.test(mobileNumber);
}

export function getDateOnly(timestamp) {
  if (
    !timestamp ||
    timestamp == null ||
    timestamp == undefined ||
    timestamp == "" ||
    timestamp == "null"
  )
    return;
  timestamp = new Date(timestamp).getTime() - 330 * 60 * 1000;
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function addEllipsis(text, maxLenght = 20) {
  if (text && text.length > maxLenght) {
    return text.substring(0, maxLenght - 3) + "...";
  } else {
    return text;
  }
}

export function sendMessage(data) {
  // alert("Hello world")
  let obj = {
    slug: data?.slug,
  };
  // alert(obj?.slug)
  // if(window.top.location.host !== 'www.bharatgo.com') return true;
  window.top.postMessage(JSON.stringify(obj), "https://www.bharatgo.com");
  // window.top.postMessage(JSON.stringify(obj), "http://localhost:4200");
}

export const formatNumberWithCommas = (number) => {
  const formattedNumber = "" + parseFloat(number);

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumberWithCommasNum = (number) => {
  // Check if the number has decimal values
  let formattedNumber = Number.isInteger(number)
    ? number.toFixed(0)
    : Math.floor(number);

  formattedNumber = +formattedNumber;

  return formattedNumber.toLocaleString("en-IN");
};

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

  // Convert hours to 12-hour format
  if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  // Zero-padding for single-digit day and minutes
  const formattedDay = (day < 10 ? "0" : "") + day;
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

  return `${formattedDay}-${months[monthIndex]}-${year} ${hours}:${formattedMinutes} ${ampm}`;
}

export function convertTo12HourFormat(time24) {
  // Split hours and minutes
  var [hours, minutes] = time24.split(":");

  // Convert hours to integer
  hours = parseInt(hours);

  // Determine AM or PM
  var meridiem = hours >= 12 ? "PM" : "AM";

  // Adjust hours for 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (00:00) as 12 AM

  // Add leading zero to single digit hours and minutes
  hours = hours < 10 ? "0" + hours : hours;

  // Return time in 12-hour format
  return `${hours}:${minutes} ${meridiem}`;
}

export function arrToString(arr) {
  let str = "";
  for (let i = 0; i < arr.length - 1; i++) {
    str = str + arr[i] + ", ";
  }

  str = str + arr[arr.length - 1];
  return str;
}

export function formatDateTwo(inputDate) {
  const parts = inputDate.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  // Create a Date object
  const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date object

  // Define months array for conversion
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

  // Format the date
  const formattedDate = `${day} ${months[month - 1]} ${year}`;

  return formattedDate;
}

export async function getBharatGoId(domain) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/vendor/cd/${domain}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve(data.payload);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function productNameShortner(productName) {
  if (productName.length > 35) {
    const shortenedProductName = productName.slice(0, 30) + "...";
    return shortenedProductName;
  }
  return productName;
}

export function customerNameShortner(name) {
  if (name.length > 11) {
    const shortenedName = name.slice(0, 11) + "...";
    return shortenedName;
  }
  return name;
}



export async function isEmailDisposable(email){
  const url = `https://disposable.debounce.io/?email=${email}`;
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const respDispo = await fetch(url, options);
  const data = await respDispo.json();
  return data?.disposable == 'true';
}

export function getDifferenceInDate(targetDateString){
  // Assuming you have a date string in the format "YYYY-MM-DD"
  const targetDate = new Date(targetDateString);
  const currentDate = new Date();
  const timeDiff = targetDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff > 0) {
    return daysDiff;
  }
  return 0;
}
