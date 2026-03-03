import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ExpiredLogin() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.clear()
    sessionStorage.clear()
  }, [])

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: 420 }}>
        
        <div className="mb-3">
          <i className="bi bi-clock-history text-warning" style={{ fontSize: "3rem" }}></i>
        </div>

        <h3 className="mb-3 text-dark">Sessão Expirada</h3>

        <p className="text-muted">
          Sua sessão expirou ou você não está autenticado.
        </p>

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => navigate("/")}
        >
          Ir para Login
        </button>

      </div>
    </div>
  )
}