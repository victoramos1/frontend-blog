
import "./ResultadoCategorias.css"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import React, { useState, useEffect } from "react"

function ResultadoCategorias() {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("https://backend-blog-396v.onrender.com/categorias")
      .then(resultado => resultado.json())
      .then((dados) => setCategorias(dados))
    window.scrollTo(0, 0)
  }, []);

  return (
    <div>
      <Navbar tipo="azulMarinho" />
      <div className="containerCategorias">
        <h2>Categorias</h2>
        {categorias.map((categoria, indice) => (
          <div key={indice}>
            <Link to={`/categorias/${categoria}`} className="linkCategorias"><h3 >{categoria}</h3></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultadoCategorias;
