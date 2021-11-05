import "regenerator-runtime/runtime";

/*function getCity() {
    prompt
}*/

async function getWeather() {
  const city = prompt("City?");
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=82d857531cd7e980cf7eb2bfca144bfb",
    { mode: "cors" }
  );
  const weather = await response.json();
  console.log(weather);
}
getWeather();
