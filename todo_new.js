// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const dosForm = document.querySelector(".js-toDoForm"),
  pendingDoInput = dosForm.querySelector("input"),
  pendingDoList = document.querySelector(".js-toDoList__Pending"),
  finishedDoList = document.querySelector(".js-toDoList__Finished");

let pendingDos = [];
let finishedDos = [];

const PENDING_LS = "pendingdDos";
const FINISHED_LS = "finisheddDos";

function setIdOrder(list) {
  console.log(`WELLCOME TO SET ID ORDER: ${list}`);
  let i = 0;
  while (i < pendingDos.length) {
    pendingDoList.querySelectorAll("li")[i]["id"] = i + 1;
    pendingDos[i].id = i + 1;
    i++;
  }
  console.log(`pendingDos orderde ${pendingDos.length}`);

  i = 0;
  while (i < finishedDos.length) {
    finishedDoList.querySelectorAll("li")[i]["id"] = i + 1;
    finishedDos[i].id = i + 1;
    i++;
  }
  console.log(`finishedDos orderde ${finishedDos.length}`);
}

function saveToDos(inputText) {
  if (inputText === PENDING_LS) {
    if (pendingDos.length > 0) {
      console.log("--SAVING PENDING--");
      setIdOrder(PENDING_LS);
      localStorage.setItem(PENDING_LS, JSON.stringify(pendingDos));
    } else {
      console.log("--PENDING length ZERO--");
      localStorage.setItem(PENDING_LS, JSON.stringify(pendingDos));
    }
  } else {
    if (finishedDos.length > 0) {
      console.log("--SAVING FINISHED--");
      setIdOrder(FINISHED_LS);
      localStorage.setItem(FINISHED_LS, JSON.stringify(finishedDos));
    } else {
      console.log("--FINISHED length ZERO--");
      localStorage.setItem(FINISHED_LS, JSON.stringify(finishedDos));
    }
  }
}

function deleteToDo(event) {
  console.log("DEL BTN PRESSED");
  const btn = event.target;
  const li = btn.parentNode;
  pendingDoList.removeChild(li);
  let delText = "";
  const cleanToDos = pendingDos.filter(function (todo) {
    if (todo.id !== parseInt(li.id)) {
      return todo;
    } else {
      delText = todo.text;
    }
  });
  pendingDos = cleanToDos;
  console.log(`FROM DEL BTN TEXT: ${delText}`);
  console.log(pendingDos);
  saveToDos(PENDING_LS);
}

function deleteFinToDo(event) {
  console.log("DEL BTN PRESSED");
  const btn = event.target;
  const li = btn.parentNode;
  finishedDoList.removeChild(li);
  let delText = "";
  const cleanToDos = finishedDos.filter(function (todo) {
    if (todo.id !== parseInt(li.id)) {
      return todo;
    } else {
      delText = todo.text;
    }
  });
  finishedDos = cleanToDos;
  console.log(`FROM DEL BTN TEXT: ${delText}`);
  console.log(finishedDos);
  saveToDos(FINISHED_LS);
}

function finishToDo(event) {
  const btn = event.target;
  const finLi = btn.parentNode;
  console.log("FIN BTN PRESSED", finLi);
  pendingDoList.removeChild(finLi);

  let finText = "";
  const cleanToDos = pendingDos.filter(function (todo) {
    if (todo.id !== parseInt(finLi.id)) {
      return todo;
    } else {
      finText = todo.text;
    }
  });
  pendingDos = cleanToDos;
  saveToDos(PENDING_LS);

  console.log(`FROM FIN BTN TEXT: ${finText}`);
  paintFinishedDo(finText);
}

function backToDo(event) {
  console.log("BACK BTN PRESSED");
  const btn = event.target;
  const backLi = btn.parentNode;
  finishedDoList.removeChild(backLi);

  let backText = "";
  const cleanToDos = finishedDos.filter(function (todo) {
    if (todo.id !== parseInt(backLi.id)) {
      return todo;
    } else {
      backText = todo.text;
    }
  });
  finishedDos = cleanToDos;
  saveToDos(FINISHED_LS);

  console.log(`FROM BACK BTN TEXT: ${backText}`);
  paintPendingDo(backText);
}

function paintFinishedDo(text) {
  const list = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const spanSpace = document.createElement("span");
  const newID = finishedDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinToDo);
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backToDo);
  span.innerText = text;
  spanSpace.innerText = "  ";
  list.appendChild(span);
  list.appendChild(spanSpace);
  list.appendChild(delBtn);
  list.appendChild(backBtn);
  list.id = newID;

  finishedDoList.appendChild(list);

  const toDoObj = {
    text: text,
    id: newID,
  };
  console.log(`TYPEING FINISHED: text-${text} id-${newID}`);
  finishedDos.push(toDoObj);
  saveToDos(FINISHED_LS);
}

function paintPendingDo(text) {
  const list = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const spanSpace = document.createElement("span");
  const newID = pendingDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerText = "✅";
  finBtn.addEventListener("click", finishToDo);
  span.innerText = text;
  spanSpace.innerText = "  ";
  list.appendChild(span);
  list.appendChild(spanSpace);
  list.appendChild(delBtn);
  list.appendChild(finBtn);
  list.id = newID;

  console.log(`TYPEING PENDING: text-${text} id-${newID}`);
  pendingDoList.appendChild(list);

  const toDoObj = {
    text: text,
    id: newID,
  };
  pendingDos.push(toDoObj);
  saveToDos(PENDING_LS);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = pendingDoInput.value;
  console.log(`SUBMIT PENDING ${pendingDoInput.value}`);
  paintPendingDo(currentValue);
  pendingDoInput.value = "";
}

function loadToDos() {
  if (PENDING_LS) {
    const loadedPendingDos = localStorage.getItem(PENDING_LS);
    if (loadedPendingDos !== null) {
      const parsedToDos = JSON.parse(loadedPendingDos);
      parsedToDos.forEach(function (toDo) {
        paintPendingDo(toDo.text);
      });
    }
  }
  if (FINISHED_LS) {
    const loadedFinishedDos = localStorage.getItem(FINISHED_LS);
    if (loadedFinishedDos !== null) {
      const parsedToDos = JSON.parse(loadedFinishedDos);
      parsedToDos.forEach(function (toDo) {
        paintFinishedDo(toDo.text);
      });
    }
  }
}

function init() {
  loadToDos();
  dosForm.addEventListener("submit", handleSubmit);
}

init();
