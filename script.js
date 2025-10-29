document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notesList");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const noteModal = document.getElementById("noteModal");
  const closeModal = document.querySelector(".close");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const noteCategorySelect = document.getElementById("noteCategory");
  const searchBar = document.getElementById("searchBar");
  const categoryListUL = document.getElementById("categoryList");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
  let activeCategory = "Home";

  const saveNotes = () => localStorage.setItem("notes", JSON.stringify(notes));
  const saveCategories = () => localStorage.setItem("categories", JSON.stringify(categories));

  // Update modal category options
  function updateModalCategories() {
    noteCategorySelect.innerHTML = "";
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat; opt.textContent = cat;
      noteCategorySelect.appendChild(opt);
    });
  }

  // Render categories
  function renderCategories() {
    categoryListUL.innerHTML = "";
    categories.forEach(cat => {
      const li = document.createElement("li");
      li.textContent = cat;
      if (cat === activeCategory) li.classList.add("active");

      if (cat !== "Home") {
        const delBtn = document.createElement("button");
        delBtn.textContent = "×"; delBtn.className = "deleteCatBtn";
        delBtn.addEventListener("click", e => {
          e.stopPropagation();
          categories = categories.filter(c => c !== cat);
          notes = notes.map(n => n.category === cat ? {...n, category: "Home"} : n);
          saveCategories(); saveNotes();
          if (activeCategory === cat) activeCategory = "Home";
          renderCategories(); renderNotes(); updateModalCategories();
        });
        li.appendChild(delBtn);
      }

      li.addEventListener("click", () => { activeCategory = cat; renderCategories(); renderNotes(); });
      categoryListUL.appendChild(li);
    });
  }

  // Add Category Button
  addCategoryBtn.addEventListener("click", () => {
    const newCat = prompt("Enter new category name:");
    if (newCat && !categories.includes(newCat)) {
      categories.push(newCat);
      saveCategories();
      renderCategories(); updateModalCategories();
    }
  });

  // Add Note Button
  addNoteBtn.addEventListener("click", () => {
    noteModal.style.display = "flex";
    updateModalCategories();
    noteCategorySelect.value = activeCategory;
  });

  closeModal.addEventListener("click", () => { noteModal.style.display = "none"; });

  saveNoteBtn.addEventListener("click", () => {
    const note = { title: noteTitle.value.trim(), content: noteContent.value.trim(), category: noteCategorySelect.value };
    if (!note.title && !note.content) return;
    notes.push(note); saveNotes();
    renderNotes(); noteModal.style.display = "none";
    noteTitle.value = ""; noteContent.value = "";
  });

  // Render Notes
  function renderNotes() {
    const searchTerm = searchBar.value.toLowerCase();
    notesList.innerHTML = "";
    notes.filter(n =>
      (activeCategory === "Home" || n.category === activeCategory) &&
      (n.title.toLowerCase().includes(searchTerm) || n.content.toLowerCase().includes(searchTerm))
    ).forEach((note, index) => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p><button class="deleteBtn" data-index="${index}">×</button>`;
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
        notes.splice(idx, 1); saveNotes(); renderNotes();
      });
    });
  }

  searchBar.addEventListener("input", renderNotes);
  renderCategories(); updateModalCategories(); renderNotes();
});
