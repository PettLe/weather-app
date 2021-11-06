/* eslint-disable no-alert */
import "regenerator-runtime/runtime";
import "./style.css";

/* async function getWeather() {
  const city = prompt("City?");
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=82d857531cd7e980cf7eb2bfca144bfb`,
    // eslint-disable-next-line comma-dangle
    { mode: "cors" }
  );
  const currentWeather = await response.json();
  console.log(currentWeather);
  //  const clouds = await currentWeather.weather[0];
  //  console.log(clouds);
  const weatherIcon = await currentWeather.weather[0].icon;

  const temp = await currentWeather.main.temp;
  console.log(`${(temp - 273).toFixed(1)} celsius`);

  const container = document.getElementById("container");
  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
  container.appendChild(img);
} */

function renderWeather(weatherObject, city) {
  const container = document.getElementById("mainContent");

  const pTemp = document.createElement("p");
  pTemp.textContent = `Temperature is ${weatherObject.temp} celsius`;

  const weatherImg = document.createElement("img");
  weatherImg.classList.add("weatherImg");
  weatherImg.src = `http://openweathermap.org/img/w/${weatherObject.clouds}.png`;

  const pTime = document.createElement("p");
  pTime.textContent = `${weatherObject.time}`;

  const pDesc = document.createElement("p");
  pDesc.textContent = `There will be ${weatherObject.rain}`;

  const weatherContainer = document.createElement("div");
  weatherContainer.id = "weatherContainer";

  const weatherInfo = document.createElement("div");
  const weatherHeader = document.createElement("div");
  weatherHeader.id = "weatherHeader";
  const headerCity = document.createElement("h2");
  headerCity.classList.add("headerList");
  headerCity.textContent = city;
  weatherHeader.appendChild(headerCity);

  weatherInfo.appendChild(pTime);
  weatherInfo.appendChild(pTemp);
  weatherInfo.appendChild(pDesc);
  weatherInfo.appendChild(weatherImg);
  weatherContainer.appendChild(weatherHeader);
  weatherContainer.appendChild(weatherInfo);
  //  container.appendChild(weatherHeader);

  const headerList = document.querySelectorAll("#weatherContainer");
  for (let j = 0; j < headerList.length; j++) {
    if (headerList[j] !== 2) {
      headerCity.style.visibility = "hidden";
    }
  }
  container.appendChild(weatherContainer);
}

async function getWeatherLong() {
  try {
    const city = prompt("City?");
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&&units=metric&cnt=5&APPID=82d857531cd7e980cf7eb2bfca144bfb`,
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

    // const headerCity = document.createElement("h2");
    // headerCity.textContent = city;
    // const weatherContainer = document.getElementById("weathercontainer");
    // weatherContainer.appendChild(headerCity);

    const currentWeather = await response.json();
    console.log(currentWeather.list);
    for (let i = 0; i < 5; i++) {
      const weatherIcon = currentWeather.list[i].weather[0].icon;
      const windSpeed = currentWeather.list[i].wind.speed;
      const windDeg = currentWeather.list[i].wind.deg;
      const weatherDesc = currentWeather.list[i].weather[0].description;
      const { temp } = currentWeather.list[i].main;
      const time = currentWeather.list[i].dt_txt;

      //  console.log(windSpeed);
      //  console.log(windDeg);
      //  console.log(weatherDesc);
      //  console.log(`${temp} celsius`);
      //  console.log(time);

      //  const container = document.getElementById("container");
      //  const weatherImg = document.createElement("img");
      //  weatherImg.classList.add("weatherImg");
      //  weatherImg.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      //  container.appendChild(weatherImg);

      const kokeilu = new Weather(
        temp,
        weatherIcon,
        windSpeed,
        windDeg,
        time,
        weatherDesc
      );
      console.log(kokeilu);
      renderWeather(kokeilu, city);
    }
    //  console.log(`${kokeilu.temp} celsius`);
  } catch {
    alert("City not found. Try again!");
  }
}

// getWeather();
getWeatherLong();
