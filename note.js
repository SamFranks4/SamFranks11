document.addEventListener("DOMContentLoaded", () => {
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const returnHomeBtn = document.getElementById("returnHomeBtn");

  // Load current note from localStorage
  const currentNote = JSON.parse(localStorage.getItem("currentNote")) || { title: "", content: "" };
  noteTitle.value = currentNote.title;
  noteContent.value = currentNote.content;

  // Auto-save changes
  function saveNote() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const index = notes.findIndex(n => n.title === currentNote.title && n.content === currentNote.content);

    if (index > -1) {
      notes[index] = {
        ...notes[index],
        title: noteTitle.value,
        content: noteContent.value
      };
    } else {
      // If somehow note doesn't exist, add it
      notes.push({ title: noteTitle.value, content: noteContent.value, category: currentNote.category || "Home" });
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  noteTitle.addEventListener("input", saveNote);
  noteContent.addEventListener("input", saveNote);

  // Return to homepage
  returnHomeBtn.addEventListener("click", () => {
    saveNote(); // ensure changes saved
    window.location.href = "index.html";
  });
});
