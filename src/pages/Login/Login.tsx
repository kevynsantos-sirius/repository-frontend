import Notiflix from 'notiflix'
import '../../assets/css/login.css'

export default function Login() {
  function submit(e) {
    e.preventDefault()
    Notiflix.Loading.standard('Carregando, aguarde...')

    setTimeout(() => {
      Notiflix.Loading.remove()
      window.location.href = '/home'
    }, 1200)
  }

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary">PADD</h3>
                  <small className="text-muted">Checklist Online</small>
                </div>

                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input className="form-control" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" className="form-control" required />
                  </div>

                  <button className="btn btn-primary w-100">
                    Entrar
                  </button>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-3 small">
              © 2025 ChecklistOnline
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
