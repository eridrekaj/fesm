let updateInterval;

function updatePositions(dateTime) {
    
	let sun = document.getElementById("sun"),
		moon = document.getElementById("moon");

    let currentTime = new Date(dateTime),
		yearStart = new Date(currentTime.getFullYear(), 0, 0),
		diff = currentTime - yearStart;

    let oneDay = 1000 * 60 * 60 * 24,
		daysElapsed = diff / oneDay,
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes(),
		timeOfDayFraction = (hours + minutes / 60) / 24;

    let totalElapsedDays = daysElapsed + timeOfDayFraction;

    let sunDistance = 200 + 20 * Math.sin((totalElapsedDays / 365) * 2 * Math.PI),
		sunAngle = timeOfDayFraction * 360 - 90;

    let lunarCycle = 29.53,
		moonPhaseAngle = (totalElapsedDays % lunarCycle) / lunarCycle * 360,
		moonDailyProgress = (totalElapsedDays * 13.2) % 360,
		moonAngle = sunAngle + moonPhaseAngle + moonDailyProgress;

    let moonDistance = 180 + 20 * Math.cos((moonPhaseAngle / 360) * 2 * Math.PI);

    sun.style.transform = `translate(-50%, -50%) rotate(${sunAngle}deg) translateX(${sunDistance}px)`;
    moon.style.transform = `translate(-50%, -50%) rotate(${moonAngle}deg) translateX(${moonDistance}px)`;

}

function formatLocalDateTime(date) {
    
	let year = date.getFullYear(),
		month = String(date.getMonth() + 1).padStart(2, '0'),
		day = String(date.getDate()).padStart(2, '0'),
		hours = String(date.getHours()).padStart(2, '0'),
		minutes = String(date.getMinutes()).padStart(2, '0');
    
	return `${year}-${month}-${day}T${hours}:${minutes}`;

}

let datetimeInput = document.getElementById("datetimeInput"),
	now = new Date(),
	currentDateTime = formatLocalDateTime(now);

datetimeInput.value = currentDateTime;

function startInterval() {
    
	updateInterval = setInterval(function () {
        
		let now = new Date();
        let updatedTime = formatLocalDateTime(now);
        datetimeInput.value = updatedTime;
        updatePositions(updatedTime);
    
	}, 60000);

}

datetimeInput.addEventListener("input", function () {
    
	let selectedDateTime = this.value;

    if (updateInterval) {
        clearInterval(updateInterval);
    }

    updatePositions(selectedDateTime);

});

updatePositions(currentDateTime);
startInterval();