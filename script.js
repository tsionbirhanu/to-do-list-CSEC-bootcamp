const modal = document.getElementById('modal');
const addBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancelBtn');
const applyBtn = document.getElementById('applyBtn');
const noteInput = document.getElementById('noteInput');
const taskList = document.getElementById('task-list');
const emptyState = document.querySelector('.empty-state');
const modeToggle = document.getElementById('mode');

let noteCounter = 1;

// Show/hide empty state
function toggleEmptyState() {
    if (taskList.children.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
    }
}

// Filter tasks based on completion status
function filterTasks() {
    const filterValue = document.getElementById('options').value;
    const tasks = document.querySelectorAll('.task-item');
    let visibleTasks = 0;

    tasks.forEach(task => {
        const checkbox = task.querySelector('.checkbox');
        const isCompleted = checkbox.checked;

        if (filterValue === 'ALL' || 
            (filterValue === 'Complete' && isCompleted) || 
            (filterValue === 'Incomplete' && !isCompleted)) {
            task.style.display = 'flex';
            visibleTasks++;
        } else {
            task.style.display = 'none';
        }
    });

    // Show/hide empty state based on visible tasks
    emptyState.style.display = visibleTasks === 0 ? 'flex' : 'none';
}

// Add event listener for filter change
document.getElementById('options').addEventListener('change', filterTasks);

// Update filter when task status changes
function updateTaskStatus() {
    if (this.checked) {
        this.nextElementSibling.style.textDecoration = 'line-through';
        this.nextElementSibling.style.color = '#888';
    } else {
        this.nextElementSibling.style.textDecoration = 'none';
        this.nextElementSibling.style.color = '';
    }
    filterTasks(); // Update filtered view
}

// Add new task
function addTask() {
    const text = noteInput.value.trim();
    if (text !== '') {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span class="task-text">${text}</span>
            <div class="task-actions">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        `;
        
        // Add event listeners
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.fa-edit');
        const deleteBtn = li.querySelector('.fa-trash-alt');
        const taskText = li.querySelector('.task-text');
        
        checkbox.addEventListener('change', updateTaskStatus);
        
        editBtn.addEventListener('click', function() {
            const newText = prompt('Edit task:', taskText.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskText.textContent = newText;
            }
        });
        
        deleteBtn.addEventListener('click', function() {
            li.remove();
            toggleEmptyState();
            filterTasks(); // Update filtered view after deletion
        });
        
        taskList.appendChild(li);
        noteCounter++;
        modal.style.display = 'none';
        noteInput.value = '';
        toggleEmptyState();
        filterTasks(); // Update filtered view after adding
    }
}

// Event listeners
addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    noteInput.focus();
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    noteInput.value = '';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        noteInput.value = '';
    }
});

applyBtn.addEventListener('click', addTask);

noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Dark mode toggle
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const modeIcon = modeToggle.querySelector('.material-symbols-outlined');
    
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.textContent = 'light_mode';
    } else {
        modeIcon.textContent = 'dark_mode';
    }
});

// Initial empty state check
toggleEmptyState();