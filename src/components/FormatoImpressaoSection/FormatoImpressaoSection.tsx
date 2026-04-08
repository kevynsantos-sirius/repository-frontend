import type { Modelo, ArquivoGerenciado } from "../../types/types";

type Props = {
  modelo: Modelo;
  onUpdateModelo(modelo: Modelo): void;
};

export default function FormatoImpressaoSection({ modelo, onUpdateModelo }: Props) {

  function toggleCheckbox(
    campo: "tipoImpressao" | "tipoAcabamento",
    valor: string
  ) {
    const atual = modelo[campo] || [];

    const atualizado = atual.includes(valor)
      ? atual.filter(v => v !== valor)
      : [...atual, valor];

    onUpdateModelo({
      ...modelo,
      [campo]: atualizado
    });
  }

  return (
    <div className="mt-4 mb-4">
      <h6 className="fw-bold">Formatação & Impressão</h6>

      {/* TIPO DE IMPRESSÃO */}
      <span className="label-azul">Tipo de impressão</span>
      <div className="d-flex gap-3 mt-1">
        <div>
          <input
            type="checkbox"
            checked={modelo.tipoImpressao?.includes("duplex")}
            onChange={() => toggleCheckbox("tipoImpressao", "duplex")}
          /> Duplex
        </div>

        <div>
          <input
            type="checkbox"
            checked={modelo.tipoImpressao?.includes("simples")}
            onChange={() => toggleCheckbox("tipoImpressao", "simples")}
          /> Simples
        </div>
      </div>

      {/* TIPO DE ACABAMENTO */}
      <span className="label-azul">Tipo de acabamento</span>
      <div className="d-flex gap-3 mt-1">
        <div>
          <input
            type="checkbox"
            checked={modelo.tipoAcabamento?.includes("autoEnvelope")}
            onChange={() => toggleCheckbox("tipoAcabamento", "autoEnvelope")}
          /> Auto-envelope
        </div>

        <div>
          <input
            type="checkbox"
            checked={modelo.tipoAcabamento?.includes("manuseio")}
            onChange={() => toggleCheckbox("tipoAcabamento", "manuseio")}
          /> Manuseio
        </div>

        <div>
          <input
            type="checkbox"
            checked={modelo.tipoAcabamento?.includes("insercao")}
            onChange={() => toggleCheckbox("tipoAcabamento", "insercao")}
          /> Inserção
        </div>
      </div>

    {/* ARQUIVO DE IMPRESSÃO */}
    <span className="label-azul">Arquivo de impressão (opcional)</span>
    <input
      type="file"
      className="form-control mt-1"
      multiple
      onChange={(e) => {
        const files = Array.from(e.target.files ?? []);

        const novosArquivos: ArquivoGerenciado[] = files.map(file => ({
          id: crypto.randomUUID(),      // ou '' se o backend gerar
          name: file.name,
          nomeArquivo: file.name,
          observacao: '',
          file: file,
          arquivo: null,                // não usamos esse campo no envio
          tipo: 1                       // coloque o valor correto (impressão)
        }));

        onUpdateModelo({
          ...modelo,
          arquivosImpressao: [
            ...(modelo.arquivosImpressao ?? []),
            ...novosArquivos
          ],
        });
      }}
    />

    {modelo.arquivosImpressao?.length > 0 && (
      <ul className="mt-2">
        {modelo.arquivosImpressao.map((arq, index) => (
          <li key={arq.id ?? index}>
            <strong>{arq.name}</strong>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
}