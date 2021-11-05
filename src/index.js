import "regenerator-runtime/runtime";

console.log("toimiiko?");

async function getWeather() {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=helsinki&APPID=82d857531cd7e980cf7eb2bfca144bfb",
    { mode: "cors" }
  );
  const weather = await response.json();
  //console.log(response.json());
  console.log(weather);
}
getWeather();
