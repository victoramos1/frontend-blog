import "./Navbar.css"
import jwtDecode from "jwt-decode"
import logo from "../img/logo.png"
import menu from "../img/menu.png"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Navbar(props) {

  const [verificador, setVerificador] = useState("false")
  const [barraAtiva, setBarraAtiva] = useState(false)
  const [token] = useState(localStorage.getItem("isLogged"))

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
    }
  }

  function logout() {
    localStorage.setItem("isLogged", "false")
    toast.success("Logout realizado com sucesso")
    setTimeout(() => {
      window.location.href = "https://victoramos1.github.io/frontend-blog/"
      setVerificador("false")
    }, 2000)
  }

  function mostrarEsconder() {
    setBarraAtiva(!barraAtiva)
  }

  function atualizarBarraAtiva() {
    if (window.innerWidth > 710) {
      setBarraAtiva(false)
    }
  }

  useEffect(() => {

    window.addEventListener('resize', atualizarBarraAtiva)

    return () => {
      window.removeEventListener('resize', atualizarBarraAtiva)
    }
  }, [])

  if (verificador === "false") {
    return (
      <div>
        <div className={props.tipo === "transparente" ? "transparente" : "azulMarinho"}>
          <div>
            <Link to={"/"}><img id="logo" src={logo} alt="logo do site"></img></Link>
          </div>
          <div>
            <ul>
              <Link to={"/"} className="link"><li>Início</li></Link>
              <Link to={"/categorias"} className="link"><li>Categorias</li></Link>
              <Link to={"/login"} className="link"><li id="btn">Login</li></Link>
            </ul>
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
        {/*Menu Hambúrguer*/}
        <div className='divPrincipal'>
          <div>
            <button onClick={mostrarEsconder}><img id="menu" src={menu} alt='imagem do menu hambúrguer' /></button>
          </div>
        </div>
        <div onClick={() => setBarraAtiva(!barraAtiva)} className={barraAtiva === false ? 'semFundo' : 'fundoEscuro'}>
          <div onClick={(e) => e.stopPropagation()} className={barraAtiva === false ? 'semBarra' : 'barraLateral'}>
            <div className='div_esquerda'>
              <ul>
                <Link to={"/"} className="link"><li>Início</li></Link>
                <Link to={"/categorias"} className="link"><li>Categorias</li></Link>
              </ul>
            </div>
            <div>
              <div className='div_direita'>
                <Link to={"/login"} className="link"><button className='btn_login'>Login</button></Link>
              </div>
            </div>
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
        <div className={props.tipo === "transparente" ? "transparente" : "azulMarinho"}>
          <div>
            <Link to={"/"}><img id="logo" src={logo} alt="logo do site"></img></Link>
          </div>
          <div>
            <ul>
              <Link to={"/"} className="link"><li>Início</li></Link>
              <Link to={"/categorias"} className="link"><li>Categorias</li></Link>
              <Link to={"/adicionar"} className="link"><li id="btn">Adicionar artigo</li></Link>
              <li onClick={logout} id="btn">Logout</li>
            </ul>
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
        {/*Menu Hambúrguer*/}
        <div className='divPrincipal'>
          <div>
            <button onClick={mostrarEsconder}><img id="menu" src={menu} alt='imagem do menu hambúrguer' /></button>
          </div>
        </div>
        <div onClick={() => setBarraAtiva(!barraAtiva)} className={barraAtiva === false ? 'semFundo' : 'fundoEscuro'}>
          <div onClick={(e) => e.stopPropagation()} className={barraAtiva === false ? 'semBarra' : 'barraLateral'}>
            <div className='div_esquerda'>
              <ul>
                <Link to={"/"} className="link"><li>Início</li></Link>
                <Link to={"/categorias"} className="link"><li>Categorias</li></Link>
              </ul>
            </div>
            <div>
              <div className='div_direita'>
                <Link to={"/adicionar"} className="link"><button className='btn_login'>Adic. artigo</button></Link>
                <button onClick={logout} className='btn_login'>Logout</button>
              </div>
            </div>
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

export default Navbar
