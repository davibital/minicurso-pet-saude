"use client";
import { Medicamento, TipoUsoMedicamento } from "@/types/medicamento";
import styles from "./page.module.css";
import { useListaEditavel } from "@/hooks/useListaEditavel";
import { USO_MEDICAMENTO } from "@/lib/constants";

const gerarNumeroAleatorio = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

export default function PaginaMedicamentos() {
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
              <div className={styles["item-info"]}>
                <span className={styles["item-nome"]}>{item.nome}</span>
                <div className={styles["item-detalhes"]}>
                  <span className={styles["badge"]}>{item.dosagem}</span>
                  <span className={styles["badge"]}>
                    A cada {item.intervalo}
                  </span>
                  <span className={styles["badge"]}>Via {item.uso}</span>
                </div>
              </div>
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
