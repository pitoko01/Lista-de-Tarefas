document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
        updateTaskCounter(); // Atualiza o contador após adicionar uma tarefa
    }
});

function addTask(taskText, completed = false) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    if (completed) {
        taskSpan.classList.add('completed');
    }
    listItem.appendChild(taskSpan);

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-check fa-lg"></i>';
    completeButton.addEventListener('click', function() {
        taskSpan.classList.toggle('completed');
        saveTasks();
    });

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-pen fa-lg"></i>';
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edite a tarefa:', taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskSpan.textContent = newTaskText.trim();
            saveTasks();
            console.log('Tarefa editada');
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark fa-lg"></i>';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        saveTasks();
        updateTaskCounter(); // Atualiza o contador após remover uma tarefa
        console.log('Tarefa excluída');
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(listItem => {
        const taskSpan = listItem.querySelector('span');
        tasks.push({
            text: taskSpan.textContent,
            completed: taskSpan.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
    updateTaskCounter(); // Atualiza o contador ao carregar as tarefas
}

function updateTaskCounter() {
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');
    const taskCount = taskList.children.length;
    taskCounter.textContent = `Tarefas: ${taskCount}`;
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);