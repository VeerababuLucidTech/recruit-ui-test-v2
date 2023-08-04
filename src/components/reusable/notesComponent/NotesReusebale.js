import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import fakeEmployeeData from './FakeEmployeeData';
import fakeNotesAPI from './FakeNotesAPI';

const NotesReusebale = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({ content: '' });

  useEffect(() => {
    // Fetch initial notes from the API or any other data source
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    // Simulating API call to fetch initial notes
    setTimeout(() => {
      const initialNotes = fakeNotesAPI.getAllNotes();
      setNotes(initialNotes);
    }, 500); // Simulate delay of 500ms
  };

  const addNote = () => {
    setShowForm(true);
  };

  const cancelAddNote = () => {
    setShowForm(false);
    setNewNote({ content: '' });
  };

  const submitNote = () => {
    const newNoteData = {
      ...newNote,
      time: new Date().toLocaleTimeString(),
      image: fakeEmployeeData.image,
      name: fakeEmployeeData.name,
    };

    fakeNotesAPI.addNote(newNoteData);
    const updatedNotes = fakeNotesAPI.getAllNotes();
    setNotes(updatedNotes);

    setShowForm(false);
    setNewNote({ content: '' });
  };

  const handleInputChange = (e) => {
    setNewNote({ ...newNote, content: e.target.value });
  };

  return (
    <>
      <div className='p-2'>
        {!showForm && <Button label="Add Note" onClick={addNote} className='company-primary-btn mb-4' />}
        {showForm && (
          <div className="note-form">
            <div className=''>
              <label>Note :</label>
              <InputText value={newNote.content} onChange={handleInputChange} placeholder='Give Notes Here ....' className='l-width-100' />
            </div>
            <div className="form-buttons mb-3 mt-3 text-end">
              <Button label="Cancel" className="company-secondary-btn" onClick={cancelAddNote} />
              <Button label="Submit" className='company-primary-btn' onClick={submitNote} />
            </div>
          </div>
        )}
        {notes.map((note) => (
          // <Card key={note.id} title={note.name} subTitle={note.time} className='mb-2 mt-2'>
          <div className="note-content mb-4">
            <div className='d-flex'>
              <div className=''>
                <img src={note.image} alt="Image" className="note-image custom-notes-img" />
              </div>
              <div className=''>
                <h6 className='me-2'>{note.name} <span className='ms-3'>{note.time}</span></h6>
                <div className=" note-text">{note.content}</div>
              </div>
            </div>
          </div>
          // </Card>
        ))}
      </div>
    </>
  );
};

export default NotesReusebale;
