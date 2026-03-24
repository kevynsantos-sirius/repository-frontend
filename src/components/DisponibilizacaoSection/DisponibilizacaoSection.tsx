import type { Modelo } from "../../types/types";

type Props = {
  modelo: Modelo;
  onUpdateModelo(modelo: Modelo): void;
};

export default function DisponibilizacaoSection({ modelo, onUpdateModelo }: Props) {
  
  function toggleArray(campo: "disponibilizacao" | "emailOpcoes", valor: string) {
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
      <h6 className="fw-bold">Disponibilização</h6>

      {/* DISPONIBILIZAÇÃO */}
      <div className="d-flex flex-column gap-2 mt-2 mb-2">

        <label>
          <input
            type="checkbox"
            checked={modelo.disponibilizacao.includes("correiosSimples")}
            onChange={() => toggleArray("disponibilizacao", "correiosSimples")}
          /> Correios simples
        </label>

        <label>
          <input
            type="checkbox"
            checked={modelo.disponibilizacao.includes("correiosSimplesAR")}
            onChange={() => toggleArray("disponibilizacao", "correiosSimplesAR")}
          /> Correios simples com AR
        </label>

        <label>
          <input
            type="checkbox"
            checked={modelo.disponibilizacao.includes("impressaoSobDemanda")}
            onChange={() => toggleArray("disponibilizacao", "impressaoSobDemanda")}
          /> Impressão sob Demanda (CRC e Operações)
        </label>

        <label>
          <input
            type="checkbox"
            checked={modelo.disponibilizacao.includes("meusDocumentosPdf")}
            onChange={() => toggleArray("disponibilizacao", "meusDocumentosPdf")}
          /> Meus Documentos - PDF
        </label>

        <label>
          <input
            type="checkbox"
            checked={modelo.disponibilizacao.includes("sms")}
            onChange={() => toggleArray("disponibilizacao", "sms")}
          /> SMS
        </label>
      </div>

      {/* SUBSEÇÃO: EMAIL */}
      <span className="label-azul">E-mail</span>

      <div className="d-flex flex-column gap-2 mt-2">

        <label>
          <input
            type="checkbox"
            className="me-1"
            checked={modelo.emailOpcoes.includes("anexo")}
            onChange={() => toggleArray("emailOpcoes", "anexo")}
          />
           E-mail com documento anexo
        </label>

        <label>
          <input
            type="checkbox"
            className="me-1"
            checked={modelo.emailOpcoes.includes("anexoArmazenamento")}
            onChange={() => toggleArray("emailOpcoes", "anexoArmazenamento")}
          />
           E-mail com documento anexo + armazenamento
        </label>

        <label>
          <input
            type="checkbox"
            className="me-1"
            checked={modelo.emailOpcoes.includes("corpoEmail")}
            onChange={() => toggleArray("emailOpcoes", "corpoEmail")}
          />
           E-mail com documento no corpo do e-mail
        </label>

        <label>
          <input
            type="checkbox"
            className="me-1"
            checked={modelo.emailOpcoes.includes("corpoEmailArmazenamento")}
            onChange={() => toggleArray("emailOpcoes", "corpoEmailArmazenamento")}
          />
           E-mail com documento no corpo do e-mail + armazenamento
        </label>

        <label>
          <input
            type="checkbox"
            className="me-1"
            checked={modelo.emailOpcoes.includes("anexoCarimboTempo")}
            onChange={() => toggleArray("emailOpcoes", "anexoCarimboTempo")}
          />
           E-mail com documento anexo + carimbo do tempo (Comprova)
        </label>

      </div>
    </div>
  );
}