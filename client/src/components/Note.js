import React, { useState } from "react";
import Axios from "axios";
import dayjs from "dayjs";
require("dayjs/locale/fr");

function Note(props) {
  const token = localStorage.getItem("token");
  const uuid = localStorage.getItem("uuid");
  const [show, setShow] = useState(false);
  const { id } = props.note;
  const [text, setText] = useState(props.note.text);

  const { createdAt } = props.note;
  const convertedCreatedAt = dayjs(`${createdAt}`)
    .locale("fr")
    .format("DD MMMM YYYY à HH:mm");

  const [{ updatedAt }, setUpdatedAt] = useState(props.note);
  const [convertedUpdatedAt, setConvertedUpdatedAt] = useState(
    dayjs(`${props.note.updatedAt}`).locale("fr").format("DD MMMM YYYY à HH:mm")
  );

  const { noteList } = props;

  //modify note
  const [newText, setNewText] = useState(text);

  const modifyNote = () => {
    Axios({
      method: "put",
      url: `http://localhost:3001/api/notes/${id}`,
      data: { uuid: uuid, text: newText },
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        setText(res.data.text);
        setUpdatedAt(res.data.updatedAt);
        setConvertedUpdatedAt(
          dayjs(`${res.data.updatedAt}`)
            .locale("fr")
            .format("DD MMMM YYYY à HH:mm")
        );
        setShow(!show);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const deleteNote = () => {
    const noteIndex = noteList.findIndex((note) => note.id === id);

    if (window.confirm("Confirmez-vous la suppression de cet élément ?")) {
      Axios({
        method: "delete",
        url: `http://localhost:3001/api/notes/${id}`,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          noteList.splice(noteIndex, 1);
          const newNoteList = [...noteList];
          props.updateAfterDelete(newNoteList);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="note">
      <div>
        <p className="text">{text}</p>
        <p className="date">Publiée : {convertedCreatedAt}</p>
        {createdAt !== updatedAt && (
          <p className="date">Modifiée : {convertedUpdatedAt}</p>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          Modifier
        </button>

        <button
          onClick={() => {
            deleteNote();
          }}
        >
          Supprimer
        </button>

        {show && (
          <div>
            <label htmlFor="newNoteText">Nouveau texte</label>
            <div className="textarea__container">
              <textarea
                name="newNoteText"
                rows="6"
                id="newNoteText"
                className="widen__textarea"
                defaultValue={text}
                onChange={(event) => {
                  setNewText(event.target.value);
                }}
              ></textarea>
            </div>
            <br />
            <button
              onClick={() => {
                modifyNote();
              }}
            >
              Appliquer les changements
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;
