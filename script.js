const addTask = () => {
    const searchInput = document.getElementById('search');
    const text = searchInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text: text, completed: false });
        searchInput.value = '';
        updateTaskList();
        saveToLocalStorage();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filterOption = document.getElementById('options').value;
    
    taskList.innerHTML = '';

    let filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchTerm);
        const matchesFilter = 
            filterOption === 'ALL' || 
            (filterOption === 'Complete' && task.completed) || 
            (filterOption === 'Incomplete' && !task.completed);
        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <img src="Detective-check-footprint 1.png" alt="Empty state">
                <p>Empty...</p>
            </div>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="task-item">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
                    <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
                </div>
            </div>
        `;
        
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));
        
        taskList.appendChild(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveToLocalStorage();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    saveToLocalStorage();
};

const editTask = (index) => {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        updateTaskList();
        saveToLocalStorage();
    }
};

const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        updateTaskList();
    }
};
document.getElementById('add').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

document.getElementById('search').addEventListener('input', updateTaskList);
document.getElementById('options').addEventListener('change', updateTaskList);

document.getElementById('mode').addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.style.backgroundColor = darkMode ? '#1a1a1a' : '#ffffff';
    document.body.style.color = darkMode ? '#ffffff' : '#333333';
    localStorage.setItem('darkMode', darkMode);
});
loadFromLocalStorage();