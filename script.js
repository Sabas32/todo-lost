var toDoList = [];

let allTasks;

const tasksContainer = document.querySelector("#tasksContainer");
const addToDoButton = document.querySelector(".btn-add");
const addTaskInput = document.querySelector("#add-task");

function workOnCheacke() {
  document.querySelectorAll(".taskSeen").forEach((e, index) => {
    // toDoList[index]

    if (toDoList[index].isDone === true) {
      e.checked = true;
    } else {
      e.checked = false;
    }
    e.addEventListener("input", () => {
      if (e.checked === true) {
        toDoList[index].isDone = true;
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        console.log(toDoList);
      } else {
        toDoList[index].isDone = false;
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        console.log(toDoList);
      }
      console.log(e.checked);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  appendTodos();
  workOnCheacke();
});

function handleAddButton() {
  if (addTaskInput.value) {
    addTODO(addTaskInput.value);
    tasksContainer.innerHTML = "";
    appendTodos();

    workOnCheacke();

    addTaskInput.value = "";
  }
}
addToDoButton.addEventListener("click", handleAddButton);

function appendTodos() {
  toDoList.map((e, index) => {
    console.log(e);
    console.log(index);

    const toDoItem = document.createElement("label");
    toDoItem.classList.add("task");
    toDoItem.htmlFor = `task-${index}`;
    toDoItem.style.setProperty("--i", index + 1);
    toDoItem.innerHTML = `
        <input class='taskSeen' type="checkbox" name=task-${index} id=task-${index} />
        <div class="checkbox">
            <p>${e.toDo}</p>
        </div>
        <div class="cancel" onClick='deleteToDo(${index})'>x</div>
        `;
    tasksContainer.appendChild(toDoItem);
  });
}

if (!localStorage.getItem("toDoList")) {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
if (localStorage.getItem("toDoList")) {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
  console.log(toDoList);
}
function addTODO(toDOText) {
  toDoList.unshift({ toDo: `${toDOText}`, isDone: false });
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
function deleteToDo(indexToDelete) {
  toDoList.splice(indexToDelete, 1);
  console.log(toDoList);

  console.log(indexToDelete);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  tasksContainer.innerHTML = "";
  appendTodos();
  workOnCheacke();
}
