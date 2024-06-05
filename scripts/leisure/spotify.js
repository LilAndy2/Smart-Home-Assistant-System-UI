// Object to keep track of the state of each speaker
const speakerStates = {
    'living-room': false,
    'bedroom-1': false,
    'bedroom-2': false
};

// Mock function to simulate enabling/disabling a speaker
function enableRoomSpeaker(room) {
    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The speaker in the ${room} has been turned on.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

function disableRoomSpeaker(room) {
    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The speaker in the ${room} has been turned off.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

// Function called when a toggle switch is changed
function toggleSpeaker(room, isEnabled) {
    speakerStates[room] = isEnabled;
    const volumeBar = document.getElementById(`${room}-volume`);
    if (isEnabled) {
        enableRoomSpeaker(room);
        volumeBar.disabled = false;
    } else {
        disableRoomSpeaker(room);
        setVolume(room, 0); // Set volume to 0 when speaker is turned off
        volumeBar.value = 0; // Reset volume bar
        volumeBar.disabled = true;
    }
}

// Function called when the volume slider is changed
function setVolume(room, volume) {
    if (!speakerStates[room]) {
        console.log(`Cannot set volume. Speaker in ${room} is off.`);
        document.getElementById(`${room}-volume`).value = 0; // Reset volume bar
        return;
    }
    console.log(`Volume for ${room} set to ${volume}`);
    // Implement actual logic to set the speaker volume here, e.g., an API call
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
