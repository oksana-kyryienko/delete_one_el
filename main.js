const root = document.querySelector(".main");

const newTodoField = root.querySelector(".new-todo");
const itemsList = root.querySelector(".todo-list");
let list = new Map([]);

let li = document.createElement("li");
let p = document.createElement("p");
p.textContent = "Hello = World";
li.appendChild(p);
itemsList.appendChild(li);

root.querySelector(".delete").addEventListener("click", (event) => {
  const result = confirm("Do you want to clear a field?");
  if (!result) {
    return;
  }

  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  p.style.display = "block";
});

function isValid(str) {
  return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?@]/g.test(str);
}

root.querySelector(".show-xml").addEventListener("click", (event) => {
  const xml = itemsList.innerHTML;
  alert(xml);
});

function createNewItem(item) {
  const newItem = document.createElement("li");
  newItem.classList.add("todo-item");
  const button = document.createElement("button");
  button.classList.add("destroy");
  newItem.textContent = `${item[0]} = ${item[1]}`;
  newItem.appendChild(button);
  itemsList.appendChild(newItem);
}

function clearList() {
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }
}

function displayList() {
  clearList();
  list.forEach((value, key) => {
    createNewItem([key, value]);
  });
}

root.querySelector(".add").addEventListener("click", () => {
  let valueFromInput = newTodoField.value;
  let firstPart = valueFromInput.split("=")[0];
  let secondPart = valueFromInput.split("=")[1];

  if (list.size >= 0) {
    p.style.display = "none";
  }

  if (!newTodoField.value) {
    return;
  }

  if (
    firstPart === "" ||
    secondPart === "" ||
    firstPart === undefined ||
    secondPart === undefined ||
    !isValid(firstPart) ||
    !isValid(secondPart) ||
    !firstPart.trim().length ||
    !secondPart.trim().length
  ) {
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    h3.textContent = "Please, enter a proper value";
    li.appendChild(h3);
    itemsList.appendChild(li);
  } else {
    newTodoField.value = "";
    list.set(firstPart, secondPart);
    createNewItem([firstPart, secondPart]);
  }
});

itemsList.addEventListener("click", (event) => {
  if (!event.target.matches(".destroy")) {
    return;
  }
  const item = event.target.closest(".todo-item");
  const key = item.textContent.split("=")[0].trim();
  list.delete(key);
  item.remove();
});

root.querySelector(".sort-name").addEventListener("click", () => {
  const sortedItems = [...list].sort((a, b) => a[0].localeCompare(b[0]));
  clearList();
  sortedItems.forEach((item) => {
    createNewItem(item);
  });
});

root.querySelector(".sort-value").addEventListener("click", () => {
  const sortedItems = [...list].sort((a, b) => a[1].localeCompare(b[1]));
  clearList();
  sortedItems.forEach((item) => {
    createNewItem(item);
  });
});
