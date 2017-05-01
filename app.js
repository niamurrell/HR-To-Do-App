var tasks = [];

var taskList = document.getElementById('task-list');

var taskInput = document.getElementById('task-input');

var addTask = function() {
	var taskText = taskInput.value;
	tasks.push(taskText);
	taskInput.value = '';

	showNewTask();
}

var showNewTask = function() {
	var taskIndex = tasks.length - 1;
	var task = tasks[taskIndex]

	var newTask = document.createElement('li');
	newTask.id = taskIndex;
	newTask.innerHTML = task;
	taskList.appendChild(newTask);

	appendOptionButtons(taskIndex, newTask);
}

var appendOptionButtons = function(index, task) {
	//remove the element from the array *and from the DOM*
	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'X';
	deleteButton.onclick = function () {
		removeTask(index);
	};

	var editButton = document.createElement('button');
	editButton.innerHTML = 'EDIT';
	editButton.onclick = function() {
		addEditField(index);
	}

	task.appendChild(deleteButton);
	task.appendChild(editButton);
}

var removeTask = function(index) {
	tasks.splice(index, 1);
	var taskToRemove = document.getElementById('' + index + ''); //needs to be a string
	taskList.removeChild(taskToRemove);
}

var addEditField = function(index) {
	var taskToChange = document.getElementById('' + index + '');
	var editInput = document.createElement('input'); //creates new html element for the DOM
	editInput.type = 'text';
	editInput.id = 'edit' + index;
	editInput.class = 'edit-input';
	editInput.placeholder = 'Update Task';

	var editButton = document.createElement('button');
	editButton.innerHTML = 'Update task';
	editButton.onclick = function() {
		updateTask(index);
	}

	taskToChange.appendChild(editInput);
	taskToChange.appendChild(editButton);
}

var updateTask = function(index) {
	var editInput = document.getElementById('edit' + index + '');
	var updatedTask = editInput.value;

	tasks[index] = updatedTask;

	var task = document.getElementById('' + index + '');
	task.innerHTML = updatedTask;

	appendOptionButtons(index, task);
}

//NEXT STEPS:
//create server.js and run the array to there, but it would delete it every time the computer closes
//alternative is to use RESTful API & AWS S3 to store & get/push entries