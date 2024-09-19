const noteInput = document.getElementById('note-input');
const saveButton = document.getElementById('save-note');
const noteList = document.getElementById('note-list');

let notes = [];

function saveNote() {
    const noteText = noteInput.value.trim();  

    if (noteText !== '') {
        notes.push({ text: noteText, id: Date.now() });
        noteInput.value = ''; 
    }

    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}

function displayNotes() {
    noteList.innerHTML = '';    

    notes.forEach((note) => {
        const noteListItem = document.createElement('li');
        
        const noteText = document.createElement('span');
        noteText.textContent = note.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'ButtonDel'; 
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => deleteNote(note.id));
        
        noteListItem.appendChild(noteText);
        noteListItem.appendChild(deleteButton);
        
        noteList.appendChild(noteListItem);
    });
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

document.addEventListener('DOMContentLoaded', () => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        displayNotes();
    }
});

saveButton.addEventListener('click', saveNote);
