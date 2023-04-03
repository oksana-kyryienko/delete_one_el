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
    const newItem = document.createElement("li");
    newItem.classList.add("todo-item");
    const button = document.createElement("button");
    button.classList.add("destroy");
    newItem.textContent = `${firstPart} = ${secondPart}`;
    newItem.appendChild(button);

    itemsList.appendChild(newItem);
  }

  list.set(firstPart, secondPart);
});

itemsList.addEventListener("click", (event) => {
  if (!event.target.matches(".destroy")) {
    return;
  }

  event.target.closest(".todo-item").remove();
});