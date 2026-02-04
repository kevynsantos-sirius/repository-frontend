export default function Home() {
  return (
    <div className="container mt-4">
      <h2>Bem-vindo ao Checklist Online</h2>

      <ul className="list-group mt-4">
        <li className="list-group-item">
          <a href="/identificacao">Identificação</a>
        </li>
        <li className="list-group-item">
          <a href="/ti">TI</a>
        </li>
        <li className="list-group-item">
          <a href="/checklists">Checklists</a>
        </li>
        <li className="list-group-item">
          <a href="/modelo">Modelo</a>
        </li>
      </ul>
    </div>
  )
}
