// -------------------------------------------
// Set Username
// -------------------------------------------
$(".hello").text(`Hello ${settings.username}`);

// -------------------------------------------
// Background Image
// -------------------------------------------
const images = settings.images;
const path = settings.imagespath;

const randomBg = images[Math.floor(Math.random() * images.length)];
const bg = path + randomBg;

$("body").css({
  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
  "background-repeat": "no-repeat",
  "background-size": "100% auto",
  "background-position": "center top",
  "background-attachment": "fixed",
});

// -------------------------------------------
// Timer
// -------------------------------------------
const displayTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  hour = padDigit(hour);
  min = padDigit(min);
  sec = padDigit(sec);

  $("#clock").text(`${hour} : ${min} : ${sec}`);

  const t = setTimeout(function () {
    displayTime();
  }, 1000);
};

const padDigit = (digit) => {
  if (digit < 10) return `0${digit}`;
  return digit;
};

displayTime();

// ------------------------------------------
// Get Favicon
// ------------------------------------------
const insertLinks = () => {
  $.each(settings.links, function (title, link) {
    let linkElement = createLink(title, link);
    $(".icons").append(linkElement);
  });
};

const createLink = (title, link) => {
  const linkElement = document.createElement("a");
  linkElement.href = link;
  linkElement.text = `${title} `;
  linkElement.appendChild(getFavicon(link, 32));
  return linkElement;
};

const getFavicon = (domain, size) => {
  const faviconImg = document.createElement("img");
  faviconImg.src = `https://s2.googleusercontent.com/s2/favicons?sz=${size}&domain=${domain}`;
  return faviconImg;
};

insertLinks();

// ------------------------------------------
// Date
// ------------------------------------------
const setDate = () => {
  const today = new Date();
  const userLang = navigator.language || navigator.userLanguage;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleString(userLang, options);
};

$("#date").text(setDate());

// ------------------------------------------
// Set search action
// ------------------------------------------
$("#searchForm").attr("action", settings.search);

// ------------------------------------------
// Put focus on search
// ------------------------------------------
document.getElementById("serchBox").focus();
