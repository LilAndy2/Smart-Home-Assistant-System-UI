function toggleLights(room) {
    const lightsElement = document.getElementById(`${room}-lights`);
    const currentState = lightsElement.textContent;
    if (currentState === 'On') {
        lightsElement.textContent = 'Off';
    } else {
        lightsElement.textContent = 'On';
    }

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `Lights in ${room} have been turned ${currentState === 'On' ? "off" : "on"}.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

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

function showRooms(floor) {
    const allRooms = document.querySelectorAll('.room-widget');
    allRooms.forEach(room => {
        if (room.getAttribute('data-floor') === floor) {
            room.style.display = 'block';
        } else {
            room.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var temperatureSliderLivingRoom = document.getElementById("living-room-temperature-slider");
    var temperatureDisplayLivingRoom = document.getElementById("living-room-temp");

    temperatureSliderLivingRoom.addEventListener("input", function() {
        var temperatureValue = temperatureSliderLivingRoom.value;
        temperatureDisplayLivingRoom.textContent = temperatureValue + "°C";
    });

    var temperatureSliderBedroom1 = document.getElementById("bedroom1-temperature-slider");
    var temperatureDisplayBedroom1 = document.getElementById("bedroom1-temp");

    temperatureSliderBedroom1.addEventListener("input", function() {
        var temperatureValue = temperatureSliderBedroom1.value;
        temperatureDisplayBedroom1.textContent = temperatureValue + "°C";
    });

    var temperatureSliderBedroom2 = document.getElementById("bedroom2-temperature-slider");
    var temperatureDisplayBedroom2 = document.getElementById("bedroom2-temp");

    temperatureSliderBedroom2.addEventListener("input", function() {
        var temperatureValue = temperatureSliderBedroom2.value;
        temperatureDisplayBedroom2.textContent = temperatureValue + "°C";
    });

    var temperatureSliderKitchen = document.getElementById("kitchen-temperature-slider");
    var temperatureDisplayKitchen = document.getElementById("kitchen-temp");

    temperatureSliderKitchen.addEventListener("input", function() {
        var temperatureValue = temperatureSliderKitchen.value;
        temperatureDisplayKitchen.textContent = temperatureValue + "°C";
    });

    var temperatureSliderBathroom = document.getElementById("bathroom-temperature-slider");
    var temperatureDisplayBathroom = document.getElementById("bathroom-temp");

    temperatureSliderBathroom.addEventListener("input", function() {
        var temperatureValue = temperatureSliderBathroom.value;
        temperatureDisplayBathroom.textContent = temperatureValue + "°C";
    });

    var temperatureSliderOffice = document.getElementById("office-temperature-slider");
    var temperatureDisplayOffice = document.getElementById("office-temp");

    temperatureSliderOffice.addEventListener("input", function() {
        var temperatureValue = temperatureSliderOffice.value;
        temperatureDisplayOffice.textContent = temperatureValue + "°C";
    });
});

// Initialize with downstairs rooms shown
showRooms('downstairs');
