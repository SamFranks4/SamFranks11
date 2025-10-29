document.addEventListener("DOMContentLoaded", () => {
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const noteCategory = document.getElementById("noteCategory");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const returnHomeBtn = document.getElementById("returnHomeBtn");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || ["Home"];
  const currentNoteId = parseInt(localStorage.getItem("currentNoteId"));

  // Load categories
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    noteCategory.appendChild(opt);
  });

  // Load current note
  let currentNote = notes.find(n => n.id === currentNoteId);
  if (currentNote) {
    noteTitle.value = currentNote.title;
    noteContent.value = currentNote.content;
    noteCategory.value = currentNote.category;
  }

  saveNoteBtn.addEventListener("click", () => {
    if (!currentNote) return;
    currentNote.title = noteTitle.value.trim();
    currentNote.content = noteContent.value.trim();
    currentNote.category = noteCategory.value;
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note saved!");
  });

  returnHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
