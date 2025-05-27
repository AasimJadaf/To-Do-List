
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date");
    const priorityInput = document.getElementById("priority");
  
    function createTaskElement(text, dueDate, priority) {
      const li = document.createElement("li");
      li.classList.add("task-item");
  
  
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "task-details";
  
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = text;
  
      const meta = document.createElement("span");
      meta.className = "task-meta";
  
      const prioritySpan = document.createElement("span");
      prioritySpan.classList.add("priority-indicator");
  
  
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
    