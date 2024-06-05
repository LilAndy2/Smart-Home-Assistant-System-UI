document.getElementById('curtains-open-1').addEventListener('click', function() {
    setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `Curtains have been opened in Bedroom 1.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    }, 20000);
});

document.getElementById('curtains-close-1').addEventListener('click', function() {
    setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `Curtains have been closed in Bedroom 1.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    }, 20000);
});

document.getElementById('curtains-open-2').addEventListener('click', function() {
    setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `Curtains have been opened in Bedroom 2.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    }, 20000);
});

document.getElementById('curtains-close-2').addEventListener('click', function() {
    setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `Curtains have been closed in Bedroom 2.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    }, 20000);
});


/* ALARM */
const selectMenu = document.querySelectorAll("select");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[6].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[7].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[8].firstElementChild.insertAdjacentHTML("afterend", option);
}
/* ALARM */

/* FAN */
document.addEventListener("DOMContentLoaded", function() {
    const fanOnBtn = document.getElementById("fan-on");
    const fanOffBtn = document.getElementById("fan-off");
    const fanSpeedSlider = document.getElementById("fan-speed");
    const fanStatusText = document.getElementById("fan-status");

    fanOnBtn.addEventListener("click", function() {
        fanStatusText.innerText = "Fan is ON. Speed: " + fanSpeedSlider.value;

        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `The fan has been turned on in Bedroom 1.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    });

    fanSpeedSlider.addEventListener("input", function() {
        fanStatusText.innerText = "Fan is ON. Speed: " + fanSpeedSlider.value;
    });

    fanOffBtn.addEventListener("click", function() {
        fanStatusText.innerText = "Fan is OFF";

        const timestamp = new Date().toLocaleTimeString();
        const notificationMessage = `The fan has been turned off in Bedroom 1.`;
        const notification = {
            message: notificationMessage,
            timestamp: timestamp
        };
    
        // Add notification to localStorage
        saveNotification(notification);
    
        // Add notification to the UI
        addNotificationToUI(notification, true);
    });
});
/* FAN */

/* LAMP */
document.addEventListener("DOMContentLoaded", function() {
    const lampRedBtn = document.getElementById("lamp-red");
    const lampBlueBtn = document.getElementById("lamp-blue");
    const lampGreenBtn = document.getElementById("lamp-green");

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
/* LAMP */

/* BED LIGHT */
const bedLightStatus = document.getElementById("bed-light-status");
const bedLightControlBtn = document.querySelector(".bed-light-control .control-btn-bed");
let bedLightOn = false;

bedLightControlBtn.addEventListener("click", function() {
    bedLightOn = !bedLightOn;
    bedLightStatus.textContent = bedLightOn ? "On" : "Off";
    bedLightControlBtn.textContent = bedLightOn ? "Turn Bed Light Off" : "Turn Bed Light On";

    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The bed light has been turned ${bedLightOn ? "on" : "off"} in Bedroom 2.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };
    
    // Add notification to localStorage
    saveNotification(notification);
    
    // Add notification to the UI
    addNotificationToUI(notification, true);
});
/* BED LIGHT */

/* TV */
const tvStatus1 = document.getElementById("tv-status");
const tvControlBtn1 = document.querySelector(".tv-control-1 .control-btn");
let tvOn1 = false;

tvControlBtn1.addEventListener("click", function() {
    tvOn1 = !tvOn1;
    tvStatus1.textContent = tvOn1 ? "On" : "Off";
    tvControlBtn1.textContent = tvOn1 ? "Turn TV Off" : "Turn TV On";

    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The TV has been turned ${tvOn1 ? "on" : "off"} in Bedroom 1.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };
    
    // Add notification to localStorage
    saveNotification(notification);
    
    // Add notification to the UI
    addNotificationToUI(notification, true);
});

const tvStatus2 = document.getElementById("tv-status-2");
const tvControlBtn2 = document.querySelector(".tv-control-2 .control-btn-2");
let tvOn2 = false;

tvControlBtn2.addEventListener("click", function() {
    tvOn2 = !tvOn2;
    tvStatus2.textContent = tvOn2 ? "On" : "Off";
    tvControlBtn2.textContent = tvOn2 ? "Turn TV Off" : "Turn TV On";

    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The TV has been turned ${tvOn2 ? "on" : "off"} in Bedroom 2.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };
    
    // Add notification to localStorage
    saveNotification(notification);
    
    // Add notification to the UI
    addNotificationToUI(notification, true);
});
/* TV */

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
