// src/Bluemoon.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Bluemoon.css'

export default function Bluemoon() {
  const navigate = useNavigate()

  return (
    <div className="bluemoon-main">
      <div className="bluemoon-container">
        <h1>
          BIENVENIDOS
          <br />
          A
          <br />
          BLUEMOON
        </h1>
        <p className="bluemoon-desc">La mejor manera de organizar tus ideas</p>
        <button
          className="bluemoon-btn"
          onClick={() => navigate('/login')}
        >
          EMPEZAR
        </button>
        <p className="bluemoon-copy">© 2024 Bluemoon. Todos los derechos reservados.</p>
      </div>
    </div>
  )
}
