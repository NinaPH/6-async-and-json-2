// https://github.com/basmilius/weather-icons

let cityInputEl = document.getElementById("city");
let button = document.querySelector(".city-search");

let cityImageEl = document.querySelector(".city-image");
let weatherIconEl = document.querySelector(".weather-icon");
let degreesEl = document.querySelector(".degrees");
let conditionEl = document.querySelector(".condition");
let windEl = document.querySelector(".wind");
let humidityEl = document.querySelector(".humidity");
let cloudsEl = document.querySelector(".clouds");
let dateEl = document.querySelector(".date");

let today = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

const formattedDate = today.toLocaleDateString("en-US", options);
dateEl.textContent = formattedDate;

button.addEventListener("click", () => {
  let city = cityInputEl.value;
  fetchData(city);
});

async function fetchData(city) {
  try {
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
    );

    const weatherData = await weatherRes.json();

    let weatherIcon = weatherData.current.condition.icon;
    let degrees = weatherData.current.temp_c;
    let condition = weatherData.current.condition.text;
    let wind = weatherData.current.wind_kph;
    let humidity = weatherData.current.humidity;
    let clouds = weatherData.current.cloud;

    weatherIconEl.src = weatherIcon;
    degreesEl.textContent = `${degrees} °C`;
    conditionEl.textContent = condition;
    windEl.textContent = `${wind} km/h wind`;
    humidityEl.textContent = `${humidity}% humidity`;
    cloudsEl.textContent = `${clouds}% cloud coverage`;

    const imageRes = await fetch(
      `https://api.pexels.com/v1/search?query=${condition}`,
      {
        headers: { Authorization: imageApiKey },
      }
    );

    const imageData = await imageRes.json();

    cityImageEl.src = imageData.photos[0].src.original;
  } catch (err) {
    console.log(err);
  }
}

/*
fetch(`https://api.pexels.com/v1/search?query=${weather}`, {
  headers: { Authorization: apiKey },
})
  .then((res) => res.json())
  .then((data) => {
    cityImageEl.src = data.photos[0].src.original;
  });



fetch(
  `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
)
  .then((res) => res.json())
  .then((data) => {
    let condition = data.current.condition.text;
    let degrees = data.current.temp_c;
    let wind = data.current.wind_kph;
    let humidity = data.current.humidity;
    let clouds = data.current.cloud;

    conditionEl.textContent = condition;
    degreesEl.textContent = `${degrees} °C`;
    windEl.textContent = `${wind} km/h wind`;
    humidityEl.textContent = `${humidity}% humidity`;
    cloudsEl.textContent = `${clouds}% cloud coverage`;

    console.log(data);
  });
*/
