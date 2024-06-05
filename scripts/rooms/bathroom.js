let mirrorLightStatus = false;

function toggleMirrorLight() {
    mirrorLightStatus = !mirrorLightStatus;
    const statusText = mirrorLightStatus ? 'On' : 'Off';
    document.getElementById('mirror-light-status').innerText = statusText;

    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The mirror lights have been turned ${mirrorLightStatus ? "on" : "off"} in the Bathroom.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };
    
    // Add notification to localStorage
    saveNotification(notification);
    
    // Add notification to the UI
    addNotificationToUI(notification, true);
}

document.getElementById('toggle-mirror-light').addEventListener('click', toggleMirrorLight);

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-btn");
    const stopButton = document.getElementById("stop-btn");
    const countdownDisplay = document.getElementById("countdown");
    let countdownInterval;

    startButton.addEventListener("click", startWashingMachine);
    stopButton.addEventListener("click", stopWashingMachine);

    function startWashingMachine() {
        const duration = parseInt(document.getElementById("washing-duration").value, 10);
        if (isNaN(duration) || duration <= 0) return;

        const endTime = Date.now() + duration * 60 * 1000;
        updateCountdown(endTime);

        startButton.disabled = true;
        stopButton.disabled = false;
        document.querySelector(".ongoing-label").classList.remove("hidden");
        countdownInterval = setInterval(function() {
            updateCountdown(endTime);
        }, 1000);
    }

    function stopWashingMachine() {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "0:00";
        startButton.disabled = false;
        stopButton.disabled = true;
        document.querySelector(".ongoing-label").classList.add("hidden");
    }

    function updateCountdown(endTime) {
        const remainingTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        countdownDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        if (remainingTime === 0) {
            stopWashingMachine();
        }
    }
});

function updateWaterUsage(usagePercentage) {
    const circle = document.getElementById('water-usage-circle');
    const progress = Math.min(usagePercentage, 100);
    circle.style.setProperty('--progress', `${progress}%`);
    document.getElementById('water-usage-value').innerText = usagePercentage;
}

updateWaterUsage(60);

function saveNotification(notification) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.unshift(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function loadNotifications() {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.forEach(notification => addNotificationToUI(notification, false));
    updateMessageCount(notifications.length);
}

function addNotificationToUI(notification, updateCount) {
    const notificationList = document.querySelector('.notification-list');
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification-item';

    notificationElement.innerHTML = `
        <p class="notification-message">${notification.message}</p>
        <span class="notification-timestamp">${notification.timestamp}</span>
        <button class="delete-notification">
            <span class="material-icons-sharp">close</span>
        </button>
    `;

    // Add delete functionality to the notification
    notificationElement.querySelector('.delete-notification').addEventListener('click', function() {
        notificationElement.remove();
        removeNotification(notification);
        updateMessageCount(-1);
    });

    // Insert the notification at the top of the list
    notificationList.insertBefore(notificationElement, notificationList.firstChild);

    if (updateCount) {
        // Update message count
        updateMessageCount(1);
    }
}

function removeNotification(notification) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications = notifications.filter(n => n.message !== notification.message || n.timestamp !== notification.timestamp);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function updateMessageCount(change) {
    const messageCount = document.querySelector('.message-count');
    let count = parseInt(messageCount.textContent);
    count += change;
    messageCount.textContent = count;
}
