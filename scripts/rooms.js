function toggleLights(room) {
    const lightsElement = document.getElementById(`${room}-lights`);
    const currentState = lightsElement.textContent;
    if (currentState === 'On') {
        lightsElement.textContent = 'Off';
    } else {
        lightsElement.textContent = 'On';
    }
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

// Initialize with downstairs rooms shown
showRooms('downstairs');
