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
    var label = document.createElement('div');
	label.classList = 'hour';
	label.textContent = hour.format('hA');

	// Create an input field for the hour
	var input = document.createElement('input');
	input.type = 'text';
	input.id = 'input_' + hour.format('H');
	input.classList = 'row';

	// Preload value from localStorage if available
	var savedValue = localStorage.getItem('input_' + hour.format('H'));
	if (savedValue) {
	    input.value = savedValue;
	}

	// add appropriate class based on time
	if (hour.hour() < currentHour) {
		input.classList.add('past');
		input.disabled = true;
	} else if (hour.hour() === currentHour) {
		input.classList.add('present');
	} else {
		input.classList.add('future');
	}

	var saveBtn = document.createElement('div');
	saveBtn.id = 'saveBtn_' + hour.format('H');
	saveBtn.dataset.sid = hour.format('H');
	saveBtn.classList = 'saveBtn';
	saveBtn.innerHTML = '<i class="fas fa-save"></i>';

	saveBtn.addEventListener('click', function() {
	    id = this.dataset.sid;
	    var inputValue = document.querySelector('#input_' + id).value.trim();
    	if (!inputValue) {
			alert('Please input a valid event for the selected hour, ' + dayjs().hour(id).format('h')  + dayjs().startOf('day').hour(id).format('A'));
    	} else {
      		// Save the value to localStorage
      		localStorage.setItem('input_' + id, inputValue);
			var message = document.createElement('div');
			message.classList = 'time-block';
			message.innerText = 'Appointment for ' + dayjs().hour(id).format('h')  + dayjs().startOf('day').hour(id).format('A') + ' added to localStorage';
			timeContainer.prepend(message);
      		// alert('Event saved for ' + dayjs().hour(id).format('h')  + dayjs().startOf('day').hour(id).format('A'));
    	}
	});

	// Add the elements to the div and container
	div.appendChild(label);
	div.appendChild(input);
	div.appendChild(saveBtn);
	timeContainer.appendChild(div);
}