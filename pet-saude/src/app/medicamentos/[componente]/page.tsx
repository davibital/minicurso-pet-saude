"use client";
import { Medicamento, TipoUsoMedicamento } from "@/types/medicamento";
import styles from "../page.module.css";
import { useListaEditavel } from "@/hooks/useListaEditavel";
import { USO_MEDICAMENTO } from "@/lib/constants";
import {
  InfoMedicamentoCSS,
  InfoMedicamentoProps,
  InfoMedicamentoTailwind,
} from "@/components/InfoMedicamento";
import { InfoMedicamentoBootstrap } from "@/components/InfoMedicamento/Bootstrap";
import { use } from "react";

const gerarNumeroAleatorio = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

type TipoComponenteMedicamento = "css" | "tailwind" | "bootstrap";
type ComponenteMedicamentoProps = {
  tipo: TipoComponenteMedicamento;
} & InfoMedicamentoProps;

const ComponenteMedicamento = ({
  tipo,
  medicamento,
}: ComponenteMedicamentoProps) => {
  if (tipo === "css") return <InfoMedicamentoCSS medicamento={medicamento} />;
  if (tipo === "bootstrap")
    return <InfoMedicamentoBootstrap medicamento={medicamento} />;
  if (tipo === "tailwind")
    return <InfoMedicamentoTailwind medicamento={medicamento} />;

  return null;
};

export default function PaginaMedicamentos({
  params,
}: {
  params: Promise<{ componente: TipoComponenteMedicamento }>;
}) {
  const { componente } = use(params);
  const itensIniciais: Medicamento[] = [
    {
      nome: "Medicamento 1",
      dosagem: "500mg",
      intervalo: "8h",
      uso: USO_MEDICAMENTO.ORAL,
    },
    {
      nome: "Medicamento 2",
      dosagem: "875mg",
      intervalo: "12h",
      uso: USO_MEDICAMENTO.INTRAMUSCULAR,
    },
  ];

  const { items, removerItem, adicionarItem } =
    useListaEditavel<Medicamento>(itensIniciais);

  const handleAdicionar = () => {
    const nome = `Medicamento ${gerarNumeroAleatorio(1, 100)}`;
    const dosagem = `${gerarNumeroAleatorio(100, 1000)}mg`;
    const intervalo = `${gerarNumeroAleatorio(4, 24)}h`;
    const uso = tiposUso[gerarNumeroAleatorio(0, tiposUso.length - 1)];
    adicionarItem({ nome, dosagem, intervalo, uso });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <h1 className={styles["titulo"]}>💊 Lista de Medicamentos</h1>

        <button className={styles["botao-adicionar"]} onClick={handleAdicionar}>
          + Adicionar Medicamento
        </button>

        <ul className={styles["lista"]}>
          {items.map((item, index) => (
            <li key={index} className={styles["item-lista"]}>
              <ComponenteMedicamento tipo={componente} medicamento={item} />
              <button
                className={styles["botao-remover"]}
                onClick={() => removerItem(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
