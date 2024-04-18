const findMyLocation = () => {
   return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;
         
         const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
         
         fetch(geoApiUrl)
            .then(response => response.json())
            .then(data => {
               const city = data.city;
               resolve(city); // Resolve with the city
            })
            .catch(error => reject(error)); // Handle any errors
      });
   });
}

async function getWeather() {
   const apiKey = `2cf94bc780975008cd2a907a522bc24a`;
   const city = await findMyLocation();

   if (!city) {
      alert('Please enter a city');
      return;
   }

   const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

   fetch(currentWeatherURL)
      .then(response => response.json())
      .then(data => {
         displayWeather(data);
      })
      .catch(error => {
         console.error('Error:', error);
         alert('Error with your data');
      });

   fetch(forecastURL)
      .then(response => response.json())
      .then(data => {
         displayHourlyForecast(data.list);
      })
      .catch(error => {
         console.error('Error:', error);
         alert('Error with your data');
      });
}

function displayWeather(data) {
   const tempDivInfo = document.getElementById('temp-div');
   const weatherInfoDiv = document.getElementById('weather-info');
   const weatherIcon = document.getElementById('weather-icon');
   const hourlyForecastDiv = document.getElementById('hourly-forecast');

   // Clear previous content
   weatherInfoDiv.innerHTML = '';
   tempDivInfo.innerHTML = '';
   hourlyForecastDiv.innerHTML = '';

   if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
   } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15);
      const weatherDescription = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/w/${icon}.png`;
      const temperatureHTML = `<p>${temperature}°C</p>`;
      const weatherHTML = `<p>${cityName}</p><p>${weatherDescription}</p>`;
      
      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHTML;
      weatherIcon.src = iconURL;
      weatherIcon.alt = weatherDescription;

      showImage();
   }
}

function displayHourlyForecast(hourlyData) {
   const hourlyForecastDiv = document.getElementById('hourly-forecast');
   const next24Hours = hourlyData.slice(0, 8);

   next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15);
      const icon = item.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/w/${icon}.png`;

      const hourlyItemHtml = `
         <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconURL}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
         </div>
      `;
      hourlyForecastDiv.innerHTML += hourlyItemHtml;
   });
}

function showImage() {
   const weatherIcon = document.getElementById('weather-icon');
   weatherIcon.style.display = 'block';
}