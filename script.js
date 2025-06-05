let tasks = [];
let taskId = 0;

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text === '') return;

    const task = {
        id: taskId++,
        text: text,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(task);
    input.value = '';
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 px-5 text-gray-400">
                <i class="fas fa-tasks text-5xl mb-4 opacity-50"></i>
                <p>No tasks yet. Add one above!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="bg-white rounded-2xl p-4 mb-3 flex items-center justify-between shadow-md transition-all duration-300 task-item hover:shadow-lg animate-slide-in">
            <div class="flex items-center flex-1">
                <div class="w-5 h-5 border-2 ${task.completed ? 'gradient-btn border-indigo-500 text-white' : 'border-gray-300'} rounded-md mr-3 cursor-pointer flex items-center justify-center transition-all duration-300" onclick="toggleTask(${task.id})">
                    ${task.completed ? '<i class="fas fa-check text-xs"></i>' : ''}
                </div>
                <span class="text-base text-gray-700 transition-all duration-300 ${task.completed ? 'line-through text-gray-400' : ''}">${task.text}</span>
            </div>
            <div class="flex gap-2">
                <button class="w-8 h-8 bg-red-100 text-red-500 border-none rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-red-200" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash text-xs"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    
    document.getElementById('taskCount').textContent = totalTasks;
    document.getElementById('completedCount').textContent = completedTasks;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to add tasks
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Add some sample tasks for demonstration
    setTimeout(() => {
        const sampleTasks = [
            'Meeting with Jesse',
            'Call with Gustavo',
            'Review project proposal'
        ];
        
        sampleTasks.forEach(taskText => {
            const task = {
                id: taskId++,
                text: taskText,
                completed: Math.random() > 0.7,
                createdAt: new Date()
            };
            tasks.push(task);
        });
        
        renderTasks();
        updateStats();
    }, 1000);
});
