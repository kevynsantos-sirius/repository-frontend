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
         HELPERS
         ========================= */

      const labelCell = (text: string) =>
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          shading: { fill: "F2F2F2" },
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: true })],
            }),
          ],
        })

      const valueCell = (text?: string) =>
        new TableCell({
          width: { size: 70, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              children: [new TextRun(text || "-")],
            }),
          ],
        })

      const sectionTitle = (text: string) =>
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
              size: 28,
            }),
          ],
          spacing: { before: 400, after: 200 },
        })

      /* =========================
         IDENTIFICAÇÃO
         ========================= */

      const identificacaoTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({ children: [labelCell("Nome do documento"), valueCell(data.nomeDocumento)] }),
          new TableRow({ children: [labelCell("Ramo"), valueCell(data.nomeRamo ?? "-")] }),
          new TableRow({ children: [labelCell("Centro de custo"), valueCell(data.centroCusto)] }),
          new TableRow({ children: [labelCell("Status"), valueCell(data.status === 1 ? "Ativo" : "Inativo")] }),
          new TableRow({ children: [labelCell("Responsável"), valueCell(data.usuario?.nomeUsuario)] }),
          new TableRow({ children: [labelCell("Demanda"), valueCell(data.idDemanda)] }),
        ],
      })

      /* =========================
         DESTINOS
         ========================= */

      const destinosTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              labelCell("Icatu"),
              valueCell(data.icatu ? "Sim" : "Não"),
              labelCell("Caixa"),
              valueCell(data.caixa ? "Sim" : "Não"),
              labelCell("Rio Grande"),
              valueCell(data.rioGrande ? "Sim" : "Não"),
            ],
          }),
        ],
      })

      /* =========================
         FORMA DE ENVIO
         ========================= */

      const envioTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              labelCell("Via Serviço"),
              valueCell(data.viaServico ? "Sim" : "Não"),
              labelCell("Via TXT"),
              valueCell(data.viaTxt ? "Sim" : "Não"),
            ],
          }),
        ],
      })

      /* =========================
         LAYOUTS E MASSAS
         ========================= */

      const layoutsTables = data.layouts.flatMap((layout) => {
        const massasRows = layout.massasDados.flatMap((massa) => [
          new TableRow({
            children: [
              labelCell("Massa"),
              valueCell(massa.nomeMassaDados),
            ],
          }),

          new TableRow({
            children: [
              labelCell("Observação da massa"),
              valueCell(massa.observacao ?? "-"),
            ],
          }),
        ])

        return [
          sectionTitle(`Layout: ${layout.nomeLayout}`),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  labelCell("Observação do layout"),
                  valueCell(layout.observacao ?? "-"),
                ],
              }),

              ...massasRows,
            ],
          }),
        ]
      })

      /* =========================
         DOCUMENTO FINAL
         ========================= */

      const doc = new Document({
        sections: [
          {
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