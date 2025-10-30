// Load saved data
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
let activeCategory = "Home";
let deleteTarget = null;
let deleteType = null;

const categoryList = document.getElementById("category-list");
const notesContainer = document.getElementById("notes-container");
const addNoteBtn = document.getElementById("add-note-btn");
const addCategoryBtn = document.getElementById("add-category-btn");

const noteModal = document.getElementById("note-modal");
const noteTitleInput = document.getElementById("note-title-input");
const noteContentInput = document.getElementById("note-content-input");
const saveNoteBtn = document.getElementById("save-note-btn");
const cancelNoteBtn = document.getElementById("cancel-note-btn");

const confirmModal = document.getElementById("confirm-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

const categoryTitle = document.getElementById("current-category-title");

let editingNoteId = null;

// Render categories
function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    if (cat === activeCategory) li.classList.add("active");
    li.addEventListener("click", () => {
      activeCategory = cat;
      categoryTitle.textContent = cat;
      renderCategories();
      renderNotes();
    });

    if (cat !== "Home") {
      const delBtn = document.createElement("button");
      delBtn.textContent = "×";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", e => {
        e.stopPropagation();
        deleteTarget = cat;
        deleteType = "category";
        confirmModal.style.display = "flex";
      });
      li.appendChild(delBtn);
    }
    categoryList.appendChild(li);
  });
}

// Render notes
function renderNotes() {
  notesContainer.innerHTML = "";
  const filtered = notes.filter(n => n.category === activeCategory || activeCategory === "Home");
  filtered.forEach(note => {
    const div = document.createElement("div");
    div.classList.add("note-card");
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content.substring(0, 100)}</p>`;
    div.addEventListener("click", () => openNoteEditor(note.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", e => {
      e.stopPropagation();
      deleteTarget = note.id;
      deleteType = "note";
      confirmModal.style.display = "flex";
    });

    div.appendChild(delBtn);
    notesContainer.appendChild(div);
  });
}

// Open modal for new or edit
function openNoteEditor(id = null) {
  noteModal.style.display = "flex";
  if (id) {
    const note = notes.find(n => n.id === id);
    noteTitleInput.value = note.title;
    noteContentInput.value = note.content;
    editingNoteId = id;
  } else {
    noteTitleInput.value = "";
    noteContentInput.value = "";
    editingNoteId = null;
  }
}

// Save note
saveNoteBtn.addEventListener("click", () => {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  if (!title && !content) return;

  if (editingNoteId) {
    const note = notes.find(n => n.id === editingNoteId);
    note.title = title;
    note.content = content;
  } else {
    notes.push({
      id: Date.now(),
      title,
      content,
      category: activeCategory
    });
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
  noteModal.style.display = "none";
});

// Cancel modal
cancelNoteBtn.addEventListener("click", () => (noteModal.style.display = "none"));

// Add category
addCategoryBtn.addEventListener("click", () => {
  const name = prompt("Enter new category name:");
  if (name && !categories.includes(name)) {
    categories.push(name);
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
  }
});

// Delete confirm modal actions
confirmDeleteBtn.addEventListener("click", () => {
  if (deleteType === "note") {
    notes = notes.filter(n => n.id !== deleteTarget);
    localStorage.setItem("notes", JSON.stringify(notes));
  } else if (deleteType === "category") {
    categories = categories.filter(c => c !== deleteTarget);
    notes = notes.filter(n => n.category !== deleteTarget);
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("notes", JSON.stringify(notes));
    if (activeCategory === deleteTarget) activeCategory = "Home";
  }
  renderCategories();
  renderNotes();
  confirmModal.style.display = "none";
});

cancelDeleteBtn.addEventListener("click", () => (confirmModal.style.display = "none"));

// Add note button
addNoteBtn.addEventListener("click", () => openNoteEditor());

// Initial render
renderCategories();
renderNotes();
