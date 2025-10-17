
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

type Category = 'daily' | 'weekly' | 'monthly' | 'yearly';

const categories: Record<Category, string> = {
    daily: 'dailyList',
    weekly: 'weeklyList',
    monthly: 'monthlyList',
    yearly: 'yearlyList'
};

let tasks: Record<Category, Task[]> = {
    daily: [],
    weekly: [],
    monthly: [],
    yearly: []
};

let taskIdCounter: number = 0;

// Load from localStorage
function loadTasks() {
    for (const category in categories) {
        const cat = category as Category;
        const data = localStorage.getItem(`tasks_${cat}`);
        if (data) {
            tasks[cat] = JSON.parse(data);
        }
    }
}

// Save to localStorage
function saveTasks() {
    for (const category in categories) {
        const cat = category as Category;
        localStorage.setItem(`tasks_${cat}`, JSON.stringify(tasks[cat]));
    }
}

// Render functions
function renderCategory(category: Category) {
    const listElement = document.getElementById(categories[category]) as HTMLUListElement;
    listElement.innerHTML = '';
    tasks[category].forEach(task => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.className = 'task-text' + (task.completed ? ' task-completed' : '');
        span.textContent = task.text;
        span.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderCategory(category);
        };
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = () => {
            tasks[category] = tasks[category].filter(t => t.id !== task.id);
            saveTasks();
            renderCategory(category);
        };
        li.appendChild(span);
        li.appendChild(deleteBtn);
        listElement.appendChild(li);
    });
}

function renderAll() {
    for (const category in categories) {
        renderCategory(category as Category);
    }
}

// Add new task
function addTask() {
    const input = document.getElementById('newTaskInput') as HTMLInputElement;
    const text = input.value.trim();
    if (text === '') return;
    const newTask: Task = {
        id: ++taskIdCounter,
        text: text,
        completed: false
    };
    // For simplicity, add to all categories initially
    for (const category in categories) {
        const cat = category as Category;
        tasks[cat].push({...newTask});
    }
    input.value = '';
    saveTasks();
    renderAll();
}

// Initialize
function init() {
    loadTasks();
    // Set initial taskIdCounter
    let maxId = 0;
    for (const category in tasks) {
        tasks[category as Category].forEach(t => { if (t.id > maxId) maxId = t.id; });
    }
    taskIdCounter = maxId;
    // Attach event listener
    document.getElementById('addTaskBtn')!.addEventListener('click', addTask);
    document.getElementById('newTaskInput')!.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    renderAll();
}

window.onload = init;
