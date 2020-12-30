import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({ setBusqueda }) => {
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();

    if (termino === "") {
      setError(true);
      return;
    }
    setError(false);
    setBusqueda(termino);
  };
  return (
    <form className="row" onSubmit={buscarImagenes}>
      <div className="form-group col-md-8">
        <input
          className="form-control form-control-lg"
          type="text"
          name=""
          id=""
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Busca una imagen, ejemplo: fultbol o cafe"
        />
      </div>
      <div className="form-group col-md-8">
        <input
          className="btn btn-lg btn-danger btn-block"
          type="submit"
          value="buscar"
        />
      </div>
      {error && <Error mensaje="Agrega un termino de busqueda" />}
    </form>
  );
};
export default Formulario;
