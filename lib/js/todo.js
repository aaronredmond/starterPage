let taskList = [];

// ------------------------------------
// Create task list item
// ------------------------------------
const renderTaskList = (tasks) => {
  $(".tasklist").empty();
  tasks.forEach((task) => {
    const listElement = createLiElement();
    const inputElement = createCheckboxInputElement();
    listElement.textContent = ` ${task.title}`;
    listElement.dataset.index = task.id;
    if (task.completed) {
      listElement.style.cssText = "text-decoration: line-through; color: red;";
      inputElement.checked = true;
    }
    listElement.prepend(inputElement);
    listElement.onchange = function (event) {
      handleClick($(event.target));
    };
    $(".tasklist").append(listElement);
  });
};

// ------------------------------------
// Create Li Element
// ------------------------------------
const createLiElement = () => {
  const listElement = document.createElement("li");
  listElement.classList.add("list-group-item");
  return listElement;
};

// ------------------------------------
// Create Checkbox Input Element
// ------------------------------------
const createCheckboxInputElement = () => {
  const inputElement = document.createElement("input");
  inputElement.classList.add("form-check-input");
  inputElement.classList.add("me-1");
  inputElement.type = "checkbox";
  return inputElement;
};
// ------------------------------------
// Handle Add Task button click
// ------------------------------------
$(".btnTask").click(function () {
  if ($(".taskname").val() == "") return;
  const newId = taskList.length == 0 ? 1 : taskList[taskList.length - 1].id + 1;
  taskList.push({
    id: newId,
    title: $(".taskname").val(),
    completed: false,
  });
  $(".taskname").val("");
  renderTaskList(taskList);
  $(".btnClear").css("display", "block");
  $(".btnClearCompleted").css("display", "block");
  localStorage.setItem("taskList", JSON.stringify(taskList));
});

// ------------------------------------
// Handle Clear All button click
// ------------------------------------
$(".btnClear").click(function () {
  localStorage.clear();
  $(".tasklist").empty();
  taskList = [];
  $(this).css("display", "none");
  $(".btnClearCompleted").css("display", "none");
});

// ------------------------------------
// Handle Clear Completed button click
// ------------------------------------
$(".btnClearCompleted").click(function () {
  taskList = taskList.filter(function (a) {
    if (a.completed == false) {
      return a;
    }
  });
  renderTaskList(taskList);
  localStorage.setItem("taskList", JSON.stringify(taskList));

  if (taskList.length == 0) {
    localStorage.clear();
    $(".btnClear").css("display", "none");
    $(".btnClearCompleted").css("display", "none");
  }
});

// ------------------------------------
// Handle Task List Page Load Behaviour
// ------------------------------------
let saved = localStorage.getItem("taskList");
if (saved) {
  taskList = JSON.parse(localStorage.getItem("taskList"));
  renderTaskList(taskList);
} else {
  $(".btnClear").css("display", "none");
  $(".btnClearCompleted").css("display", "none");
}

// ------------------------------------
// Handle Task Completed Status
// ------------------------------------
$(".form-check-input").change(function () {
  handleClick($(this));
});

const handleClick = (element) => {
  const selectedIndex = element.parent().attr("data-index");
  const checkedState = element.prop("checked");
  setTaskCssProperties(element.parent(), checkedState);
  taskList.forEach(function (task) {
    if (task.id == selectedIndex) {
      task.completed = checkedState;
    }
  });
  localStorage.setItem("taskList", JSON.stringify(taskList));
};

// ------------------------------------
// Set Task Css Properties
// ------------------------------------
const setTaskCssProperties = (element, completed) => {
  const completedColor = "#ff0000";
  if (completed) {
    element.css("text-decoration", "line-through");
    element.css("color", completedColor);
  } else {
    element.css("text-decoration", "");
    element.css("color", "");
  }
};

// ------------------------------------
// Call Click Event When Enter Key Is Pressed
// ------------------------------------
$("#newTask").keyup(function (event) {
  if (event.keyCode === 13) {
    $(".btnTask").click();
  }
});
