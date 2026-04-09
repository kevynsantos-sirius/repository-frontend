// components/ListaArquivos/ListaArquivos.tsx
import type { ArquivoGerenciado } from "../../types/types";
type Props = {
  titulo: string;
  arquivos: ArquivoGerenciado[];
};

export default function ListaArquivos({ titulo, arquivos }: Props) {
  const ativos = arquivos.filter(a => !a.excluido);

  if (ativos.length === 0) return null;

  return (
    <div className="mb-4">
      <h6 className="fw-bold">{titulo}</h6>

      <ul className="list-group">
        {ativos.map((a) => (
          <li key={a.id} className="list-group-item d-flex justify-content-between">
            <span>{a.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}