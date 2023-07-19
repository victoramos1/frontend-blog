import "./Editar.css"
import Navbar from "../components/Navbar"
import axios from "axios"
import jwtDecode from "jwt-decode"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Editar() {

  let { id } = useParams();
  const [artigo, setArtigo] = useState({})
  const [titulo, setTitulo] = useState("")
  const [subtitulo, setSubtitulo] = useState("")
  const [imagem, setImagem] = useState("")
  const [texto, setTexto] = useState("")
  const [categoria, setCategoria] = useState("")
  const [token] = useState(localStorage.getItem("isLogged"))
  const [validador, setValidador] = useState("false")

  useEffect(() => {
    fetch(`https://backend-blog-396v.onrender.com/artigos/${id}`)
      .then(resultado => resultado.json())
      .then(dados => {
        setArtigo(dados)
        setTitulo(dados.titulo)
        setSubtitulo(dados.subtitulo)
        setImagem(dados.imagem)
        setTexto(dados.texto)
        setCategoria(dados.categoria)
      })
    window.scrollTo(0, 0);
  }, []);

  const dados = {
    id: id,
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
      axios.put(`https://backend-blog-396v.onrender.com/editado/${id}`, dados)
        .then(resposta => {
          console.log("Dados enviados com sucesso")
          toast.success("Artigo editado com sucesso")
          setTimeout(() => {
            window.location.href = `https://victoramos1.github.io/frontend-blog/#/${id}`
          }, 2000)
        }
      )
    }
  }

  useEffect(() => {
    if (token !== "false") {
      validaAcesso()
    } else {
      window.location.href = "https://victoramos1.github.io/frontend-blog/"
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
        <Link to={`/${id}`}><button className="btnOpcoes2">Voltar</button></Link>
        <div className="container3">
          <h3>Editar artigo</h3>
          <label htmlFor="titulo">Título</label>
          <input type="text" name="titulo" placeholder="Altere o título do artigo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <label htmlFor="subtitulo">Subtítulo</label>
          <input type="text" name="subtitulo" placeholder="Altere o subtítulo do artigo" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} />
          <label htmlFor="imagem">Imagem web</label>
          <input type="text" name="imagem" placeholder="Altere a imagem web para o artigo" value={imagem} onChange={(e) => setImagem(e.target.value)} />
          <label htmlFor="texto">Texto</label>
          <textarea rows="10" name="texto" placeholder="Altere o texto do seu artigo" value={texto} onChange={(e) => setTexto(e.target.value)}></textarea>
          <label htmlFor="categoria">Categoria</label>
          <input type="text" name="categoria" placeholder="Altere a categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          <button onClick={enviaDados} className="btn3">Alterar</button>
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

export default Editar
