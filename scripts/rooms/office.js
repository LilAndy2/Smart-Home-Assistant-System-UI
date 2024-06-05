// Helper function to format time
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

// Initialize usage data
let usageData = JSON.parse(localStorage.getItem('usageData')) || {
    daily: {},
    weekly: {},
    monthly: {},
    totalToday: 0,
    totalWeek: 0,
};

// Function to update the display
function updateDisplay() {
    document.getElementById('time-today').textContent = formatTime(usageData.totalToday);
    document.getElementById('time-week').textContent = formatTime(usageData.totalWeek);
}

// Function to reset daily, weekly, and monthly data
function resetUsageData() {
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const weekKey = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`;

    if (!usageData.daily[todayKey]) {
        usageData.totalToday = 0;
        usageData.daily = {};
        usageData.daily[todayKey] = 0;
    }

    if (!usageData.weekly[weekKey]) {
        usageData.totalWeek = 0;
        usageData.weekly = {};
        usageData.weekly[weekKey] = 0;
    }

    localStorage.setItem('usageData', JSON.stringify(usageData));
    updateDisplay();
}

// Function to simulate usage update
function simulateUsageUpdate() {
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const weekKey = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`;

    usageData.daily[todayKey]++;
    usageData.weekly[weekKey]++;
    usageData.totalToday = usageData.daily[todayKey];
    usageData.totalWeek = usageData.weekly[weekKey];

    localStorage.setItem('usageData', JSON.stringify(usageData));
    updateDisplay();
}

// Reset data at the start of the day/week/month
resetUsageData();

// Simulate computer usage updating every minute
setInterval(simulateUsageUpdate, 60000);
updateDisplay();


function toggleComputer() {
    const computerStatus = document.getElementById("computer-status");
    computerStatus.textContent = computerStatus.textContent === "Off" ? "On" : "Off";

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The computer in the office has been turned ${computerStatus.textContent === "On" ? "on" : "off"}.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

document.addEventListener("DOMContentLoaded", function() {
    const lampRedBtn = document.getElementById("computer-red");
    const lampBlueBtn = document.getElementById("computer-blue");
    const lampGreenBtn = document.getElementById("computer-green");

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

function toggleDeskLamp() {
    const deskLampStatus = document.getElementById("desk-lamp-office-status");
    deskLampStatus.textContent = deskLampStatus.textContent === "Off" ? "On" : "Off";

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The desk lamp in the office has been turned ${deskLampStatus.textContent === "On" ? "on" : "off"}.`;
    const notification = {
        message: notificationMessage,
        timestamp: timestamp
    };

    // Add notification to localStorage
    saveNotification(notification);

    // Add notification to the UI
    addNotificationToUI(notification, true);
}

function toggleFloorLamp() {
    const deskLampStatus = document.getElementById("floor-lamp-status");
    deskLampStatus.textContent = deskLampStatus.textContent === "Off" ? "On" : "Off";

    // Create a new notification
    const timestamp = new Date().toLocaleTimeString();
    const notificationMessage = `The floor lamp in the office has been turned ${deskLampStatus.textContent === "On" ? "on" : "off"}.`;
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
