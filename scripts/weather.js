const findMyLocation = () => {
   return new Promise((resolve, reject) => {
       navigator.geolocation.getCurrentPosition(
           (position) => {
               const latitude = position.coords.latitude;
               const longitude = position.coords.longitude;

               const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

               fetch(geoApiUrl)
                   .then(response => {
                       if (!response.ok) {
                           throw new Error('Unable to retrieve location data');
                       }
                       return response.json();
                   })
                   .then(data => {
                       const city = data.city;
                       resolve(city); // Resolve with the city
                   })
                   .catch(error => reject(error)); // Handle any errors
           },
           (error) => {
               reject(error.message); // Handle geolocation errors
           }
       );
   });
}

async function getWeather() {
   try {
       const apiKey = `b55593960b088a990e58c28e3f9cb071`;
       const city = await findMyLocation();

       const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
       const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

       const [currentWeatherResponse, forecastResponse] = await Promise.all([
           fetch(currentWeatherURL),
           fetch(forecastURL)
       ]);

       if (!currentWeatherResponse.ok || !forecastResponse.ok) {
           throw new Error('Unable to fetch weather data');
       }

       const [currentWeatherData, forecastData] = await Promise.all([
           currentWeatherResponse.json(),
           forecastResponse.json()
       ]);

       displayWeather(currentWeatherData);
       displayHourlyForecast(forecastData.list);
   } catch (error) {
       console.error('Error:', error);
       alert('Error with your data');
   }
}

function displayWeather(data) {
   const weatherIconDiv = document.getElementById('weather-icon');
   const weatherDescriptionDiv = document.getElementById('weather-description');
   const temperatureDiv = document.getElementById('weather-temperature');

   if (data.cod === '404') {
       weatherDescriptionDiv.textContent = data.message;
   } else {
       const temperature = Math.round(data.main.temp - 273.15);
       const weatherDescription = data.weather[0].description;
       const icon = data.weather[0].icon;
       const iconURL = `http://openweathermap.org/img/w/${icon}.png`;

       weatherIconDiv.innerHTML = `<img src="${iconURL}" alt="${weatherDescription}">`;
       weatherDescriptionDiv.textContent = weatherDescription;
       temperatureDiv.textContent = `${temperature}°C`;
   }
}

function displayHourlyForecast(hourlyData) {
   const forecastContainer = document.getElementById('weather-forecast');
   forecastContainer.innerHTML = '';

   const next24Hours = hourlyData.slice(0, 8);

   next24Hours.forEach(item => {
       const dateTime = new Date(item.dt * 1000);
       const hour = dateTime.getHours();
       const temperature = Math.round(item.main.temp - 273.15);
       const icon = item.weather[0].icon;
       const iconURL = `http://openweathermap.org/img/w/${icon}.png`;

       const hourlyItemHtml = `
           <div class="forecast-item">
               <div>${hour}:00</div>
               <img src="${iconURL}" alt="Hourly Weather Icon">
               <div>${temperature}°C</div>
           </div>
       `;
       forecastContainer.innerHTML += hourlyItemHtml;
   });
}

// Call getWeather to initiate the process
getWeather();

// Update weather every 4 hours
setInterval(getWeather, 14400000); // Update every 4 hours
