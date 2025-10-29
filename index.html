document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteModal = document.getElementById("noteModal");
  const closeModal = document.querySelector(".close");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const noteTags = document.getElementById("noteTags");
  const notePinned = document.getElementById("notePinned");
  const noteCategorySelect = document.getElementById("noteCategory");
  const searchBar = document.getElementById("searchBar");
  const categoryListUL = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const filterPinned = document.getElementById("filterPinned");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
  let categoryColors = JSON.parse(localStorage.getItem("categoryColors")) || {"Home": "#4F000B"};
  let activeCategory = "Home";

  function updateModalCategories() {
    noteCategorySelect.innerHTML = "";
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      noteCategorySelect.appendChild(opt);
    });
  }

  function renderCategories() {
    categoryListUL.innerHTML = "";
    categories.forEach((cat, idx) => {
      const li = document.createElement("li");
      li.textContent = cat;
      li.style.borderLeft = `5px solid ${categoryColors[cat] || "#720026"}`;
      if (cat === activeCategory) li.classList.add("active");
      li.draggable = true;

      li.addEventListener("click", () => {
        activeCategory = cat;
        renderCategories();
        renderNotes();
      });

      li.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", idx);
      });

      li.addEventListener("dragover", e => e.preventDefault());
      li.addEventListener("drop", e => {
        e.preventDefault();
        const fromIdx = e.dataTransfer.getData("text/plain");
        categories.splice(idx, 0, categories.splice(fromIdx,1)[0]);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
      });

      categoryListUL.appendChild(li);
    });
  }

  addCategoryBtn.addEventListener("click", () => {
    const newCat = prompt("Enter category name:").trim();
    if (newCat && !categories.includes(newCat)) {
      categories.push(newCat);
      categoryColors[newCat] = "#720026";
      localStorage.setItem("categories", JSON.stringify(categories));
      localStorage.setItem("categoryColors", JSON.stringify(categoryColors));
      renderCategories();
      updateModalCategories();
    }
  });

  addNoteBtn.addEventListener("click", () => {
    noteModal.style.display = "flex";
    updateModalCategories();
    noteCategorySelect.value = activeCategory;
    noteTitle.value = "";
    noteContent.innerHTML = "";
    noteTags.value = "";
    notePinned.checked = false;
  });

  closeModal.addEventListener("click", () => {
    noteModal.style.display = "none";
  });

  saveNoteBtn.addEventListener("click", () => {
    const note = {
      title: noteTitle.value.trim(),
      content: noteContent.innerHTML.trim(),
      tags: noteTags.value.split(",").map(t=>t.trim()).filter(Boolean),
      pinned: notePinned.checked,
      category: noteCategorySelect.value
    };
    if (!note.title && !note.content) return;
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    noteModal.style.display = "none";
  });

  function renderNotes() {
    const searchTerm = searchBar.value
