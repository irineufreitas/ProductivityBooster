document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskTitle = document.getElementById('title');
    const taskDescription = document.getElementById('description');
    const taskDueDate = document.getElementById('dueDate');
    const taskList = document.getElementById('task-list');
  
    // Fetch tasks from the server
    async function fetchTasks() {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      tasks.forEach(task => {
        displayTask(task);
      });
    }
  
    // Display a task on the page
    function displayTask(task) {
      const li = document.createElement('li');
      li.textContent = `${task.title} - ${task.description} (Due: ${task.dueDate})`;
      taskList.appendChild(li);
    }
  
    // Add a new task
    taskForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const title = taskTitle.value.trim();
      const description = taskDescription.value.trim();
      const dueDate = taskDueDate.value;
  
      if (title && description && dueDate) {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, description, dueDate })
        });
        const newTask = await response.json();
        displayTask(newTask);
        taskTitle.value = '';
        taskDescription.value = '';
        taskDueDate.value = '';
      }
    });
  
    // Initial fetch of tasks
    fetchTasks();
  });
  