document.addEventListener('DOMContentLoaded', () => {
    const notesTextarea = document.getElementById('notes');
    const saveNotesButton = document.getElementById('save-notes');
    const notesList = document.getElementById('notes-list');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function displayNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';

            const noteText = document.createElement('p');
            noteText.className = 'note-text';
            noteText.innerText = note;

            const noteActions = document.createElement('div');
            noteActions.className = 'note-actions';

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => deleteNote(index));

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', () => editNote(index));

            noteActions.appendChild(editButton);
            noteActions.appendChild(deleteButton);
            noteItem.appendChild(noteText);
            noteItem.appendChild(noteActions);
            notesList.appendChild(noteItem);
        });
    }

    function saveNote() {
        const noteText = notesTextarea.value.trim();
        if (noteText !== '') {
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            notesTextarea.value = '';
            displayNotes();
        }
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }

    function editNote(index) {
        notesTextarea.value = notes[index];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }

    saveNotesButton.addEventListener('click', saveNote);
    displayNotes();
});
