// Function to calculate the next interior cleaning date
function calculateNextInteriorCleaning(startDate) {
    const start = new Date(startDate);
    let nextInteriorCleaning = new Date(start);
    nextInteriorCleaning.setDate(start.getDate() + 7);
    return nextInteriorCleaning.toDateString();
}

function calculateInteriorCleaningDates(startDate) {
    const start = new Date(startDate);
    const interiorCleaningDates = [];
    let nextInteriorCleaning = new Date(start);

    // Move to the next occurrence of the same day of the week as the start date
    while (nextInteriorCleaning.getDay() !== start.getDay()) {
        nextInteriorCleaning.setDate(nextInteriorCleaning.getDate() + 1);
    }

    let daysAdded = 0;

    while (daysAdded <= 30) {
        if (daysAdded !== 0) {
            interiorCleaningDates.push(nextInteriorCleaning.toDateString());
        }
        daysAdded += 7;
        nextInteriorCleaning.setDate(nextInteriorCleaning.getDate() + 7); // Add 7 days for the next interior cleaning
    }

    return interiorCleaningDates;
}

// Function to check if a date is a Sunday
function isSunday(date) {
    return date.getDay() === 0;
}

// Function to check if a date is a holiday in India
function isHolidayIndia(date) {
    const holidays = [
        // List of holidays in India (example)
        'January 26, 2024',
        'August 15, 2024',
        // Add more holidays as needed
    ];
    const formattedDate = date.toDateString();
    return holidays.includes(formattedDate);
}

// Function to calculate the next pressure wash date, considering Sundays and holidays
function calculateNextPressureWash(startDate) {
    const start = new Date(startDate);
    let nextPressureWash = new Date(start);
    nextPressureWash.setDate(start.getDate() + 29); // Add 30 days for pressure wash
    // If the date falls on a Sunday or holiday, move to the next day
    while (isSunday(nextPressureWash) || isHolidayIndia(nextPressureWash)) {
        nextPressureWash.setDate(nextPressureWash.getDate() + 1);
    }
    return nextPressureWash.toDateString();
}

// Function to calculate the subscription valid till date
function calculateSubscriptionValidTill(startDate) {
    const start = new Date(startDate);
    let validTill = new Date(start);
    validTill.setDate(start.getDate() + 29); // Initial 30 days subscription
    return validTill.toDateString();
}

// Function to display subscription details
function displaySubscriptionDetails(startDate) {
    const nextInteriorCleaning = calculateNextInteriorCleaning(startDate);
    const interiorCleaningDates = calculateInteriorCleaningDates(startDate);
    const nextPressureWash = calculateNextPressureWash(startDate);
    const validTill = calculateSubscriptionValidTill(startDate);
    document.getElementById('subscription-details').innerHTML = `
        <h2>Subscription Details</h2>
        <p><strong>Start Date:</strong> ${startDate}</p>
        <p><strong>Exterior Cleaning:</strong> Daily</p>
        <p><strong>Interior Cleaning Dates:</strong> ${interiorCleaningDates.join(', ')}</p>
        <p><strong>Pressure Wash:</strong> ${nextPressureWash}</p>
        <p><strong>Valid Till (30 Days):</strong> ${validTill}</p>
    `;
}

// Handle form submission
document.getElementById('subscription-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const startDate = document.getElementById('start-date').value;
    displaySubscriptionDetails(startDate);
});