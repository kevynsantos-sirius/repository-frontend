import '../assets/css/login.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="login-bg">{children}</div>
}
