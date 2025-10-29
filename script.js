document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteModal = document.getElementById("noteModal");
  const closeModal = document.querySelector(".close");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const noteCategorySelect = document.getElementById("noteCategory");
  const notePinnedCheckbox = document.getElementById("notePinned");
  const searchBar = document.getElementById("searchBar");
  const categoryListUL = document.getElementById("categoryList");
  const addCategoryBtn = document.getElementById("addCategoryBtn");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
  let activeCategory = "Home";

  // ===== CATEGORY FUNCTIONS =====
  function renderCategories() {
    categoryListUL.innerHTML = "";
    categories.forEach(cat => {
      const li = document.createElement("li");
      li.textContent = cat;
      if (cat === activeCategory) li.classList.add("active");

      if (cat !== "Home") {
        const delBtn = document.createElement("button");
        delBtn.textContent = "×";
        delBtn.className = "deleteCatBtn";
        delBtn.addEventListener("click", e => {
          e.stopPropagation();
          if (!confirm(`Delete category "${cat}"?`)) return;
          categories = categories.filter(c => c !== cat);
          notes = notes.map(n => n.category === cat ? {...n, category:"Home"} : n);
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

  function updateModalCategories() {
    noteCategorySelect.innerHTML = "";
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      noteCategorySelect.appendChild(opt);
    });
  }

  addCategoryBtn.addEventListener("click", () => {
    const newCat = prompt("Enter new category:");
    if (!newCat || categories.includes(newCat)) return;
    categories.push(newCat);
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
    updateModalCategories();
  });

  // ===== NOTES FUNCTIONS =====
  addNoteBtn.addEventListener("click", () => {
    noteModal.style.display = "flex";
    updateModalCategories();
    noteCategorySelect.value = activeCategory;
    notePinnedCheckbox.checked = false;
  });

  closeModal.addEventListener("click", () => {
    noteModal.style.display = "none";
  });

  saveNoteBtn.addEventListener("click", () => {
    const note = {
      title: noteTitle.value.trim(),
      content: noteContent.value.trim(),
      category: noteCategorySelect.value,
      pinned: notePinnedCheckbox.checked
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

    // Sort pinned notes first
    const sortedNotes = notes
      .filter(n => activeCategory === "Home" || n.category === activeCategory)
      .filter(n => n.title.toLowerCase().includes(searchTerm) || n.content.toLowerCase().includes(searchTerm))
      .sort((a,b) => b.pinned - a.pinned);

    sortedNotes.forEach((note, index) => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `
        ${note.pinned ? '<span class="pinIcon">📌</span>' : ''}
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button class="deleteBtn" data-index="${index}">×</button>
      `;
      notesList.appendChild(div);

      div.querySelector(".deleteBtn").addEventListener("click", e => {
        e.stopPropagation();
        if (!confirm(`Delete note "${note.title}"?`)) return;
        notes.splice(index, 1);
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
});
