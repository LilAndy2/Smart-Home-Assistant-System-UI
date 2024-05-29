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
