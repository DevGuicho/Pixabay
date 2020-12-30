import React, { Fragment, useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") {
        return;
      }
      const imagenesPorPagina = 50;
      const key = process.env.REACT_APP_API_KEY;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);

      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setTotalPaginas(calcularTotalPaginas);
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [busqueda, paginaActual]);
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  };
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (paginaActual >= totalPaginas) return;
    setPaginaActual(nuevaPaginaActual);
    console.log(nuevaPaginaActual);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className="row justify-content-center">
        {imagenes.length > 0 && (
          <Fragment>
            <ListadoImagenes imagenes={imagenes} />
            <button className="bt btn-info mr-1" onClick={paginaAnterior}>
              &laquo; Anterior
            </button>
            <button className="bt btn-info mr-1" onClick={paginaSiguiente}>
              Siguiente &raquo;
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
