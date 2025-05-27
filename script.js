// // script.js

// const taskForm = document.getElementById('task-form');
// const taskInput = document.getElementById('task-input');
// const taskList = document.getElementById('task-list');
// const dueDateInput = document.getElementById('due-date');
// const priorityInput = document.getElementById('priority');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// // Load tasks on startup
// tasks.forEach(task => renderTask(task));

// function saveTasks() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function renderTask(task) {
//   const li = document.createElement('li');
//   li.className = 'task-item';
//   if (task.completed) li.classList.add('completed');
//   li.draggable = true;

//   const details = document.createElement('div');
//   details.className = 'task-details';

//   const text = document.createElement('span');
//   text.textContent = task.text;
//   text.className = 'task-text';

//   const meta = document.createElement('span');
//   meta.className = 'task-meta';
//   meta.textContent = `Due: ${task.dueDate || 'N/A'} | Priority: ${task.priority}`;

//   details.appendChild(text);
//   details.appendChild(meta);

//   const actions = document.createElement('div');
//   actions.className = 'task-actions';

//   const completeBtn = document.createElement('button');
//   completeBtn.textContent = '✔';
//   completeBtn.onclick = () => toggleComplete(task, li);

//   const editBtn = document.createElement('button');
//   editBtn.textContent = '✏';
//   editBtn.onclick = () => editTask(task, text);

//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = '🗑';
//   deleteBtn.onclick = () => deleteTask(task, li);

//   actions.appendChild(completeBtn);
//   actions.appendChild(editBtn);
//   actions.appendChild(deleteBtn);

//   li.appendChild(details);
//   li.appendChild(actions);
//   taskList.appendChild(li);

//   // Drag and Drop
//   li.addEventListener('dragstart', e => {
//     li.classList.add('dragging');
//     e.dataTransfer.setData('text/plain', task.id);
//   });

//   li.addEventListener('dragend', () => li.classList.remove('dragging'));
// }

// taskForm.onsubmit = function (e) {
//   e.preventDefault();
//   const newTask = {
//     id: Date.now().toString(),
//     text: taskInput.value,
//     dueDate: dueDateInput.value,
//     priority: priorityInput.value,
//     completed: false
//   };
//   tasks.push(newTask);
//   saveTasks();
//   renderTask(newTask);
//   taskForm.reset();
// };

// function toggleComplete(task, li) {
//   task.completed = !task.completed;
//   li.classList.toggle('completed');
//   saveTasks();
// }

// function editTask(task, textElement) {
//   const newText = prompt('Edit task:', task.text);
//   if (newText) {
//     task.text = newText;
//     textElement.textContent = newText;
//     saveTasks();
//   }
// }

// function deleteTask(task, li) {
//   tasks = tasks.filter(t => t.id !== task.id);
//   li.remove();
//   saveTasks();
// }

// // Drag-and-drop reordering
// taskList.addEventListener('dragover', e => {
//   e.preventDefault();
//   const afterElement = getDragAfterElement(taskList, e.clientY);
//   const dragging = document.querySelector('.dragging');
//   if (afterElement == null) {
//     taskList.appendChild(dragging);
//   } else {
//     taskList.insertBefore(dragging, afterElement);
//   }
// });

// function getDragAfterElement(container, y) {
//   const elements = [...container.querySelectorAll('.task-item:not(.dragging)')];
//   return elements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect();
//     const offset = y - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child };
//     } else {
//       return closest;
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element;
// }
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date");
    const priorityInput = document.getElementById("priority");
  
    function createTaskElement(text, dueDate, priority) {
      const li = document.createElement("li");
      li.classList.add("task-item");
  
      // Task Details
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "task-details";
  
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = text;
  
      const meta = document.createElement("span");
      meta.className = "task-meta";
  
      const prioritySpan = document.createElement("span");
      prioritySpan.classList.add("priority-indicator");
  
      // Apply color class
      if (priority === "high") {
        prioritySpan.classList.add("priority-high");
        prioritySpan.textContent = "High";
      } else if (priority === "medium") {
        prioritySpan.classList.add("priority-medium");
        prioritySpan.textContent = "Medium";
      } else {
        prioritySpan.classList.add("priority-low");
        prioritySpan.textContent = "Low";
      }
  
      meta.textContent = dueDate ? `Due: ${dueDate} ` : "No deadline";
      meta.appendChild(prioritySpan);
  
      detailsDiv.appendChild(taskText);
      detailsDiv.appendChild(meta);
  
      // Task Actions
      const actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";
  
      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = "✔️";
      completeBtn.title = "Mark as completed";
      completeBtn.onclick = () => {
        li.classList.toggle("completed");
      };
  
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.title = "Delete task";
      deleteBtn.onclick = () => {
        li.remove();
        checkEmptyState();
      };
  
      actionsDiv.appendChild(completeBtn);
      actionsDiv.appendChild(deleteBtn);
  
      li.appendChild(detailsDiv);
      li.appendChild(actionsDiv);
  
      return li;
    }
  
    function checkEmptyState() {
      if (taskList.children.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "empty-state";
        emptyMsg.textContent = "✨ No tasks yet. Add something!";
        taskList.appendChild(emptyMsg);
      } else {
        const emptyMsg = document.querySelector(".empty-state");
        if (emptyMsg) emptyMsg.remove();
      }
    }
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const text = taskInput.value.trim();
      const dueDate = dueDateInput.value;
      const priority = priorityInput.value;
  
      if (!text) return;
  
      const taskItem = createTaskElement(text, dueDate, priority);
      taskList.appendChild(taskItem);
  
      // Reset form
      taskForm.reset();
  
      checkEmptyState();
    });
  
    checkEmptyState();
  });
  const filterSelect = document.getElementById('filter-tasks');

  filterSelect.addEventListener('change', () => {
    filterTasks(filterSelect.value);
  });
  
  function filterTasks(filter) {
    document.querySelectorAll('.task-item').forEach(taskEl => {
      const isCompleted = taskEl.classList.contains('completed');
      if (filter === 'all') {
        taskEl.style.display = 'flex';
      } else if (filter === 'completed' && isCompleted) {
        taskEl.style.display = 'flex';
      } else if (filter === 'pending' && !isCompleted) {
        taskEl.style.display = 'flex';
      } else {
        taskEl.style.display = 'none';
      }
    });
  }
    