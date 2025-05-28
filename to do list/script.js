document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            toggleTaskComplete(event.target.parentNode);
        } else if (event.target.classList.contains('delete-btn')) {
            deleteTask(event.target.parentNode);
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);

        saveTasks(); // Save tasks after adding

        taskInput.value = ''; // Clear the input field
    }

    function toggleTaskComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save tasks after toggling
    }

    function deleteTask(taskItem) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskList.removeChild(taskItem);
            saveTasks(); // Save tasks after deleting
        }
    }

    function clearCompletedTasks() {
        const completedTasks = taskList.querySelectorAll('.completed');
        if (completedTasks.length === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (confirm('Are you sure you want to clear all completed tasks?')) {
            completedTasks.forEach(task => {
                taskList.removeChild(task);
            });
            saveTasks(); // Save tasks after clearing completed
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task.text}</span>
                    <button class="delete-btn">Delete</button>
                `;
                if (task.completed) {
                    li.classList.add('completed');
                }
                taskList.appendChild(li);
            });
        }
    }
});