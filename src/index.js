/* eslint-disable no-alert */
import "regenerator-runtime/runtime";

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
getWeather();
