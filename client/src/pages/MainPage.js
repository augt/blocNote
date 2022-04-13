import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "../components/Header";
import Note from "../components/Note";
require("dayjs/locale/fr");

function NoteList() {
  //create publication
  const uuid = localStorage.getItem("uuid");
  const token =  localStorage.getItem("token");
  const [text, setText] = useState("");

  const [noteList, setNoteList] = useState([]);

  const addNote = () => {
    
      Axios({
        method: "post",
        url: "http://localhost:3001/api/notes",
        data: { uuid: uuid, text: text },
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setNoteList([
            {
              id: res.data.id,
              uuid: uuid,
              text: text,
              createdAt: res.data.createdAt,
              updatedAt: res.data.updatedAt,
            },
            ...noteList,
          ]);
        })
        .catch((res) => {
          console.log(res);
        });
  };

  // fetch notes
  useEffect(() => {
    const getNotes = () => {
      Axios({
        method: "get",
        url: "http://localhost:3001/api/notes",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          setNoteList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getNotes();
  }, [token]);

  //update note list after deleting a note

   function updateAfterDeleteNote(newNoteList) {
    setNoteList(newNoteList);
  }

  return (
    <div>
      <Header />
      <main>
        <h2>Accueil</h2>
        <div className="note__form">
          <h3>Créez une note</h3>
          <label htmlFor="noteText">Contenu de la note</label>
          <textarea
            name="noteText"
            rows="6"
            id="publicationText"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
          <button onClick={addNote}>Enregistrer</button>
        </div>
        {/* display all notes */}
        <h3>Vos dernières notes</h3>

        <div className="publication__list">
          {noteList.map((note) => {
            return (
              <Note
                note={note}
                key={note.id}
                noteList={noteList}
                updateAfterDelete={updateAfterDeleteNote}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default NoteList;
