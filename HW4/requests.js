import { CustomError } from "./customError.js";
import { Photo } from "./photo.js";
import { Post } from "./post.js";
import { Todo } from "./todo.js";

const table = document.getElementById("table");
const getAllBtn = document.getElementById("get-all-btn");
const getOneBtn = document.getElementById("get-one-btn");
const addOneBtn = document.getElementById("add-one-btn");
const deleteOneBtn = document.getElementById("delete-one-btn");

const instructionTitle = document.getElementById("content__instruction");
const idField = document.getElementById("note-id-label");
const titleField = document.getElementById("note-title-label");
const albumIdField = document.getElementById("note-albumId-label");
const urlField = document.getElementById("note-url-label");
const thumbnailField = document.getElementById("note-thumbnailUrl-label");
const userIdField = document.getElementById("note-userId-label");
const bodyField = document.getElementById("note-body-label");
const completeField = document.getElementById("note-complete-label");

const photoTitles = ["id", "title", "albumId", "url", "thumbnailUrl"];
const postTitles = ["id", "title", "userId", "body"];
const todoTitles = ["id", "title", "userId", "completed"];

const mainUrl = "https://jsonplaceholder.typicode.com";

let notes = [];

function createTable(colTitles, infoArray) {
  table.innerHTML = "";

  const tr1 = document.createElement("tr");
  colTitles.forEach((title) => {
    const th = document.createElement("th");
    th.innerText = title;
    tr1.appendChild(th);
  });
  table.appendChild(tr1);

  infoArray.forEach((info) => {
    const tr2 = document.createElement("tr");
    colTitles.forEach((title) => {
      const td = document.createElement("td");
      td.innerText = info[title];
      tr2.appendChild(td);
    });
    table.appendChild(tr2);
  });
}

