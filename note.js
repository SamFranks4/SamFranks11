document.addEventListener("DOMContentLoaded", () => {
  const noteTitleInput = document.getElementById("noteTitleEditable");
  const noteContentDiv = document.getElementById("noteContentEditable");
  const saveBtn = document.getElementById("saveBtn");
  const backBtn = document.getElementById("backBtn");

  let currentNote = JSON.parse(localStorage.getItem("currentNote")) || null;
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (!currentNote) {
    alert("No note selected!");
    window.location.href = "index.html";
    return;
  }

  noteTitleInput.value = currentNote.title;
  noteContentDiv.textContent = currentNote.content;

  saveBtn.addEventListener("click", () => {
    currentNote.title = noteTitleInput.value.trim();
    currentNote.content = noteContentDiv.textContent.trim();

    // Update the note in the notes array
    const index = notes.findIndex(
      n => n.title === currentNote.title && n.category === currentNote.category
    );

    if (index !== -1) {
      notes[index] = currentNote;
    } else {
      notes.push(currentNote); // fallback
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note saved!");
  });

  backBtn.addEventListener("click", () => {
    localStorage.removeItem("currentNote");
    window.location.href = "index.html";
  });
});
