const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task event listener
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    if (task.trim() === "" || deadline === "") {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if task or deadline is empty
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if deadline is not in the future
    }

    const taskData = { task, priority, deadline, done: false };
    addTaskToDOM(taskData);
    saveTaskToLocalStorage(taskData);

    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
});

// Mark task as done event listener
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.classList.add("task-done");
        event.target.disabled = true;

        const taskText = taskItem.querySelector('p').textContent;
        updateTaskStatusInLocalStorage(taskText, true);

        // Wait for the transition to finish before removing the task
        setTimeout(() => {
            taskItem.remove();
        }, 500); // This should match the duration in CSS
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskData => addTaskToDOM(taskData));
}

function addTaskToDOM({ task, priority, deadline, done }) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <p>${task}</p>
        <p>Priority: ${priority}</p>
        <p>Deadline: ${deadline}</p>
        <button class="mark-done" ${done ? 'disabled' : ''}>Mark Done</button>
    `;

    if (done) {
        taskItem.classList.add("task-done");
    }

    taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(taskData) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText, done) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map(taskData => {
        if (taskData.task === taskText) {
            return { ...taskData, done };
        }
        return taskData;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
