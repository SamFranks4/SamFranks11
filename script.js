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
          categories = categories.filter(c => c !== cat);
          notes = notes.map(n =>
            n.category === cat ? { ...n, category: "Home" } : n
          );
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

  // Make sure the add category button always works
  function attachAddCategoryListener() {
    if (!addCategoryBtn) return;
    addCategoryBtn.addEventListener("click", e => {
      e.preventDefault();
      const newCat = newCategoryInput.value.trim();
      if (newCat && !categories.includes(newCat)) {
        categories.push(newCat);
        localStorage.setItem("categories", JSON.stringify(categories));
        newCategoryInput.value = "";
        renderCategories();
        updateModalCategories();
      }
    });
  }

  // === NOTES FUNCTIONS ===
  addNoteBtn.addEventListener("click", () => {
    noteModal.style.display = "flex";
    updateModalCategories();
    noteCategorySelect.value = activeCategory;
  });

  closeModal.addEventListener("click", () => {
    noteModal.style.display = "none";
  });

  saveNoteBtn.addEventListener("click", () => {
    const note = {
      title: noteTitle.value.trim(),
      content: noteContent.value.trim(),
      category: noteCategorySelect.value
    };
    if (!note.title && !note.content) return;
    notes.push(note);
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
          (note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm))
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

        div.addEventListener("click", e => {
          if (!e.target.classList.contains("deleteBtn")) {
            localStorage.setItem("currentNote", JSON.stringify(note));
            window.location.href = "note.html";
          }
        });
      });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
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
