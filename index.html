const addNoteBtn = document.getElementById("addNoteBtn");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const homeBtn = document.getElementById("homeBtn");
const noteModal = document.getElementById("noteModal");
const categoryModal = document.getElementById("categoryModal");
const closeNoteModal = document.querySelector(".close");
const closeCatModal = document.querySelector(".catClose");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const saveCategoryBtn = document.getElementById("saveCategoryBtn");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const noteCategory = document.getElementById("noteCategory");
const notesList = document.getElementById("notesList");
const categoryList = document.getElementById("categoryList");
const newCategoryInput = document.getElementById("newCategoryInput");
const searchBar = document.getElementById("searchBar");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
let currentCategory = "Home";

/* ====== RENDER FUNCTIONS ====== */
function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat;
    if (cat === currentCategory) li.classList.add("active");

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.classList.add("deleteCatBtn");
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete category "${cat}"?`)) {
        categories = categories.filter((c) => c !== cat);
        localStorage.setItem("categories", JSON.stringify(categories));
        if (currentCategory === cat) currentCategory = "Home";
        renderCategories();
        renderNotes();
      }
    };

    li.onclick = () => {
      currentCategory = cat;
      renderCategories();
      renderNotes();
      homeBtn.style.display = cat !== "Home" ? "inline-block" : "none";
    };

    li.appendChild(delBtn);
    categoryList.appendChild(li);
  });
  localStorage.setItem("categories", JSON.stringify(categories));
}

function renderNotes() {
  notesList.innerHTML = "";
  let filtered = notes.filter(
    (n) =>
      (currentCategory === "Home" || n.category === currentCategory) &&
      n.title.toLowerCase().includes(searchBar.value.toLowerCase())
  );

  filtered.forEach((note) => {
    const div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.classList.add("deleteBtn");
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete note "${note.title}"?`)) {
        notes = notes.filter((n) => n !== note);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
      }
    };

    div.appendChild(delBtn);
    notesList.appendChild(div);
  });
}

/* ====== MODALS ====== */
addNoteBtn.onclick = () => {
  noteModal.style.display = "flex";
  noteTitle.value = "";
  noteContent.value = "";
  noteCategory.innerHTML = categories.map(
    (c) => `<option value="${c}">${c}</option>`
  ).join("");
};

addCategoryBtn.onclick = () => {
  categoryModal.style.display = "flex";
  newCategoryInput.value = "";
};

closeNoteModal.onclick = () => (noteModal.style.display = "none");
closeCatModal.onclick = () => (categoryModal.style.display = "none");

window.onclick = (e) => {
  if (e.target === noteModal) noteModal.style.display = "none";
  if (e.target === categoryModal) categoryModal.style.display = "none";
};

saveNoteBtn.onclick = () => {
  const note = {
    title: noteTitle.value.trim(),
    content: noteContent.value.trim(),
    category: noteCategory.value,
  };
  if (!note.title || !note.content) return alert("Please fill out all fields");
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
  noteModal.style.display = "none";
};

saveCategoryBtn.onclick = () => {
  const cat = newCategoryInput.value.trim();
  if (!cat) return alert("Enter a category name");
  if (categories.includes(cat)) return alert("Category already exists");
  categories.push(cat);
  renderCategories();
  categoryModal.style.display = "none";
};

/* ====== SEARCH BAR ====== */
searchBar.oninput = () => renderNotes();

/* ====== HOME BUTTON ====== */
homeBtn.onclick = () => {
  currentCategory = "Home";
  renderCategories();
  renderNotes();
  homeBtn.style.display = "none";
};

/* ====== INIT ====== */
renderCategories();
renderNotes();
