const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    renderCalendar();
});

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    if (task.trim() === "" || deadline === "") {
        alert("Please select an upcoming date for the deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return;
    }

    const taskData = { task, priority, deadline, done: false };
    addTaskToDOM(taskData);
    saveTaskToLocalStorage(taskData);

    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";

    renderCalendar();
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        const taskText = taskItem.querySelector('p').textContent;
        
        taskItem.classList.add("task-done");
        event.target.disabled = true;

        updateTaskStatusInLocalStorage(taskText, true);

        // Remove the task from the DOM and update the calendar
        setTimeout(() => {
            taskItem.remove();
            deleteTaskFromLocalStorage(taskText);
            renderCalendar();
        }, 500);
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskData => {
        if (!taskData.done) {
            addTaskToDOM(taskData);
        }
    });
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

function deleteTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(taskData => taskData.task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function renderCalendar() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksByDate = tasks.reduce((acc, task) => {
        if (!task.done) {
            acc[task.deadline] = acc[task.deadline] || [];
            acc[task.deadline].push(task);
        }
        return acc;
    }, {});

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        let day = i < 10 ? `0${i}` : i;
        let month = currMonth + 1 < 10 ? `0${currMonth + 1}` : currMonth + 1;
        let fullDate = `${currYear}-${month}-${day}`;
        let hasTask = tasksByDate[fullDate] ? "has-task" : "";
        liTag += `<li class="${isToday} ${hasTask}" data-date="${fullDate}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    document.querySelectorAll(".days li").forEach(day => {
        day.addEventListener("click", (e) => {
            const selectedDate = e.target.getAttribute("data-date");
            if (tasksByDate[selectedDate]) {
                highlightTasks(selectedDate);
            }
        });
    });
}

function highlightTasks(date) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksToHighlight = tasks.filter(task => task.deadline === date && !task.done);

    taskList.querySelectorAll('.task').forEach(taskItem => {
        taskItem.classList.remove("highlight");
    });

    tasksToHighlight.forEach(taskData => {
        const taskItems = taskList.querySelectorAll('.task');
        taskItems.forEach(taskItem => {
            if (taskItem.querySelector('p').textContent === taskData.task) {
                taskItem.classList.add("highlight");
                setTimeout(() => {
                    taskItem.classList.remove("highlight");
                }, 3000);
            }
        });
    });
}

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});
