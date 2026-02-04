// pages/Login/Login.tsx
import AuthLayout from '../../layouts/AuthLayout'

export default function Login() {
  return (
    <AuthLayout>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary">PADD</h3>
                  <small className="text-muted">Checklist Online</small>
                </div>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" className="form-control" />
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
    </AuthLayout>
  )
}
