import { useEffect, useRef, useState } from "react"
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TextRun,
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

      /* =========================
         CONFIG FIXA DEFINITIVA
         ========================= */

      const TABLE_WIDTH = 10000
      const COL_LABEL = 4000
      const COL_VALUE = 6000

      const labelCell = (text: string) =>
        new TableCell({
          width: { size: COL_LABEL, type: WidthType.DXA },
          margins: { top: 200, bottom: 200, left: 250, right: 250 },
          shading: { fill: "F2F2F2" },
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: true })],
            }),
          ],
        })

      const valueCell = (text?: string) =>
        new TableCell({
          width: { size: COL_VALUE, type: WidthType.DXA },
          margins: { top: 200, bottom: 200, left: 250, right: 250 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: text || "-",
                }),
              ],
            }),
          ],
        })

      const row = (label: string, value?: string) =>
        new TableRow({
          children: [labelCell(label), valueCell(value)],
        })

      const sectionTitle = (text: string) =>
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
              size: 32,
            }),
          ],
          spacing: { before: 600, after: 300 },
        })

      const createTable = (rows: TableRow[]) =>
        new Table({
          width: { size: TABLE_WIDTH, type: WidthType.DXA },
          layout: "fixed",
          columnWidths: [COL_LABEL, COL_VALUE], // 🔥 ESSA LINHA RESOLVE O GOOGLE DOCS
          rows,
        })

      /* =========================
         IDENTIFICAÇÃO
         ========================= */

      const identificacaoTable = createTable([
        row("Nome do documento", data.nomeDocumento),
        row("Ramo", data.nomeRamo ?? "-"),
        row("Centro de custo", data.centroCusto),
        row("Status", data.status === 1 ? "Ativo" : "Inativo"),
        row("Responsável", data.usuario?.nomeUsuario),
        row("Demanda", data.idDemanda),
      ])

      /* =========================
         DESTINOS
         ========================= */

      const destinosTable = createTable([
        row("Icatu", data.icatu ? "Sim" : "Não"),
        row("Caixa", data.caixa ? "Sim" : "Não"),
        row("Rio Grande", data.rioGrande ? "Sim" : "Não"),
      ])

      /* =========================
         FORMA DE ENVIO
         ========================= */

      const envioTable = createTable([
        row("Via Serviço", data.viaServico ? "Sim" : "Não"),
        row("Via TXT", data.viaTxt ? "Sim" : "Não"),
      ])

      /* =========================
         LAYOUTS E MASSAS
         ========================= */

      const layoutsTables = data.layouts.flatMap((layout) => {

        const massaRows = layout.massasDados.flatMap((massa) => [
          row("Massa", massa.nomeMassaDados),
          row("Observação da massa", massa.observacao ?? "-"),
        ])

        return [
          sectionTitle(`Layout: ${layout.nomeLayout}`),

          createTable([
            row("Observação do layout", layout.observacao ?? "-"),
            ...massaRows,
          ]),
        ]
      })

      /* =========================
         DOCUMENTO FINAL
         ========================= */

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              sectionTitle("Identificação do Documento"),
              identificacaoTable,

              sectionTitle("Destinos"),
              destinosTable,

              sectionTitle("Forma de Envio"),
              envioTable,

              sectionTitle("Layouts e Massas"),
              ...layoutsTables,
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
          <button className="btn btn-outline-primary" onClick={baixar}>
            Baixar DOCX
          </button>

          <button className="btn btn-outline-primary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

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