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

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
  let activeCategory = "Home";

  // === CATEGORY FUNCTIONS ===
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
    categories.forEach(cat => {
      const li = document.createElement("li");
      li.textContent = cat;
      if (cat === activeCategory) li.classList.add("active");

      li.addEventListener("click", () => {
        activeCategory = cat;
        renderCategories();
        renderNotes();
      });

      categoryListUL.appendChild(li);
    });
  }

  addCategoryBtn.addEventListener("click", () => {
    const newCat = prompt("Enter category name:").trim();
    if (newCat && !categories.includes(newCat)) {
      categories.push(newCat);
      localStorage.setItem("categories", JSON.stringify(categories));
      renderCategories();
      updateModalCategories();
    }
  });

  // === NOTES FUNCTIONS ===
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
      tags: noteTags.value.split(",").map(t => t.trim()).filter(Boolean),
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
    const searchTerm = searchBar.value.toLowerCase();
    notesList.innerHTML = "";
    const sortedNotes = [...notes].sort((a,b) => b.pinned - a.pinned); // pinned first
    sortedNotes
      .filter(note =>
        (activeCategory === "Home" || note.category === activeCategory) &&
        (note.title.toLowerCase().includes(searchTerm) ||
         note.content.toLowerCase().includes(searchTerm) ||
         note.tags.join(" ").toLowerCase().includes(searchTerm))
      )
      .forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
          ${note.pinned ? '<div class="pinned">📌 Pinned</div>' : ''}
          <h3>${note.title}</h3>
          <div class="tags">${note.tags.join(", ")}</div>
          <div class="noteContent">${note.content}</div>
          <button class="deleteBtn" data-index="${index}">×</button>
        `;
        notesList.appendChild(div);

        div.querySelector(".deleteBtn").addEventListener("click", e => {
          e.stopPropagation();
          if (confirm("Are you sure you want to delete this note?")) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
          }
        });
      });
  }

  searchBar.addEventListener("input", renderNotes);
  renderCategories();
  updateModalCategories();
  renderNotes();
});
