const ul = document.querySelector("ul");
const addBtn = document.getElementById("add-btn");

const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const colorInput = document.getElementById("color-input");

const listSize = 20;

const nameRegExp = /^[A-Za-z]{1,20}$/;
const ageRegExp = /\d+/;
const emailRegExp = /^\w+((\.)?\w+)*@\w+(\.)(\w+)+$/;
const phoneRegExp = /^([+]*38)?(0\d{9})$/;

let nameIsValid, ageIsValid, emailIsValid, phoneIsValid;

let guestsList = localStorage.getItem("guestsList")
  ? JSON.parse(localStorage.getItem("guestsList"))
  : [];

for (let i = 0; i < guestsList.length; i++) {
  addLi(guestsList[i].name, guestsList[i].id, guestsList[i].color);
}

function ifValid(isValid, element) {
  if (isValid) {
    element.className = "content__input valid";
    return 1;
  } else {
    element.className = "content__input invalid";
    return 0;
  }
}

function regExpValidation(regExp, element) {
  return regExp.test(element.value);
}

function valueValidation(min, max, element) {
  return element.value >= min && element.value <= max;
}

function lengthValidation(min, max, element) {
  return element.value.length >= min && element.value.length <= max;
}

nameInput.addEventListener("input", function () {
  let regExp = regExpValidation(nameRegExp, nameInput);
  let length = lengthValidation(1, 20, nameInput);
  nameIsValid = ifValid(regExp && length, nameInput);
});

ageInput.addEventListener("input", function () {
  let regExp = regExpValidation(ageRegExp, ageInput);
  let val = valueValidation(1, 100, ageInput);
  let length = lengthValidation(1, 3, ageInput);
  ageIsValid = ifValid(regExp && val && length, ageInput);
});

emailInput.addEventListener("input", () => {
  let regExp = regExpValidation(emailRegExp, emailInput);
  let length = lengthValidation(1, 30, emailInput);
  emailIsValid = ifValid(regExp && length, emailInput);
});

phoneInput.addEventListener("input", () => {
  let regExp = regExpValidation(phoneRegExp, phoneInput);
  let length = lengthValidation(10, 13, phoneInput);
  phoneIsValid = ifValid(regExp && length, phoneInput);
});

addBtn.addEventListener("click", () => {
  if (nameIsValid && ageIsValid && emailIsValid && phoneIsValid) {
    let guest = guestsList.some((element) => {
      return element.name.toLowerCase() === nameInput.value.toLowerCase();
    });
    if (!guest) {
      if (guestsList.length < listSize) addGuest();
      else alert("The list can contain less than " + listSize + " guests");
    } else alert("A guest with this name has already been added");
  } else {
    if (!nameIsValid) {
      alert(
        'Check the "name" field. It should contain only letters and have size between 1 and 20 symbols'
      );
    } else if (!ageIsValid) {
      alert(
        'Check the "age" field. It should contain only numbers and be between 1 and 100'
      );
    } else if (!emailIsValid) {
      alert(
        'Check the "email" field. It can contain letters, numbers or dots. It must have only one @.' +
          "It should have size between 1 and 30 symbols"
      );
    } else if (!phoneIsValid) {
      alert(
        'Check the "phone" field. It should contain only numbers or a plus sign at the beginning. ' +
          'Use template to enter right phone number. You can skip "+38"'
      );
    }
  }
});

function liClicked(e) {
  let name, guest;
  let text = e.target.innerHTML;

  if (text.includes("<strong>"))
    name = text.substring(text.indexOf(">") + 1, text.lastIndexOf("</strong>"));
  else name = text;

  if (!/^\d+$/.test(text)) {
    guest = guestsList.find((element) => {
      return element.name.toLowerCase() === name.toLowerCase();
    });
  } else {
    guest = guestsList.find((element) => {
      return element.id === name - 1;
    });
  }

  if (guest !== undefined) {
    document.getElementById("name-output").innerText = guest.name;
    document.getElementById("age-output").innerText = guest.age;
    document.getElementById("email-output").innerText = guest.email;
    document.getElementById("phone-output").innerText = guest.phone;
  }
}

function addLi(name, id, color) {
  const li = document.createElement("li");
  const strong = document.createElement("strong");
  const sup = document.createElement("sup");

  sup.textContent = id + 1;
  sup.className = "content__item__index";
  strong.textContent = name;
  li.className = "content__item";
  li.style.backgroundColor = color;
  li.onclick = liClicked;

  li.appendChild(strong);
  li.appendChild(sup);
  ul.appendChild(li);
}

function addGuest() {
  let ID;
  if (guestsList.length === 0) ID = 0;
  else ID = guestsList[guestsList.length - 1].id + 1;

  let guest = {
    id: ID,
    name: nameInput.value,
    age: ageInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    color: colorInput.value,
  };

  guestsList.push(guest);
  localStorage.setItem("guestsList", JSON.stringify(guestsList));
  addLi(guest.name, guest.id, guest.color);

  nameInput.className = "content__input";
  ageInput.className = "content__input";
  emailInput.className = "content__input";
  phoneInput.className = "content__input";

  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  colorInput.value = "#fff480";
}

function deleteGuest() {
  if (guestsList.length !== 0) {
    guestsList.shift();
    localStorage.setItem("guestsList", JSON.stringify(guestsList));
    ul.removeChild(ul.firstElementChild);
  } else {
    alert("The list is empty!");
  }
}
