import { useNavigate } from "react-router-dom"

export default function NotAccess() {
  const navigate = useNavigate()

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">

        <div className="mb-4">
          <i className="bi bi-shield-lock-fill text-danger" style={{ fontSize: "4rem" }}></i>
        </div>

        <h1 className="display-5 fw-bold text-danger">
          403 - Acesso Negado
        </h1>

        <p className="lead mt-3">
          Você não tem autorização para acessar esta página.
        </p>

        <p className="text-muted">
          Caso acredite que isso seja um erro, entre em contato com o administrador do sistema.
        </p>

        <div className="mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/home")}
          >
            Ir para Home
          </button>
        </div>

      </div>
    </div>
  )
}