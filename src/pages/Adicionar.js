import "./Adicionar.css"
import axios from "axios"
import React from "react"
import jwtDecode from "jwt-decode"
import Navbar from "../components/Navbar"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Adicionar() {

  const [titulo, setTitulo] = useState("")
  const [subtitulo, setSubtitulo] = useState("")
  const [imagem, setImagem] = useState("")
  const [texto, setTexto] = useState("")
  const [categoria, setCategoria] = useState("")
  const [token] = useState(localStorage.getItem("isLogged"))
  const [validador, setValidador] = useState("false")

  const dados = {
    titulo: titulo,
    subtitulo: subtitulo,
    imagem: imagem,
    texto: texto,
    categoria: categoria
  }

  function enviaDados() {
    let tokenCheck = jwtDecode(token)
    const timeStamp = Math.floor(Date.now() / 1000)

    if (tokenCheck && tokenCheck.exp > timeStamp) {
      axios.post("https://backend-blog-396v.onrender.com/incluir", dados)
        .then(resposta => {
          toast.success("Artigo incluído com sucesso")
          setTimeout(() => {
            window.location.href = `/`
          }, 2000)
        }
      )
    }
  }

  useEffect(() => {
    if (token !== "false") {
      validaAcesso()
    } else {
      window.location.href = "/"
    }
  }, [])

  function validaAcesso() {
    let tokenCheck = jwtDecode(token)
    const timeStamp = Math.floor(Date.now() / 1000)

    if (tokenCheck && tokenCheck.exp > timeStamp) {
      setValidador("true")
    }
  }

  if (validador === "true") {
    return (
      <div>
        <Navbar tipo="azulMarinho" />
        <Link to={"/"}><button className="btnOpcoes3">Voltar</button></Link>
        <div className="container">
          <h3>Adicionar novo artigo</h3>
          <label htmlFor="titulo">Título</label>
          <input type="text" name="titulo" placeholder="Digite o título do artigo" onChange={(e) => setTitulo(e.target.value)}></input>
          <label htmlFor="subtiulo">Subtítulo</label>
          <input type="text" name="subtitulo" placeholder="Digite o subtítulo do artigo" onChange={(e) => setSubtitulo(e.target.value)}></input>
          <label htmlFor="imagem web">Imagem web</label>
          <input type="text" name="imagem" placeholder="Cole um link para uma imagem web de no mínimo 1440x600 para o artigo" onChange={(e) => setImagem(e.target.value)}></input>
          <label htmlFor="texto">Texto</label>
          <textarea rows="10" name="texto" placeholder="Digite o texto do seu artigo" onChange={(e) => setTexto(e.target.value)}></textarea>
          <label htmlFor="categoria">Categoria</label>
          <input type="text" name="categoria" placeholder="Digite a categoria" onChange={(e) => setCategoria(e.target.value)}></input>
          <button onClick={enviaDados} className="btn2">Enviar</button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    )
  }
}

export default Adicionar