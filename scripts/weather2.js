// Function to fetch weather data from OpenWeatherMap API using latitude and longitude
async function fetchWeatherData(lat, lon) {
    const apiKey = 'b55593960b088a990e58c28e3f9cb071';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Function to fetch weather forecast data from OpenWeatherMap API using latitude and longitude
async function fetchWeatherForecast(lat, lon) {
    const apiKey = 'b55593960b088a990e58c28e3f9cb071';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data.hourly;
}

// Function to update weather widget with fetched data
async function updateWeatherWidget(lat, lon) {
    try {
        const weatherData = await fetchWeatherData(lat, lon);
        const weatherIcon = weatherData.weather[0].icon;
        const weatherDescription = weatherData.weather[0].description;
        const temperature = Math.round(weatherData.main.temp);

        document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="Weather Icon">`;
        document.getElementById('weather-description').textContent = weatherDescription;
        document.getElementById('weather-temperature').textContent = `${temperature}°C`;

        // Fetch and update weather forecast data
        await updateWeatherForecastWidget(lat, lon); // Await here

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update weather forecast widget with fetched data
async function updateWeatherForecastWidget(lat, lon) {
    try {
        const forecastData = await fetchWeatherForecast(lat, lon);
        const forecastContainer = document.getElementById('weather-forecast');
        forecastContainer.innerHTML = '';

        // Display the forecast for the next 24 hours, updated every 4 hours
        for (let i = 0; i < 24; i += 4) {
            const forecast = forecastData[i];
            const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const icon = forecast.weather[0].icon;
            const temp = Math.round(forecast.temp);

            const forecastElement = document.createElement('div');
            forecastElement.classList.add('forecast-item');
            forecastElement.innerHTML = `
                <div>${time}</div>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
                <div>${temp}°C</div>
            `;

            forecastContainer.appendChild(forecastElement);
        }
    } catch (error) {
        console.error('Error fetching weather forecast data:', error);
    }
}

// Function to get the user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            updateWeatherWidget(lat, lon); // Fetch and update current weather data based on location
        }, error => {
            console.error('Error getting location:', error);
            // Optionally, use a default location if there's an error
            const defaultLat = 51.5074; // Example: London latitude
            const defaultLon = -0.1278; // Example: London longitude
            updateWeatherWidget(defaultLat, defaultLon);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Optionally, use a default location if geolocation is not supported
        const defaultLat = 51.5074; // Example: London latitude
        const defaultLon = -0.1278; // Example: London longitude
        updateWeatherWidget(defaultLat, defaultLon);
    }
}

// Call getUserLocation to initiate the process
getUserLocation();

// Update weather widget and forecast every 4 hours
setInterval(getUserLocation, 14400000); // Update every 4 hours
