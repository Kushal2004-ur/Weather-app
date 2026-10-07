const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  try {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoURL);

    if (!geoResponse.ok) {
      throw new Error("Unable to find city.");
    }

    const geoData = await geoResponse.json();

    console.log("Geocoding Data:", geoData);

    // Check if city exists
    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found. Please enter a valid city.");
      return;
    }

    // Get first matching city
    const location = geoData.results[0];
    const latitude = location.latitude;
    const longitude = location.longitude;
    const name = location.name;

    console.log("City:", name);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    // -----------------------------
    // STEP 2: Get Weather Data
    // -----------------------------

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

    const weatherResponse = await fetch(weatherURL);

    if (!weatherResponse.ok) {
      throw new Error("Unable to get weather data.");
    }

    const weatherData = await weatherResponse.json();

    console.log("Weather Data:", weatherData);

    // -----------------------------
    // STEP 3: Get Current Weather
    // -----------------------------

    const current = weatherData.current;
    const temp = current.temperature_2m;
    const humidityValue = current.relative_humidity_2m;
    const feelsLikeValue = current.apparent_temperature;
    const windValue = current.wind_speed_10m;
    const weatherCode = current.weather_code;

    // -----------------------------
    // STEP 4: Display Data
    // -----------------------------

    cityName.textContent = name;
    temperature.textContent = `${temp}°C`;
    feelsLike.textContent = `${feelsLikeValue}°C`;
    humidity.textContent = `${humidityValue}%`;
    windSpeed.textContent = `${windValue} km/h`;

    // Get weather description and icon
    const weatherInfo = getWeatherDescription(weatherCode);
    description.textContent = weatherInfo.description;
    weatherIcon.textContent = weatherInfo.icon;
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
}
// -------------------------------------
// Convert Weather Code → Description
// -------------------------------------

function getWeatherDescription(code) {
  if (code === 0) {
    return {
      description: "Clear Sky",
      icon: "☀️",
    };
  } else if (code === 1 || code === 2) {
    return {
      description: "Partly Cloudy",
      icon: "🌤️",
    };
  } else if (code === 3) {
    return {
      description: "Overcast",
      icon: "☁️",
    };
  } else if (code === 45 || code === 48) {
    return {
      description: "Foggy",
      icon: "🌫️",
    };
  } else if (code >= 51 && code <= 67) {
    return {
      description: "Rainy",
      icon: "🌧️",
    };
  } else if (code >= 71 && code <= 77) {
    return {
      description: "Snowy",
      icon: "❄️",
    };
  } else if (code >= 80 && code <= 82) {
    return {
      description: "Rain Showers",
      icon: "🌦️",
    };
  } else if (code >= 95 && code <= 99) {
    return {
      description: "Thunderstorm",
      icon: "⛈️",
    };
  } else {
    return {
      description: "Unknown",
      icon: "🌡️",
    };
  }
}
