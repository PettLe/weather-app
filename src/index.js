/* eslint-disable no-alert */
import "regenerator-runtime/runtime";
import "./style.css";

async function getWeather() {
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
}

async function getWeatherLong() {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=helsinki&&units=metric&cnt=5&APPID=82d857531cd7e980cf7eb2bfca144bfb",
    // eslint-disable-next-line comma-dangle
    { mode: "cors" }
  );

  class Weather {
    constructor(temp, clouds, wind, time, rain) {
      this.temp = temp;
      this.clouds = clouds;
      this.wind = wind;
      this.time = time;
      this.rain = rain; // Weather description?
    }
  }

  const currentWeather = await response.json();
  //  console.log(currentWeather.list[3]);
  const weatherIcon = await currentWeather.list[3].weather[0].icon;
  const windSpeed = await currentWeather.list[3].wind.speed;
  //  console.log(windSpeed);
  const windDeg = await currentWeather.list[3].wind.deg;
  //  console.log(windDeg);
  const weatherDesc = await currentWeather.list[3].weather[0].description;
  //  console.log(weatherDesc);
  const { temp } = currentWeather.list[3].main;
  //  console.log(`${temp} celsius`);
  const time = await currentWeather.list[3].dt_txt;
  //  console.log(time);

  const container = document.getElementById("container");
  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
  container.appendChild(img);

  const kokeilu = new Weather(temp, weatherIcon, windSpeed, time, weatherDesc);
  console.log(kokeilu.rain);
  console.log(`${kokeilu.temp} celsius`);
}

// getWeather();
getWeatherLong();
