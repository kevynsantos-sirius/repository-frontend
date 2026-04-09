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
  HeadingLevel,
  AlignmentType,
  Header,
  Footer,
} from "docx"
import { saveAs } from "file-saver"
import { renderAsync } from "docx-preview"
import type { ChecklistVersaoDTO } from "../dto/ChecklistVersaoDTO"
import { BorderStyle } from "docx"

type Props = {
  aberto: boolean
  onClose: () => void
  data: ChecklistVersaoDTO
}

export default function ChecklistDocPreviewModal({ aberto, onClose, data }: Props) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [blob, setBlob] = useState<Blob | null>(null)

  useEffect(() => {
    if (!aberto || !data) return

    async function gerarDoc() {
      /* =========================
         CONFIG FIXA DO DOCUMENTO
      ========================= */

      const TABLE_WIDTH = 10000
      const COL_LABEL = 3500
      const COL_VALUE = 6500

      const cellBorder = {
        top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
      }

      const labelCell = (text: string) =>
        new TableCell({
          width: { size: COL_LABEL, type: WidthType.DXA },
          shading: { fill: "F3F3F3" },
          borders: cellBorder,
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: true })],
            }),
          ],
        })

      const valueCell = (text?: string) =>
        new TableCell({
          width: { size: COL_VALUE, type: WidthType.DXA },
          borders: cellBorder,
          children: [
            new Paragraph({
              children: [new TextRun(text || "-")],
            }),
          ],
        })

      const row = (label: string, value?: string) =>
        new TableRow({
          children: [labelCell(label), valueCell(value)],
        })

      const title = (text: string) =>
        new Paragraph({
          text,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400, before: 400 },
        })

      const sectionTitle = (text: string) =>
        new Paragraph({
          text,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })

      const subTitle = (text: string) =>
        new Paragraph({
          text,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 250, after: 120 },
        })

      const thirdTitle = (text: string) =>
        new Paragraph({
          text,
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 100, after: 80 },
        })

      const createTable = (rows: TableRow[]) =>
        new Table({
          width: { size: TABLE_WIDTH, type: WidthType.DXA },
          layout: "fixed",
          columnWidths: [COL_LABEL, COL_VALUE],
          rows,
        })

      /* auxiliar p/ tabelas simples de arrays */
      const simpleTable = (label: string, values: string[]) =>
        createTable([
          new TableRow({
            children: [labelCell(label), valueCell(values.length ? values.join(", ") : "-")],
          }),
        ])

      /* =========================
         CAPA
      ========================= */

      const cover = [
        title(data.nomeDocumento),
        new Paragraph({
          children: [
            new TextRun({
              text: `Gerado em ${new Date().toLocaleDateString()}`,
              italics: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 800 },
        }),
      ]

      /* =========================
         TABELAS PRINCIPAIS
      ========================= */

      const identificacaoTable = createTable([
        row("Nome do documento", data.nomeDocumento),
        row("Ramo", data.nomeRamo ?? "-"),
        row("Centro de custo", data.centroCusto),
        row("Status", data.status === 1 ? "Ativo" : "Inativo"),
        row("Responsável", data.usuario?.nomeUsuario ?? "-"),
        row("Demanda", data.idDemanda),
      ])

      const destinosTable = createTable([
        row("Icatu", data.icatu ? "Sim" : "Não"),
        row("Caixa", data.caixa ? "Sim" : "Não"),
        row("Rio Grande", data.rioGrande ? "Sim" : "Não"),
      ])

      const envioTable = createTable([
        row("Via Serviço", data.viaServico ? "Sim" : "Não"),
        row("Via TXT", data.viaTxt ? "Sim" : "Não"),
      ])

      /* =========================
         LAYOUTS + MASSAS
      ========================= */

      const layoutsSections = (data.layouts ?? []).flatMap((layout) => {
        const massaBlocks = (layout.massasDados ?? []).flatMap((massa) => [
          thirdTitle(`Massa: ${massa.nomeMassaDados ?? "-"}`),
          createTable([row("Observação da massa", massa.observacao ?? "-")]),
        ])

        return [
          subTitle(`Layout: ${layout.nomeLayout ?? "-"}`),
          createTable([row("Observação do layout", layout.observacao ?? "-")]),
          ...massaBlocks,
        ]
      })

      /* =========================
         MODELOS — agora com NULL-SAFE 👍
      ========================= */

      const modelosSections = (data.modelos ?? []).flatMap((modelo) => {
        const camposBusca = modelo.camposBusca ?? {
          backoffice: "",
          cliente: "",
          corretor: "",
          estipulante: "",
          subestipulante: "",
        }

        const logos = modelo.logos ?? []
        const arquivos = modelo.arquivosAdicionais ?? []
        const assinaturas = modelo.assinaturas ?? []

        const logosList =
          logos.length > 0
            ? logos.map((l) => new Paragraph(`• ${l.name ?? l.nomeArquivo ?? "-"}`))
            : [new Paragraph("-")]

        const arquivosList =
          arquivos.length > 0
            ? arquivos.map((a) => new Paragraph(`• ${a.name ?? a.nomeArquivo ?? "-"}`))
            : [new Paragraph("-")]

        const assinaturasList =
          assinaturas.length > 0
            ? assinaturas.map((s) => new Paragraph(`• ${s.name ?? s.nomeArquivo ?? "-"}`))
            : [new Paragraph("-")]

        return [
          subTitle(`Modelo: ${modelo.nomeRecurso || modelo.id || "-"}`),

          createTable([
            row("Observação", modelo.observacao ?? "-"),
            row("Regras de acesso", modelo.regrasAcesso ?? "-"),
          ]),

          thirdTitle("Campos de busca"),
          createTable([
            row("Backoffice", camposBusca.backoffice || "-"),
            row("Cliente", camposBusca.cliente || "-"),
            row("Corretor", camposBusca.corretor || "-"),
            row("Estipulante", camposBusca.estipulante || "-"),
            row("Subestipulante", camposBusca.subestipulante || "-"),
          ]),

          thirdTitle("Tipo de impressão"),
          simpleTable("Impressão", modelo.tipoImpressao ?? []),

          thirdTitle("Tipo de acabamento"),
          simpleTable("Acabamento", modelo.tipoAcabamento ?? []),

          thirdTitle("Logos"),
          ...logosList,

          thirdTitle("Arquivos adicionais"),
          ...arquivosList,

          thirdTitle("Assinaturas"),
          ...assinaturasList,
        ]
      })

      /* =========================
         CABEÇALHO / RODAPÉ
      ========================= */

      const header = new Header({
        children: [
          new Paragraph({
            text: data.nomeDocumento,
            alignment: AlignmentType.RIGHT,
          }),
        ],
      })

      const footer = new Footer({
        children: [
          new Paragraph({
            text: "",
            alignment: AlignmentType.CENTER,
          }),
        ],
      })

      /* =========================
         DOCUMENTO FINAL
      ========================= */

      const doc = new Document({
        sections: [
          {
            headers: { default: header },
            footers: { default: footer },
            children: [
              ...cover,

              sectionTitle("Identificação"),
              identificacaoTable,

              sectionTitle("Destinos"),
              destinosTable,

              sectionTitle("Forma de Envio"),
              envioTable,

              sectionTitle("Layouts e Massas"),
              ...layoutsSections,

              sectionTitle("Modelos de Envio"),
              ...modelosSections,
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
            height: "65vh",
            overflow: "auto",
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0,0,0,0.15)",
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline-primary" onClick={baixar}>
            Baixar DOCX
          </button>

          <button className="btn btn-outline-secondary" onClick={onClose}>
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
  width: "85%",
  borderRadius: 8,
}