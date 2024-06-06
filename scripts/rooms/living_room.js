document.addEventListener("DOMContentLoaded", function() {
    // TV control
    loadNotifications();
    
    function toggleTV(room) {
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

    // Speaker control
    function toggleSpeaker(room) {
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

    // Speaker volume control
    const speakerVolumeSlider = document.getElementById("speaker-volume-lr");
    const speakerVolumeValue = document.getElementById("speaker-volume-value-lr");
    speakerVolumeSlider.addEventListener("input", function() {
        speakerVolumeValue.textContent = speakerVolumeSlider.value;
        console.log(`Speaker volume: ${speakerVolumeSlider.value}`);
    });

    document.querySelector('.tv-control .control-btn').addEventListener('click', () => toggleTV('lr'));
    document.querySelector('.speaker-control .control-btn').addEventListener('click', () => toggleSpeaker('lr'));

    // Vacuum control
    document.getElementById("set-vacuum-time").addEventListener("click", function() {
        const hour = document.getElementById("vacuum-hour").value;
        const minute = document.getElementById("vacuum-minute").value;
        if (hour !== "Hour" && minute !== "Minute") {
            const timestamp = new Date().toLocaleTimeString();
            const notificationMessage = `Vacuum in Living Room is set for ${hour} hours and ${minute} minutes.`;
            const notification = {
                message: notificationMessage,
                timestamp: timestamp
            };
        
            // Add notification to localStorage
            saveNotification(notification);
        
            // Add notification to the UI
            addNotificationToUI(notification, true);
        } else {
            alert("Please select a valid time.");
        }
        document.getElementById("vacuum-hour").value = "Hour";
        document.getElementById("vacuum-minute").value = "Minute";
    });

    const selectMenu = document.querySelectorAll("select");

    for (let i = 5; i > 0; i--) {
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    }

    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const lampRedBtn = document.getElementById("tv-leds-red");
    const lampBlueBtn = document.getElementById("tv-leds-blue");
    const lampGreenBtn = document.getElementById("tv-leds-green");

    lampRedBtn.addEventListener("click", function() {
        toggleBrightness(lampRedBtn, [lampBlueBtn, lampGreenBtn]);
    });

    lampBlueBtn.addEventListener("click", function() {
        toggleBrightness(lampBlueBtn, [lampRedBtn, lampGreenBtn]);
    });

    lampGreenBtn.addEventListener("click", function() {
        toggleBrightness(lampGreenBtn, [lampRedBtn, lampBlueBtn]);
    });

    function toggleBrightness(clickedBtn, otherBtns) {
        if (allButtonsNormal() == false) {
            if (clickedBtn.style.opacity === "1") {
                otherBtns.forEach(btn => {
                    btn.style.opacity = "1";
                });
            } else {
                clickedBtn.style.opacity = "1";
                otherBtns.forEach(btn => {
                    btn.style.opacity = "0.5";
                });
            }
        } else {
            otherBtns.forEach(btn => {
                btn.style.opacity = "0.5";
            });
        }
    }

    function allButtonsNormal() {
        if (lampRedBtn.style.opacity === "1" && lampBlueBtn.style.opacity === "1" && lampGreenBtn.style.opacity === "1") {
            return true;
        } else {
            return false;
        }
    }
});
