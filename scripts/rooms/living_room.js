document.addEventListener("DOMContentLoaded", function() {
    // TV control
    function toggleTV(room) {
        const tvStatus = document.getElementById(`tv-status-${room}`);
        const tvControlBtn = document.querySelector(`.tv-control button`);
        let tvOn = tvStatus.textContent === "On";

        tvOn = !tvOn;
        tvStatus.textContent = tvOn ? "On" : "Off";
        tvControlBtn.textContent = tvOn ? "Turn TV Off" : "Turn TV On";
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
    }

    // Speaker volume control
    const speakerVolumeSlider = document.getElementById("speaker-volume-lr");
    const speakerVolumeValue = document.getElementById("speaker-volume-value-lr");
    speakerVolumeSlider.addEventListener("input", function() {
        speakerVolumeValue.textContent = speakerVolumeSlider.value;
        console.log(`Speaker volume: ${speakerVolumeSlider.value}`);
    });


    // Attach event listeners to TV and speaker buttons
    document.querySelector('.tv-control .control-btn').addEventListener('click', () => toggleTV('lr'));
    document.querySelector('.speaker-control .control-btn').addEventListener('click', () => toggleSpeaker('lr'));

    // Vacuum control
    document.getElementById("set-vacuum-time").addEventListener("click", function() {
        const hour = document.getElementById("vacuum-hour").value;
        const minute = document.getElementById("vacuum-minute").value;
        if (hour !== "Hour" && minute !== "Minute") {
            alert(`Vacuum set for ${hour}:${minute}`);
        } else {
            alert("Please select a valid time.");
        }
        document.getElementById("vacuum-hour").value = "Hour";
        document.getElementById("vacuum-minute").value = "Minute";
    });

    const selectMenu = document.querySelectorAll("select");

    for (let i = 5; i > 0; i--) {
        i = i < 10 ? "0" + i : i;
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
