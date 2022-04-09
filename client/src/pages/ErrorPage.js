import React from "react";
import Header from "../components/Header";

function ErrorPage() {

  return (
    <div>
      <Header />
      <main>
        <h2>Erreur</h2>
        <p>Cette page n'existe pas ou vous n'êtes pas autorisé à y accéder.</p>
        <p>Vous devez être connecté pour accéder au contenu du site.</p>
      </main>
    </div>
  );
}

export default ErrorPage;
