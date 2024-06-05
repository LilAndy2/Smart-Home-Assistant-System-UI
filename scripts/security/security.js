// Example JavaScript for security features
function toggleSmartPlug(plugId) {
    const status = document.getElementById(`smart-plug-status-${plugId}`);
    // Logic to toggle the smart plug
    if (status.innerText === 'Off') {
        status.innerText = 'On';
    } else {
        status.innerText = 'Off';
    }

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The smart plug in the ${plugId === 1 ? "Living Room" : "Kitchen"} has been turned ${status.innerText === "On" ? "on" : "off"}.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

function toggleWindow(windowId) {
    const status = document.getElementById(`window-status-${windowId}`);
    // Logic to toggle the window
    if (status.innerText === 'Closed') {
        status.innerText = 'Open';
    } else {
        status.innerText = 'Closed';
    }

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    let room;
    switch (windowId) {
        case 1: room = "Living Room"; break;
        case 2: room = "Bedroom 1"; break;
        case 3: room = "Bedroom 2"; break;
    }
    const notificationMessage = `The window in the ${room} has been ${status.innerText === "Open" ? "opened" : "closed"}.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

function snapshotCamera(cameraId) {
    // Logic to take a snapshot from the camera
    alert(`Snapshot taken from camera ${cameraId}`);
}

function toggleAlarm() {
    const status = document.getElementById('alarm-status');
    // Logic to arm/disarm the alarm
    if (status.innerText === 'Disarmed') {
        status.innerText = 'Armed';
    } else {
        status.innerText = 'Disarmed';
    }

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The alarm system has been turned ${status.innerText === "Armed" ? "on" : "off"}.`;
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
