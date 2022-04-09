import React from "react";
import { useState } from "react";
import Axios from "axios";

import Header from "../components/Header";

function SignUp() {
  //create user profile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const addUser = () => {
    Axios.post("http://localhost:3001/api/auth/signup", {
      email: email,
      password: password,
    })
      .then((res) => {
        setApiMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setApiMessage(err.response.data.message);
        }
        if (err.response.data.error.errors[0].message) {
          setApiMessage(err.response.data.error.errors[0].message);
        }
      });
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Inscription</h2>
        <div className="connect__form">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={addUser}>Créer l'utilisateur</button>
          <div>{apiMessage}</div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
