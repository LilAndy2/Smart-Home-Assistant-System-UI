// Function to update live time
function updateLiveTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
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

// Function to update times for different time zones
function updateTimeZoneTimes() {
    const londonTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/London' });
    document.getElementById('london-time').textContent = londonTime;

    const newYorkTime = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
    document.getElementById('new-york-time').textContent = newYorkTime;

    const sydneyTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Australia/Sydney' });
    document.getElementById('sydney-time').textContent = sydneyTime;
}

// Update live time, day, and date every second
setInterval(() => {
    updateLiveTime();
    updateLiveDayAndDate();
    updateTimeZoneTimes();
}, 1000);

// Initial update
updateLiveTime();
updateLiveDayAndDate();
updateTimeZoneTimes();
