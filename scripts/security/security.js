// Example JavaScript for security features
function toggleSmartPlug(plugId) {
    const status = document.getElementById(`smart-plug-status-${plugId}`);
    // Logic to toggle the smart plug
    if (status.innerText === 'Off') {
        status.innerText = 'On';
        // Additional logic to turn on the plug
    } else {
        status.innerText = 'Off';
        // Additional logic to turn off the plug
    }
}

function toggleWindow(windowId) {
    const status = document.getElementById(`window-status-${windowId}`);
    // Logic to toggle the window
    if (status.innerText === 'Closed') {
        status.innerText = 'Open';
        // Additional logic to open the window
    } else {
        status.innerText = 'Closed';
        // Additional logic to close the window
    }
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
        // Additional logic to arm the alarm
    } else {
        status.innerText = 'Disarmed';
        // Additional logic to disarm the alarm
    }
}
