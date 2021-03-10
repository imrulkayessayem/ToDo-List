const form = document.querySelector("#form");
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const filter = document.querySelector("#filter");
const todoList = document.querySelector("#todo-list");
const clearBtn = document.querySelector("#clear-btn");

allEventListeners();

function allEventListeners() {

  document.addEventListener("DOMContentLoaded", todoAllSetFormDOM);

  form.addEventListener("submit", addGoal);

  todoList.addEventListener("click", removeGoal);

  clearBtn.addEventListener("click", allGoalClear);

  filter.addEventListener("keyup", filterGoal);

}

function todoAllSetFormDOM() {
  let todoAll;
  if (localStorage.getItem("todoAll") === null) {
    todoAll = [];
  } else {
    todoAll = JSON.parse(localStorage.getItem("todoAll"));
  }

  todoAll.forEach(function (todo) {

    const li = document.createElement("li");

    li.className = "todo-item";

    li.appendChild(document.createTextNode(todo));

    const link = document.createElement("a");

    link.className = "remove-item";

    link.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(link);

    todoList.appendChild(li);

  });
}

function addGoal(e) {
  if (todoInput.value === "") {
    alert("Add Something!!!!!");
  } else {

    const li = document.createElement("li");

    li.className = "todo-item";

    li.appendChild(document.createTextNode(todoInput.value));

    const link = document.createElement("a");

    link.className = "remove-item";

    link.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(link);

    todoList.appendChild(li);

    storeTodoInLocalStorage(todoInput.value);

    todoInput.value = "";

  }

  e.preventDefault();
}

function storeTodoInLocalStorage(todo) {
  let todoAll;

  if (localStorage.getItem("todoAll") === null) {
    todoAll = [];
  } else {
    todoAll = JSON.parse(localStorage.getItem("todoAll"));
  }

  todoAll.push(todo);

  localStorage.setItem("todoAll", JSON.stringify(todoAll));
}

function removeGoal(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();

    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeFromLocalStorage(todoItem) {
  let todoAll;

  if (localStorage.getItem("todoAll") === null) {
    todoAll = [];
  } else {
    todoAll = JSON.parse(localStorage.getItem("todoAll"));
  }

  todoAll.forEach(function (todo, index) {
    if (todoItem.textContent === todo) {
      todoAll.splice(index, 1);
    }
  });

  localStorage.setItem("todoAll", JSON.stringify(todoAll));
}

function allGoalClear(e) {

  if (confirm("Are You Sure????????")) {
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  }

  allGoalClearFromLocalStorage();
}

function allGoalClearFromLocalStorage() {
  localStorage.clear();
}

function filterGoal(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".todo-item").forEach(function (todo) {
    const item = todo.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}