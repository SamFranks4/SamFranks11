const notesList = document.getElementById('notesList');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const closeModal = document.querySelector('.close');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const noteCategory = document.getElementById('noteCategory');
const searchBar = document.getElementById('searchBar');
const categories = document.querySelectorAll('#categories li');

let notes = [];

// Load notes from LocalStorage
const savedNotes = localStorage.getItem('notes');
if (savedNotes) {
  notes = JSON.parse(savedNotes);
  renderNotes();
}

// Open modal
addNoteBtn.addEventListener('click', () => {
  noteModal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
  noteModal.style.display = 'none';
});

// Save note
saveNoteBtn.addEventListener('click', () => {
  const note = {
    title: noteTitle.value,
    content: noteContent.value,
    category: noteCategory.value
  };
  
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  
  renderNotes();
  noteModal.style.display = 'none';
  noteTitle.value = '';
  noteContent.value = '';
});

// Render notes
function renderNotes(filterCategory = 'all') {
  const searchTerm = searchBar.value.toLowerCase();
  notesList.innerHTML = '';
  notes.filter(note => {
    return (filterCategory === 'all' || note.category === filterCategory) &&
           (note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm));
  }).forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button class="deleteBtn" data-index="${index}">×</button>
    `;
    notesList.appendChild(div);

    // Click note to open edit page
    div.addEventListener('click', (e) => {
      if (!e.target.classList.contains('deleteBtn')) {
        localStorage.setItem('currentNote', JSON.stringify(note));
        window.location.href = 'note.html';
      }
    });
  });

  // Delete note
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      notes.splice(idx, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes(document.querySelector('#categories li.active').dataset.category);
    });
  });
}

// Search notes
searchBar.addEventListener('input', () => {
  const activeCategory = document.querySelector('#categories li.active').dataset.category;
  renderNotes(activeCategory);
});

// Filter by category
categories.forEach(cat => {
  cat.addEventListener('click', () => {
    categories.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
    renderNotes(cat.dataset.category);
  });
});
