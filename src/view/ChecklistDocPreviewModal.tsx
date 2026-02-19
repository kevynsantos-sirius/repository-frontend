import { useEffect, useRef, useState } from "react"
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
} from "docx"
import { saveAs } from "file-saver"
import { renderAsync } from "docx-preview"
import type { ChecklistVersaoDTO } from "../dto/ChecklistVersaoDTO"

type Props = {
  aberto: boolean
  onClose: () => void
  data: ChecklistVersaoDTO
}

export default function ChecklistDocPreviewModal({
  aberto,
  onClose,
  data,
}: Props) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [blob, setBlob] = useState<Blob | null>(null)

  useEffect(() => {
    if (!aberto || !data) return

    async function gerarDoc() {
      const doc = new Document({
        sections: [
          {
            children: [

              /* =========================
                 IDENTIFICAÇÃO
                 ========================= */

              new Paragraph({
                text: "Identificação do Documento",
                heading: HeadingLevel.HEADING_1,
              }),

              new Paragraph(`Nome: ${data.nomeDocumento}`),
              new Paragraph(`Ramo: ${data.nomeRamo ?? "-"}`),
              new Paragraph(`Centro de custo: ${data.centroCusto}`),
              new Paragraph(`Status: ${data.status}`),
              new Paragraph(`Responsável: ${data.usuario?.nomeUsuario}`),
              new Paragraph(`Demanda: ${data.idDemanda}`),

              new Paragraph(" "),

              /* =========================
                 DESTINOS
                 ========================= */

              new Paragraph({
                text: "Destinos",
                heading: HeadingLevel.HEADING_2,
              }),

              new Paragraph(`Icatu: ${data.icatu ? "Sim" : "Não"}`),
              new Paragraph(`Caixa: ${data.caixa ? "Sim" : "Não"}`),
              new Paragraph(`Rio Grande: ${data.rioGrande ? "Sim" : "Não"}`),

              new Paragraph(" "),

              /* =========================
                 FORMA DE ENVIO
                 ========================= */

              new Paragraph({
                text: "Forma de Envio",
                heading: HeadingLevel.HEADING_2,
              }),

              new Paragraph(`Via Serviço: ${data.viaServico ? "Sim" : "Não"}`),
              new Paragraph(`Via TXT: ${data.viaTxt ? "Sim" : "Não"}`),

              new Paragraph(" "),

              /* =========================
                 LAYOUTS E MASSAS
                 ========================= */

              new Paragraph({
                text: "Layouts e Massas",
                heading: HeadingLevel.HEADING_1,
              }),

              ...data.layouts.flatMap((layout) => [
                new Paragraph({
                  text: `Layout: ${layout.nomeLayout}`,
                  heading: HeadingLevel.HEADING_2,
                }),

                new Paragraph(
                  `Possui arquivo: ${layout.temArquivo ? "Sim" : "Não"}`
                ),

                new Paragraph(
                  `Observação: ${layout.observacao ?? "-"}`
                ),

                ...layout.massasDados.flatMap((massa) => [
                  new Paragraph({
                    text: `Massa: ${massa.nomeMassaDados}`,
                    heading: HeadingLevel.HEADING_3,
                  }),

                  new Paragraph(
                    `Possui arquivo: ${massa.temArquivo ? "Sim" : "Não"}`
                  ),

                  new Paragraph(
                    `Observação: ${massa.observacao ?? "-"}`
                  ),
                ]),

                new Paragraph(" "),
              ]),
            ],
          },
        ],
      })

      const blobGerado = await Packer.toBlob(doc)
      setBlob(blobGerado)

      if (previewRef.current) {
        previewRef.current.innerHTML = ""
        await renderAsync(blobGerado, previewRef.current)
      }
    }

    gerarDoc()
  }, [aberto, data])

  function baixar() {
    if (blob) saveAs(blob, `${data.nomeDocumento}.docx`)
  }

  if (!aberto) return null

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Pré-visualização do Documento</h2>

        <div
          ref={previewRef}
          style={{
            height: "60vh",
            overflow: "auto",
            border: "1px solid #ddd",
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={baixar}>Baixar DOCX</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

/* =========================
   ESTILOS SIMPLES
   ========================= */

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
}

const modal = {
  background: "white",
  padding: 20,
  width: "80%",
  borderRadius: 8,
}
