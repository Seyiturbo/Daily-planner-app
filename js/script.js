var currentDayText = document.querySelector('#currentDay');
var currentDay = dayjs().format('dddd, MMMM Do');
var currentHour = dayjs().hour();

currentDayText.innerText = currentDay;

var timeContainer = document.querySelector('.container');

// set Start time to 9 am and end time to 5 pm using day.js
var startTime = dayjs().startOf('day').hour(9);
var endTime = dayjs().startOf('day').hour(18);

// Generate and display the list of hours with input fields
for (var hour = startTime; hour.isBefore(endTime); hour = hour.add(1, 'hour')) {
	// Create a div for each hour row
	var div = document.createElement('div');
	div.classList = 'row-block';