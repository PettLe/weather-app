/* eslint-disable max-classes-per-file */
/* eslint-disable no-alert */
import "regenerator-runtime/runtime";
import "./style.css";

function renderWeather(weatherObject, city) {
  const container = document.getElementById("mainContent");

  const pTemp = document.createElement("p");
  pTemp.innerHTML = `Temperature is <strong>${weatherObject.temp}</strong> celsius`;

  const weatherImg = document.createElement("img");
  weatherImg.classList.add("weatherImg");
  weatherImg.src = `https://openweathermap.org/img/w/${weatherObject.clouds}.png`;

  const pTime = document.createElement("p");
  pTime.id = "pTime";
  pTime.textContent = `${weatherObject.time}`;

  const compassSector = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  const windDirection =
    compassSector[(weatherObject.windDeg / 22.5).toFixed(0)];

  const pDesc = document.createElement("p");
  pDesc.innerHTML = `There will be <u><em>${weatherObject.rain}</em></u>, <br>and the wind blows <strong>${windDirection} ${weatherObject.wind}</strong> m/s`;

  const weatherContainer = document.createElement("div");
  weatherContainer.id = "weatherContainer";

  const weatherInfo = document.createElement("div");
  const weatherHeader = document.createElement("div");
  weatherHeader.id = "weatherHeader";
  const headerCity = document.createElement("h2");
  headerCity.classList.add("headerList");
  headerCity.textContent = city
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
  weatherHeader.appendChild(headerCity);

  weatherInfo.appendChild(pTime);
  weatherInfo.appendChild(pTemp);
  weatherInfo.appendChild(pDesc);
  weatherInfo.appendChild(weatherImg);
  weatherContainer.appendChild(weatherHeader);
  weatherContainer.appendChild(weatherInfo);

  const headerList = document.querySelectorAll("#weatherContainer");
  for (let j = 0; j < headerList.length; j++) {
    if (headerList[j] !== 2) {
      headerCity.style.visibility = "hidden";
    }
  }
  container.appendChild(weatherContainer);
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&units=metric&APPID=82d857531cd7e980cf7eb2bfca144bfb`,
      // eslint-disable-next-line comma-dangle
      { mode: "cors" }
    );

    class Weather {
      constructor(temp, clouds, wind, windDeg, time, rain) {
        this.temp = temp;
        this.clouds = clouds;
        this.wind = wind;
        this.windDeg = windDeg;
        this.time = time;
        this.rain = rain; // Weather description?
      }
    }

    const currentWeather = await response.json();
    for (let i = 0; i < 5; i++) {
      const weatherIcon = currentWeather.list[i].weather[0].icon;
      const windSpeed = currentWeather.list[i].wind.speed;
      const windDeg = currentWeather.list[i].wind.deg;
      const weatherDesc = currentWeather.list[i].weather[0].description;
      const { temp } = currentWeather.list[i].main;
      const time = currentWeather.list[i].dt_txt;

      const cityChoice = new Weather(
        temp,
        weatherIcon,
        windSpeed,
        windDeg,
        time,
        weatherDesc
      );
      renderWeather(cityChoice, city);
    }
  } catch {
    alert("City not found. Try again!");
  }
}

async function getWeatherLong(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&&units=metric&APPID=82d857531cd7e980cf7eb2bfca144bfb`,
      // eslint-disable-next-line comma-dangle
      { mode: "cors" }
    );

    class Weather {
      constructor(temp, clouds, wind, windDeg, time, rain) {
        this.temp = temp;
        this.clouds = clouds;
        this.wind = wind;
        this.windDeg = windDeg;
        this.time = time;
        this.rain = rain; // Weather description?
      }
    }

    const currentWeather = await response.json();
    for (let i = 0; i < 40; i += 8) {
      const weatherIcon = currentWeather.list[i].weather[0].icon;
      const windSpeed = currentWeather.list[i].wind.speed;
      const windDeg = currentWeather.list[i].wind.deg;
      const weatherDesc = currentWeather.list[i].weather[0].description;
      const { temp } = currentWeather.list[i].main;
      const time = currentWeather.list[i].dt_txt;

      const cityChoice = new Weather(
        temp,
        weatherIcon,
        windSpeed,
        windDeg,
        time,
        weatherDesc
      );
      renderWeather(cityChoice, city);
    }
  } catch {
    alert("City not found. Try again!");
  }
}
async function runAll() {
  const button = document.getElementById("btn");
  button.addEventListener("click", async (event) => {
    const content = document.getElementById("mainContent");
    content.innerHTML = "";
    const city = document.getElementById("cityInput").value;
    event.preventDefault();
    await getWeather(city);
  });
  const button2 = document.getElementById("btn2");
  button2.addEventListener("click", async (event) => {
    const content = document.getElementById("mainContent");
    content.innerHTML = "";
    const city = document.getElementById("cityInput").value;
    event.preventDefault();
    await getWeatherLong(city);
  });
}

runAll();
