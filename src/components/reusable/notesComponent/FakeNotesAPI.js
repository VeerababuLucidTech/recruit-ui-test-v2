// fakeNotesAPI.js

const fakeNotesAPI = {
  notes: [],

  getAllNotes() {
    return this.notes;
  },

  addNote(newNote) {
    const updatedNote = {
      ...newNote,
      id: this.notes.length + 1,
    };

    this.notes.push(updatedNote);
  },
};

export default fakeNotesAPI;
