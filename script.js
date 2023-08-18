async function getWeather() {
  const searchValue = document.querySelector("#search").value;
  document.querySelector("#search").value = "";
  console.log(searchValue);
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=d909a6354d63493b908175646231808&q=${searchValue}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  showWeather(data);
}

function showWeather(weather) {
  const showArea = document.querySelector(".show");
  showArea.innerHTML = "";
  const placeName = createPart("h3", weather.location.name);
  showArea.appendChild(placeName);

  const regionName = createPart("h4", weather.location.region);
  showArea.appendChild(regionName);

  const currentWeather = createPart("h3", weather.current.condition.text);
  currentWeather.classList.add("emphasis");
  showArea.appendChild(currentWeather);

  const weatherIcon = createPart("img");
  weatherIcon.src = weather.current.condition.icon;
  showArea.appendChild(weatherIcon);

  const currentTemp = createPart(
    "h4",
    `${weather.current.temp_f} Degrees Fahrenheit`
  );
  showArea.appendChild(currentTemp);

  const feelsLike = createPart(
    "h4",
    `Feels like ${weather.current.feelslike_f} Degrees`
  );
  showArea.appendChild(feelsLike);
}

function createPart(type, content) {
  const part = document.createElement(type);
  part.innerHTML = content;
  part.classList.add("card");
  return part;
}
