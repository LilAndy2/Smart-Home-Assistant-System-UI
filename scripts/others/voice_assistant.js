window.addEventListener('DOMContentLoaded', (event) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Define the command keywords and their corresponding actions
    const commands = {
        "turn on the lights": () => toggleLightsAssistant('living-room'),
        "turn off the lights": () => toggleLightsAssistant('living-room'),
        "turn on the TV": () => toggleTVAssistant('lr'),
        "turn off the TV": () => toggleTVAssistant('lr'),
        "turn on the speaker": () => toggleSpeakerAssistant('lr'),
        "turn off the speaker": () => toggleSpeakerAssistant('lr'),
        "set temperature to": (temp) => setTemperatureAssistant(temp),
        "set vacuum time to": (time) => setVacuumTimeAssistant(time)
    };

    // Helper functions to control elements
    function toggleLightsAssistant(room) {
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

    function toggleTVAssistant(room) {
        const tvStatus = document.getElementById(`tv-status-${room}`);
        const tvControlBtn = document.querySelector(`.tv-control button`);
        const notificationList = document.querySelector('.notification-list');
    
        let tvOn = tvStatus.textContent === "On";
    
        // Toggle TV status
        tvOn = !tvOn;
        tvStatus.textContent = tvOn ? "On" : "Off";
        tvControlBtn.textContent = tvOn ? "Turn TV Off" : "Turn TV On";
    
        // Create a new notification
        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `TV in ${room} has been turned ${tvOn ? "on" : "off"}.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    }

    function toggleSpeakerAssistant(room) {
        const speakerStatus = document.getElementById(`speaker-status-${room}`);
        const speakerControlBtn = document.querySelector(`.speaker-control button`);
        const speakerVolumeSlider = document.getElementById(`speaker-volume-${room}`);
        const speakerVolumeValue = document.getElementById(`speaker-volume-value-${room}`);
        let speakerOn = speakerStatus.textContent === "On";

        speakerOn = !speakerOn;
        speakerStatus.textContent = speakerOn ? "On" : "Off";
        speakerControlBtn.textContent = speakerOn ? "Turn Speaker Off" : "Turn Speaker On";

        if (speakerOn) {
            speakerVolumeSlider.disabled = false;
        } else {
            speakerVolumeSlider.value = 0;
            speakerVolumeValue.textContent = 0;
            speakerVolumeSlider.disabled = true;
        }

        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `Speakers in ${room} have been turned ${speakerOn ? "on" : "off"}.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    }

    function setTemperatureAssistant(temp) {
        const slider = document.getElementById('living-room-temperature-slider');
        slider.value = temp;
        document.getElementById('living-room-temp').innerText = `${temp}°C`;
    }

    function setVacuumTimeAssistant(time) {
        const [hour, minute] = time.split(':');
        document.getElementById('vacuum-hour').value = hour;
        document.getElementById('vacuum-minute').value = minute;
    }

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        console.log('Speech received: ', speechResult);

        // Check if the command matches any of the defined commands
        for (const command in commands) {
            if (speechResult.includes(command)) {
                const value = speechResult.replace(command, '').trim();
                commands[command](value);
                break;
            }
        }
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ', event.error);
    };

    // Start listening for the wake word "Hey HomeGenie"
    function startListening() {
        recognition.start();
    }

    const voiceAssistantBtn = document.getElementById('voice-assistant-btn');
    voiceAssistantBtn.addEventListener('click', startListening);
});

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
