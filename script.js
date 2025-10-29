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
  const addCategoryBtn = document.getElementById("addCategoryBtn");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
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

  function renderNotes() {
    const searchTerm = searchBar.value.toLowerCase();
    notesList.innerHTML = "";
    notes
      .filter(note => activeCategory === "Home" || note.category === activeCategory)
      .filter(note => note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm))
      .forEach(note => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
        notesList.appendChild(div);

        div.addEventListener("click", () => {
          localStorage.setItem("currentNoteId", note.id);
          window.location.href = "note.html";
        });
      });
  }

  addNoteBtn.addEventListener("click", () => {
    noteModal.style.display = "flex";
    updateModalCategories();
    noteCategorySelect.value = activeCategory;
  });

  closeModal.addEventListener("click", () => noteModal.style.display = "none");

  saveNoteBtn.addEventListener("click", () => {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    const category = noteCategorySelect.value;

    if (!title && !content) return;

    const newNote = { id: Date.now(), title, content, category };
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    noteModal.style.display = "none";
    noteTitle.value = "";
    noteContent.value = "";
  });

  searchBar.addEventListener("input", renderNotes);

  addCategoryBtn.addEventListener("click", () => {
    const newCat = prompt("Enter new category:");
    if (newCat && !categories.includes(newCat)) {
      categories.push(newCat);
      localStorage.setItem("categories", JSON.stringify(categories));
      renderCategories();
    }
  });

  renderCategories();
  updateModalCategories();
  renderNotes();
});
