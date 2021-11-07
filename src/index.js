/* eslint-disable no-alert */
import "regenerator-runtime/runtime";
import "./style.css";

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

//  function getCity() {
//    let city = "";
//    const form = document.querySelector("form");
//    form.addEventListener("submit", () => {
//      city = form.value;
//    });
//  }

async function getWeatherLong(city) {
  // let city = "Helsinki";
  // const form = document.querySelector("form");
  // form.addEventListener("submit", (event) => {
  //  event.preventDefault();
  //  city = form.value;
  //  console.log(city);
  // });
  try {
    //  const city = prompt("City?");
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

      const cityChoice = new Weather(
        temp,
        weatherIcon,
        windSpeed,
        windDeg,
        time,
        weatherDesc
      );
      console.log(cityChoice);
      renderWeather(cityChoice, city);
    }
    //  console.log(`${kokeilu.temp} celsius`);
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
    // const city = "Helsinki";
    // await getCity();
    await getWeatherLong(city);
  });
}

runAll();
