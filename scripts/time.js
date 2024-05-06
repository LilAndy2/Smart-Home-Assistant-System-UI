// Function to update live time
function updateLiveTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    // Check if it's day or night
    const isDay = hours >= 6 && hours < 18; // Assume day from 6 AM to 6 PM
    const background = isDay ? 'day.jpg' : 'night.png';
    const container = document.querySelector('.live-time-container');
    container.style.backgroundImage = `url('images/${background}')`;

    // Set text color to white if it's night
    container.style.color = isDay ? 'black' : 'white';

    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    document.getElementById('live-time-clock').textContent = formattedTime;
}

// Function to update live day and date
function updateLiveDayAndDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${dayOfMonth}, ${year}`;
    document.getElementById('live-day').textContent = dayOfWeek;
    document.getElementById('live-date').textContent = formattedDate;
}

// Update live time, day, and date every second
setInterval(() => {
    updateLiveTime();
    updateLiveDayAndDate();
}, 1000);

// Initial update
updateLiveTime();
updateLiveDayAndDate();