async function getAllData(url) {
  try {
    const response = await fetch(mainUrl + url);
    if (!response.ok) {
      throw new CustomError(response.status, response.statusText);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    throw new CustomError(500, err.message || "Something went wrong.");
  }
}

async function getOneData(url, id) {
  try {
    const response = await fetch(mainUrl + url + id);
    if (!response.ok) {
      throw new CustomError(response.status, response.statusText);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    throw new CustomError(500, err.message || "Something went wrong.");
  }
}

async function addOneData(url, data) {
  try {
    const response = await fetch(mainUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new CustomError(response.status, response.statusText);
    }
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    throw new CustomError(500, err.message || "Something went wrong.");
  }
}

async function deleteOneData(url, id) {
  try {
    const response = await fetch(mainUrl + url + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new CustomError(response.status, response.statusText);
    }
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    throw new CustomError(500, err.message || "Something went wrong.");
  }
}

function displayElements(elements, displayMode) {
  elements.forEach((e) => (e.style.display = displayMode));
}

function hideAllElements(clearElements) {
  let elements = [
    instructionTitle,
    idField,
    titleField,
    albumIdField,
    urlField,
    thumbnailField,
    userIdField,
    bodyField,
    completeField,
  ];
  displayElements(elements, "none");
  if (clearElements)
    for (let i = 1; i < elements.length; i++)
      elements[i].lastElementChild.value = "";
}

getAllBtn.addEventListener("click", () => {
  hideAllElements(false);
  let noteType = document.getElementById("note-type").value;
  switch (noteType) {
    case "1":
      getAllData("/photos")
        .then((json) => {
          notes = json.map((element) => Photo.createPhoto(element));
          createTable(photoTitles, notes);
        })
        .catch((e) => alert(e));
      break;
    case "2":
      getAllData("/posts")
        .then((json) => {
          notes = json.map((element) => Post.createPost(element));
          createTable(postTitles, notes);
        })
        .catch((e) => alert(e));
      break;
    case "3":
      getAllData("/todos")
        .then((json) => {
          notes = json.map((element) => Todo.createTodo(element));
          createTable(todoTitles, notes);
        })
        .catch((e) => alert(e));
      break;
  }
});

getOneBtn.addEventListener("click", () => {
  hideAllElements(false);
  let elements = [idField, instructionTitle];
  displayElements(elements, "grid");
});

getOneBtn.addEventListener("dblclick", () => {
  let noteType = document.getElementById("note-type").value;
  notes = [];
  switch (noteType) {
    case "1":
      getOneData("/photos/", idField.lastElementChild.value)
        .then((json) => {
          notes.push(Photo.createPhoto(json));
          createTable(photoTitles, notes);
        })
        .catch((e) => alert(e));
      break;
    case "2":
      getOneData("/posts/", idField.lastElementChild.value)
        .then((json) => {
          notes.push(Post.createPost(json));
          createTable(postTitles, notes);
        })
        .catch((e) => alert(e));
      break;
    case "3":
      getOneData("/todos/", idField.lastElementChild.value)
        .then((json) => {
          notes.push(Todo.createTodo(json));
          createTable(todoTitles, notes);
        })
        .catch((e) => alert(e));
      break;
  }
  hideAllElements(true);
});

addOneBtn.addEventListener("click", () => {
  hideAllElements(false);
  let noteType = document.getElementById("note-type").value;
  let elements;
  switch (noteType) {
    case "1":
      elements = [titleField, albumIdField, urlField, thumbnailField];
      break;
    case "2":
      elements = [titleField, userIdField, bodyField];
      break;
    case "3":
      elements = [titleField, userIdField, completeField];
      break;
  }
  displayElements(elements, "grid");
});

addOneBtn.addEventListener("dblclick", () => {
  let noteType = document.getElementById("note-type").value;
  let note, url;
  switch (noteType) {
    case "1":
      note = new Photo(
        "0",
        titleField.lastElementChild.value,
        albumIdField.lastElementChild.value,
        urlField.lastElementChild.value,
        thumbnailField.lastElementChild.value
      );
      url = "/photos";
      addOneData(url, note)
        .then((e) =>
          alert(
            "Data was added successfully:\n\tid: " +
              e.id +
              "\n\ttitle: " +
              e.title +
              "\n\talbumId: " +
              e.albumId +
              "\n\turl: " +
              e.url +
              "\n\tthumbnailUrl: " +
              e.thumbnailUrl
          )
        )
        .catch((e) => alert(e));
      break;
    case "2":
      note = new Post(
        "0",
        titleField.lastElementChild.value,
        userIdField.lastElementChild.value,
        bodyField.lastElementChild.value
      );
      url = "/posts";
      addOneData(url, note)
        .then((e) =>
          alert(
            "Data was added successfully:\n\tid: " +
              e.id +
              "\n\ttitle: " +
              e.title +
              "\n\tuserId: " +
              e.userId +
              "\n\tbody: " +
              e.body
          )
        )
        .catch((e) => alert(e));
      break;
    case "3":
      note = new Todo(
        "0",
        titleField.lastElementChild.value,
        userIdField.lastElementChild.value,
        completeField.lastElementChild.value
      );
      url = "/todos";
      addOneData(url, note)
        .then((e) =>
          alert(
            "Data was added successfully:\n\tid: " +
              e.id +
              "\n\ttitle: " +
              e.title +
              "\n\tuserId: " +
              e.userId +
              "\n\tcomplete: " +
              e.completed
          )
        )
        .catch((e) => alert(e));
      break;
  }
  hideAllElements(true);
});

deleteOneBtn.addEventListener("click", () => {
  hideAllElements(false);
  let elements = [idField, instructionTitle];
  displayElements(elements, "grid");
});

deleteOneBtn.addEventListener("dblclick", () => {
  let noteType = document.getElementById("note-type").value;
  notes = [];
  switch (noteType) {
    case "1":
      deleteOneData("/photos/", idField.lastElementChild.value)
        .then(() => alert("Data was successfully deleted"))
        .catch((e) => alert(e));
      break;
    case "2":
      deleteOneData("/posts/", idField.lastElementChild.value)
        .then(() => alert("Data was successfully deleted"))
        .catch((e) => alert(e));
      break;
    case "3":
      deleteOneData("/todos/", idField.lastElementChild.value)
        .then(() => alert("Data was successfully deleted"))
        .catch((e) => alert(e));
      break;
  }
  hideAllElements(true);
});
