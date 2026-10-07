# Weather App 🌤️

A responsive Weather App built with **HTML, CSS, and JavaScript**. Users can search for a city and view its current weather using the **Open-Meteo Geocoding API** and **Open-Meteo Weather API**.

## Features

- 🌍 Search weather by city name
- 🌡️ Current temperature
- 🏙️ City name
- 🌡️ Feels-like temperature
- 💧 Humidity
- 🌬️ Wind speed
- ☁️ Weather description and icon
- ❌ Invalid-city and empty-input handling
- 📱 Responsive mobile design
- ⚡ Live API data
- 🔄 Async JavaScript with `async/await`

## Technologies Used

- **HTML5** — page structure
- **CSS3** — styling, layout, responsiveness, hover effects
- **JavaScript (ES6+)** — API requests, DOM manipulation and application logic
- **Open-Meteo API** — geocoding and weather data

## JavaScript Concepts Practiced

- `const` and `let`
- DOM manipulation
- `getElementById()`
- Event listeners
- Functions
- `async` / `await`
- `fetch()`
- Promises
- `try...catch`
- Template literals
- `encodeURIComponent()`
- Conditional statements
- Objects
- JSON parsing
- API responses
- Error handling

## Project Structure

```text
Weather-App/
│
├── index.html
├── style.css
├── index.js
└── README.md
```

## How It Works

### 1. Get the city name

The user enters a city and clicks **Search**.

```javascript
const city = cityInput.value.trim();
```

### 2. Find the city coordinates

The app first uses Open-Meteo's geocoding API to convert the city name into latitude and longitude.

```javascript
const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
```

The first matching location is selected:

```javascript
const location = geoData.results[0];
const latitude = location.latitude;
const longitude = location.longitude;
const name = location.name;
```

### 3. Request weather data

The coordinates are then used with the Open-Meteo forecast API:

```javascript
const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
```

The application retrieves:

- Temperature
- Relative humidity
- Apparent temperature
- Weather code
- Wind speed

### 4. Display the data

The weather information is inserted into the HTML using DOM manipulation:

```javascript
cityName.textContent = name;
temperature.textContent = `${temp}°C`;
feelsLike.textContent = `${feelsLikeValue}°C`;
humidity.textContent = `${humidityValue}%`;
windSpeed.textContent = `${windValue} km/h`;
```

### 5. Convert weather codes

`getWeatherDescription()` converts Open-Meteo weather codes into readable descriptions and icons.

Examples:

```javascript
0 → Clear Sky ☀️
1–2 → Partly Cloudy 🌤️
3 → Overcast ☁️
45–48 → Foggy 🌫️
51–67 → Rainy 🌧️
71–77 → Snowy ❄️
80–82 → Rain Showers 🌦️
95–99 → Thunderstorm ⛈️
```

## Weather Information

| Information | Description |
|---|---|
| Temperature | Current temperature in °C |
| City | Searched city |
| Feels Like | Apparent temperature |
| Humidity | Relative humidity |
| Wind | Wind speed in km/h |
| Description | Current weather condition |
| Icon | Weather emoji |

## API Used

This project uses the free **Open-Meteo API**.

- Geocoding: `https://geocoding-api.open-meteo.com/`
- Weather: `https://api.open-meteo.com/`

**No API key is required.**

## Error Handling

The application handles empty input:

```javascript
if (city === "") {
    alert("Please enter a city name.");
    return;
}
```

It also handles cities that cannot be found:

```javascript
if (!geoData.results || geoData.results.length === 0) {
    alert("City not found. Please enter a valid city.");
    return;
}
```

Network/API errors are handled with `try...catch`.

## Responsive Design

A CSS media query adjusts the application for smaller screens:

```css
@media (max-width: 450px) {
    .container {
        width: 90%;
    }
}
```

## How to Run

1. Download or clone the project.
2. Open the project in VS Code.
3. Make sure `index.html`, `style.css`, and `index.js` are in the same folder.
4. Open `index.html` in a browser.

You can also use **Live Server** in VS Code.

## Upload to GitHub

```bash
git init
git add .
git commit -m "Add weather app"
git branch -M main
git remote add origin https://github.com/your-username/Weather-App.git
git push -u origin main
```

## Future Improvements

- Add a 5-day or 7-day forecast
- Add Celsius/Fahrenheit conversion
- Add current location weather
- Add search history
- Add loading animation
- Add weather-based backgrounds
- Add dark/light mode
- Add sunrise and sunset information
- Add weather alerts
- Improve accessibility and keyboard support

## Author

**Kushal Raj U R**

B.E. – Information Science and Engineering

---

**Project:** Weather App  
**Built with:** HTML5 • CSS3 • JavaScript • Open-Meteo API  
**Type:** API-Based Frontend JavaScript Project
