document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteModal = document.getElementById("noteModal");
  const closeModal = document.querySelector(".close");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const noteCategorySelect = document.getElementById("noteCategory");
  const searchBar = document.getElementById("searchBar");
  const categoryListUL = document.getElementById("categoryList");
  const newCategoryInput = document.getElementById("newCategoryInput");
  const addCategoryBtn = document.getElementById("addCategoryBtn");

  // LocalStorage Data
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

      // Delete button
      if (cat !== "Home") {
        const delBtn = document.createElement("button");
        delBtn.textContent = "×";
        delBtn.className = "deleteCatBtn";
        delBtn.addEventListener("click", e => {
          e.stopPropagation();
          if (!confirm("Are you sure you want to delete this category?")) return;

          // Remove category
          categories = categories.filter(c => c !== cat);
          // Move notes in this category to Home
          notes = notes.map(n => n.category === cat ? { ...n, category: "Home" } : n);
          localStorage.setItem("categories", JSON.stringify(categories));
          localStorage.setItem("notes", JSON.stringify(notes));
          if (activeCategory === cat) activeCategory = "Home";

          renderCategories();
          renderNotes();
          updateModalCategories();
        });
        li.appendChild(delBtn);
      }

      li.addEventListener("click", () => {
        activeCategory = cat;
        renderCategories();
        renderNotes();
      });

      categoryListUL.appendChild(li);
    });
  }

  function attachAddCategoryListener() {
    addCategoryBtn.addEventListener("click", e => {
      e.preventDefault();
      const newCat = newCategoryInput.value.trim();
      if (!newCat || categories.includes(newCat)) return;
      categories.push(newCat);
      localStorage.setItem("categories", JSON.stringify(categories));
      newCategoryInput.value = "";
      renderCategories();
      updateModalCategories();
    });
  }

  // === NOTE FUNCTIONS ===
  addNoteBtn.addEventListener("click", () => {
    noteModal.style.display = "flex";
    updateModalCategories();
    noteCategorySelect.value = activeCategory;
  });

  closeModal.addEventListener("click", () => {
    noteModal.style.display = "none";
  });

  saveNoteBtn.addEventListener("click", () => {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    const category = noteCategorySelect.value;

    if (!title && !content) return;

    const existingIndex = notes.findIndex(n => n.id && n.idEditing);
    let note = { title, content, category, id: Date.now() };

    if (existingIndex !== -1) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    noteModal.style.display = "none";
    noteTitle.value = "";
    noteContent.value = "";
  });

  function renderNotes() {
    const searchTerm = searchBar.value.toLowerCase();
    notesList.innerHTML = "";
    notes
      .filter(
        note =>
          (activeCategory === "Home" || note.category === activeCategory) &&
          (note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm))
      )
      .forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <button class="deleteBtn" data-index="${index}">×</button>
        `;
        notesList.appendChild(div);

        // Edit note on click (go to note.html)
        div.addEventListener("click", e => {
          if (!e.target.classList.contains("deleteBtn")) {
            localStorage.setItem("currentNote", JSON.stringify({ ...note, index }));
            window.location.href = "note.html";
          }
        });
      });

    // Delete buttons
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
        if (!confirm("Are you sure you want to delete this note?")) return;
        notes.splice(idx, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
      });
    });
  }

  searchBar.addEventListener("input", renderNotes);
  window.addEventListener("focus", renderNotes);

  renderCategories();
  updateModalCategories();
  renderNotes();
  attachAddCategoryListener();
});
