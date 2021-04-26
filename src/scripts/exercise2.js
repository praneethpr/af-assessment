import '../styles/exercise2.scss';

let getDomElementById = (id) => {
  return document.getElementById(id);
}

let showTodo = () => {
  let todoItems = JSON.parse(localStorage.getItem('todo'));
  for (const [key, value] of Object.entries(todoItems)) {
    let newListItem = createNewTaskElement(value);
    getDomElementById("incomplete-tasks").appendChild(newListItem);
    bindTaskEvents(newListItem, taskCompleted);
  }
}

let showCompleted = () => {
  // To do
}

let showAll = () => {
  showTodo();
  showCompleted();
}

window.onload = (event) => {
  showAll();
} 

let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  checkBox.setAttribute("aria-label", "todo-item-checkbox");
  checkBox.setAttribute("tabindex", "0");
  editInput.type = "text";
  editInput.setAttribute("aria-label", "todo-item-input");
  editInput.setAttribute("tabindex", "0");
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

let addTask = function(event) {
  event.preventDefault();
  let taskInput = document.getElementById("new-task");
  let listItemName = taskInput.value;
  if (listItemName) {
    let newListItem = createNewTaskElement(listItemName);
    getDomElementById("incomplete-tasks").appendChild(newListItem);
    bindTaskEvents(newListItem, taskCompleted);
    if (!localStorage.getItem("todo")) {
      let addCurrentElement = { [listItemName] : listItemName};
      localStorage.setItem("todo", JSON.stringify(addCurrentElement));
    } else {
      let existingCollection = JSON.parse(localStorage.getItem("todo"));
      existingCollection[listItemName] = listItemName;
      localStorage.setItem("todo", JSON.stringify(existingCollection));
    }
    taskInput.value = "";
  }
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
  getDomElementById("completed-tasks").appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function() {
  let listItem = this.parentNode;
  getDomElementById("incomplete-tasks").appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  let editButton = taskListItem.querySelectorAll("button.edit")[0];
  let deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

getDomElementById("add-btn").addEventListener("click", addTask);


for (let i = 0; i < getDomElementById("incomplete-tasks").children.length; i++) {
  bindTaskEvents(getDomElementById("incomplete-tasks").children[i], taskCompleted);
}

for (let i = 0; i < getDomElementById("completed-tasks").children.length; i++) {
  bindTaskEvents(getDomElementById("completed-tasks").children[i], taskIncomplete);
}
