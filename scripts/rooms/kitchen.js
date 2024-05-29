function changeTemp(appliance, change) {
    const tempSpan = document.getElementById(`${appliance}-temp`);
    let currentTemp = parseInt(tempSpan.textContent);

    currentTemp += change;
    tempSpan.textContent = `${currentTemp}°C`;
}

function toggleStatus(appliance) {
    const statusSpan = document.getElementById(`${appliance}-status`);
    const currentStatus = statusSpan.textContent.trim();

    if (currentStatus === "Closed") {
        statusSpan.textContent = "Open";
    } else {
        statusSpan.textContent = "Closed";
    }
}

// Initialize water usage variables
let waterUsedToday = 0;
let waterUsedThisMonth = 0;
let waterUsedThisYear = 0;

// Function to update water usage each day
function updateWaterUsage() {
    // Generate a random quantity of water usage for today (between 0 and 100 liters)
    const dailyWaterUsage = Math.floor(Math.random() * 101);
    
    // Update water usage for today
    waterUsedToday = dailyWaterUsage;
    
    // Update water usage for this month
    waterUsedThisMonth += dailyWaterUsage;
    
    // Check if it's the end of the month
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    if (currentDate.getDate() === lastDayOfMonth) {
        // Add monthly usage to yearly usage
        waterUsedThisYear += waterUsedThisMonth;
        // Reset monthly usage
        waterUsedThisMonth = 0;
    }
    
    // Update the water usage display
    updateWaterUsageDisplay();
}

// Function to update the water usage display on the webpage
function updateWaterUsageDisplay() {
    document.getElementById("water-used-today").textContent = waterUsedToday + " liters";
    document.getElementById("water-used-this-month").textContent = waterUsedThisMonth + " liters";
    document.getElementById("water-used-this-year").textContent = waterUsedThisYear + " liters";
}

// Call the updateWaterUsage function initially
updateWaterUsage();

// Set an interval to call updateWaterUsage function every day (24 hours)
setInterval(updateWaterUsage, 24 * 60 * 60 * 1000);
