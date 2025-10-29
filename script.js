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
  }).forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    notesList.appendChild(div);
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
