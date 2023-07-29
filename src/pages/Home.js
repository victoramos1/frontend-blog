import "./Home.css"
import wp from "../img/wp.jpg"
import logo from "../img/logo.png"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Home() {

  const [artigos, setArtigos] = useState([])
  
  useEffect(()=>{
    let mensagemMostrada = localStorage.getItem("mensagem")

    if (!mensagemMostrada) {
      window.alert("Os artigos na homepage e as categorias podem demorar a carregar nesse primeiro instante, pois o backend está hospedado em um serviço grátis que fica hibernando quando não usado. Em no máximo 2 minutos, tudo estará carregado e você verá tudo sem precisar aguardar após esse primeiro carregamento. Se as informações não aparecerem automaticamente após 2 minutos, saia e entre na aplicação novamente")

      localStorage.setItem("mensagem", true)
    }

    const limpaLocalStorage = () => {
      localStorage.removeItem("mensagem")
    }
  
    window.addEventListener("beforeunload", limpaLocalStorage)
  
    return () => {
      window.removeEventListener("beforeunload", limpaLocalStorage)
    }
  })

  useEffect(() => {
    fetch("https://backend-blog-396v.onrender.com/artigos")
      .then(resultado => resultado.json())
      .then((dados) => setArtigos(dados))
    window.scrollTo(0, 0)
  }, []);

  return (
    <div>
      <Navbar tipo="transparente" />
      <div className="divWallpaper">
        <img id="wp" src={wp} alt="resort em Mykonos" />
        <h2>Seja bem-vindo(a) ao blog</h2>
      </div>
      <div className="divArtigos" id="divArtigos">
        <h3 id="h3">Artigos do momento</h3>
        <div className="layoutCards">
          {artigos.map((artigo, index) => (
            <div className="card" key={index}>
              <div className="divVisivel">
                <img src={artigo.imagem} alt="Imagem de turismo para a galeria" />
                <div className="divOculta">
                  <h3>{artigo.titulo}</h3>
                  <Link to={`/${artigo.id}`}><button className="btnHome">Veja mais</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
}

export default Home;
