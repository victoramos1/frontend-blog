import "./ArtigoAberto.css"
import Navbar from "../components/Navbar"
import logo from "../img/logo.png"
import axios from "axios"
import jwtDecode from "jwt-decode"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

function ArtigoAberto() {

  let { id } = useParams()
  const [artigo, setArtigo] = useState("")
  const [verificador, setVerificador] = useState("false")
  const [token] = useState(localStorage.getItem("isLogged"))

  useEffect(() => {
    fetch(`https://backend-blog-396v.onrender.com/artigos/${id}`)
      .then(resultado => resultado.json())
      .then((dados) => setArtigo(dados))
    window.scrollTo(0, 0)
  }, []);

  function apagaArtigo() {
    let tokenCheck = jwtDecode(token)
    const timeStamp = Math.floor(Date.now() / 1000)

    if (tokenCheck && tokenCheck.exp > timeStamp) {
      axios.delete(`https://backend-blog-396v.onrender.com/apagar/${id}`)
        .then(resposta => {
          console.log(`Artigo ${id} deletado com sucesso`)
          toast.success("Artigo excluído com sucesso")
          setTimeout(() => {
            window.location.href = `https://victoramos1.github.io/frontend-blog/`
          }, 2000)
        }
      )
    }
  }

  useEffect(() => {
    decodificaToken()
  }, [])

  function decodificaToken() {
    try {
      if (token !== "false") {
        let tokenCheck = jwtDecode(token)
        const timeStamp = Math.floor(Date.now() / 1000)
        if (tokenCheck && tokenCheck.exp > timeStamp) {
          setVerificador("true")
        }
      }
    } catch (error) {
      setVerificador("false")
      console.log("Erro:", error)
    }
  }

  if (verificador === "false") {
    return (
      <div>
        <Navbar tipo="azulMarinho" />
        <div className="divWallpaper2">
          <img id="wpArtigo" src={artigo.imagem} alt="Capa do artigo"></img>
        </div>
        <div className="divBotoes">
          <Link to={"/"}><button className="btnOpcoes">Voltar</button></Link>
        </div>
        <div className="artigo">
          <h1>{artigo.titulo}</h1>
          <h3>{artigo.subtitulo}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{artigo.texto}</p>
        </div>
        <div className="divSobre">
          <div>
            <img src={logo} alt="Logo em maior escala" />
          </div>
          <div>
            <p>
              O objetivo deste projeto é a demonstração do backend.<br />
              Feito com Node.js e Express, possui um sistema de login conectado ao MySQL e interligado pelo Sequelize, além de autenticação com token JWT.
              As rotas e operações administrativas do site também são autenticadas com token JWT. As sessões são armazenadas com Session. Os artigos estão salvos no MySQL e podem ser buscados, editados, apagados e novos adicionados, tudo interligado com o Sequelize.
            </p>
          </div>
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
  } else {
    return (
      <div>
        <Navbar tipo="azulMarinho" />
        <div className="divWallpaper2">
          <img id="wpArtigo" src={artigo.imagem} alt="Capa do artigo"></img>
        </div>
        <div className="divBotoes">
          <Link to={"/"}><button className="btnOpcoes">Voltar</button></Link>
          <Link to={`/editar/${artigo.id}`}><button className="btnOpcoes">Editar postagem</button></Link>
          <button className="btnOpcoes" onClick={apagaArtigo}>Excluir postagem</button>
        </div>
        <div className="artigo">
          <h1>{artigo.titulo}</h1>
          <h3>{artigo.subtitulo}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{artigo.texto}</p>
        </div>
        <div className="divSobre">
          <div>
            <img src={logo} alt="Logo em maior escala" />
          </div>
          <div>
            <p>
              O objetivo deste projeto é a demonstração do backend.<br />
              Feito com Node.js e Express, possui um sistema de login conectado ao MySQL e interligado pelo Sequelize, além de autenticação com token JWT.
              As rotas e operações administrativas do site também são autenticadas com token JWT. As sessões são armazenadas com Session. Os artigos estão salvos no MySQL e podem ser buscados, editados, apagados e novos adicionados, tudo interligado com o Sequelize.
            </p>
          </div>
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

export default ArtigoAberto