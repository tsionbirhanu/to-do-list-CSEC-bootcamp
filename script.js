const modal = document.getElementById('modal');
const addBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancelBtn');
const applyBtn = document.getElementById('applyBtn');
const noteInput = document.getElementById('noteInput');

addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    noteInput.value = '';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

applyBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text) {
        addTask(text);
        modal.style.display = 'none';
    }
});
const task=[]