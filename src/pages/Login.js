import "./Login.css"
import Navbar from "../components/Navbar"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function Login() {
  const usuario = useRef("")
  const senha = useRef("")
  const [token, setToken] = useState()

  async function enviaDados() {
    const dados = {
      usuario: usuario.current.value,
      senha: senha.current.value
    }
    await axios.post("https://backend-blog-396v.onrender.com/authLogin", dados)
      .then(resposta => {
        setToken(resposta.data)
      })
      .catch(erro => {
        toast.error("Usuário e/ou senha incorretos")
        localStorage.setItem("isLogged", false)
      })
  }

  useEffect(() => {
    if (token) {
      validacaoLogin()
    }
  }, [token])

  function validacaoLogin() {
    const tokenCheck = jwtDecode(token)
    const timeStamp = Math.floor(Date.now() / 1000)

    if (tokenCheck && tokenCheck.exp > timeStamp) {
      toast.success("Login realizado com sucesso")
      localStorage.setItem("isLogged", token)
      window.alert("Caso deseje editar ou apagar algum artigo, peço por gentileza que cadastre um artigo próprio e faça as alterações necessárias sem alterar os artigos pertencentes do blog.")
      setTimeout(() => {
        window.location.href = "https://victoramos1.github.io/frontend-blog/"
      }, 2000)
    }
  }

  return (
    <div>
      <Navbar tipo="azulMarinho" />
      <div className="container2">
        <h3>Login</h3>
        <label htmlFor="usuario">Usuário</label>
        <input type="text" name="usuario" placeholder="Digite admin" ref={usuario} />
        <label htmlFor="senha">Senha</label>
        <input type="password" name="senha" placeholder="Digite admin" ref={senha} />
        <button className="btn" onClick={enviaDados}>Entrar</button>
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

export default Login
