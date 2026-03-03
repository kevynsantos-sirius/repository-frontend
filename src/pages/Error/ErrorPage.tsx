import { useNavigate } from "react-router-dom"

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: 500 }}>
        
        <div className="mb-4">
          <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: "3.5rem" }}></i>
        </div>

        <h2 className="mb-3 text-dark">Erro Inesperado</h2>

        <p className="text-muted">
          Ocorreu um erro inesperado. <br />
          Contate o administrador do sistema e tente novamente.
        </p>

        <div className="d-grid gap-2 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/home")}
          >
            Voltar para Home
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </button>
        </div>

      </div>
    </div>
  )
}