import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Editar from "./pages/Editar"
import Login from "./pages/Login"
import Adicionar from "./pages/Adicionar"
import ArtigoAberto from "./pages/ArtigoAberto"
import ResultadoCategorias from "./pages/ResultadoCategorias"
import ArtigosPorCategoria from "./pages/ArtigosPorCategoria"
import { createHashRouter, RouterProvider } from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/:id",
    element: <ArtigoAberto />
  },
  {
    path: "/editar/:id",
    element: <Editar />
  },
  {
    path: "/adicionar",
    element: <Adicionar />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/categorias",
    element: <ResultadoCategorias />
  },
  {
    path: "/categorias/:pais",
    element: <ArtigosPorCategoria />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

