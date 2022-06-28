import React, { useState, useEffect } from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation, updateNote as updateNoteMutiation} from './graphql/mutations';
import { onCreateNote, onDeleteNote,onUpdateNote } from './graphql/subscriptions';
import { API, Storage } from 'aws-amplify';
import Menu from './component/menu.js';
import { Button} from '@mui/material';
import Header from './component/header.js';
const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
    API.graphql({ query: onCreateNote}).subscribe({
      next: data => {
        fetchNotes();
      }
    });
    API.graphql({ query: onDeleteNote}).subscribe({
      next: data => {
        fetchNotes();
      }
    })
    API.graphql({ query: onUpdateNote}).subscribe({
      next: data => {
        fetchNotes();
      }
    })
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
  }

  async function deleteNote({ id }) {
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }})
  }
  async function updateNote(formData) {
    formData.description += 1;
    await API.graphql({ query: updateNoteMutiation, variables: { input: {
      id: formData.id,
      description: formData.description
    } }})
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
        <Header title="Administrator Page Menu List"></Header>
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Note name"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Note description"
          value={formData.description}
        />
        <input type="file" onChange={onChange}/>
        <button onClick={createNote}>Create Note</button>
        <p></p>
        <br></br>
        <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <Menu mName={note.name} cnt={note.description}></Menu>
              <Button onClick={() => deleteNote(note)} variant="contained" style={{display:'inline'}}>Delete note</Button>
              <Button onClick={() => updateNote(note)} variant="contained" style={{display:'inline'}}>Update note</Button>
              {
                note.image && <img src={note.image} style={{width: 400, float:'right'}} />
              }
            </div>
          ))
        }
        </div>
      </div>
      )}
    </Authenticator>
  );
}

export default App;