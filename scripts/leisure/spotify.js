// Object to keep track of the state of each speaker
const speakerStates = {
    'living-room': false,
    'bedroom-1': false,
    'bedroom-2': false
};

// Mock function to simulate enabling/disabling a speaker
function enableRoomSpeaker(room) {
    console.log(`Speaker in ${room} has been enabled.`);
    // Implement actual logic to enable the speaker here, e.g., an API call
}

function disableRoomSpeaker(room) {
    console.log(`Speaker in ${room} has been disabled.`);
    // Implement actual logic to disable the speaker here, e.g., an API call
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
