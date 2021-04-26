import '../styles/exercise2.scss';

let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTasksHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

let createNewTaskElement = function(taskString, arr) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

let addTask = function() {
  let listItemName = taskInput.value || "New Item"
  listItem = createNewTaskElement(listItemName)
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted)
  taskInput.value = "";
};

let editTask = function() {
  let listItem = this.parentNode;
  let editInput = listItem.querySelectorAll("input[type=text")[0];
  let label = listItem.querySelector("label");
  let button = listItem.getElementsByTagName("button")[0];

  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText
    button.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

let deleteTask = function(el) {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

let taskCompleted = function(el) {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function() {
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

let bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
  let checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  let editButton = taskListItem.querySelectorAll("button.edit")[0];
  let deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}