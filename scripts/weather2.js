// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
    const apiKey = `b55593960b088a990e58c28e3f9cb071`;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Function to update weather widget with fetched data
async function updateWeatherWidget() {
    try {
        const weatherData = await fetchWeatherData();
        const weatherIcon = weatherData.weather[0].icon;
        const weatherDescription = weatherData.weather[0].description;
        const temperature = Math.round(weatherData.main.temp);

        document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
        document.getElementById('weather-description').textContent = weatherDescription;
        document.getElementById('weather-temperature').textContent = `${temperature}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Update weather widget every hour
updateWeatherWidget(); // Initial update
setInterval(updateWeatherWidget, 3600000); // Update every hour