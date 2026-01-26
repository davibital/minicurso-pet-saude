"use client";
import styles from "./page.module.css";
import { useListaEditavel } from "@/app/hooks/useListaEditavel";

interface Medicamento {
  nome: string;
  dosagem: string;
  intervalo: string;
}

const gerarNumeroAleatorio = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function PaginaMedicamentos() {
  const itensIniciais: Medicamento[] = [
    { nome: "Medicamento 1", dosagem: "500mg", intervalo: "8h" },
    { nome: "Medicamento 2", dosagem: "875mg", intervalo: "12h" },
  ];

  const { items, removerItem, adicionarItem } =
    useListaEditavel<Medicamento>(itensIniciais);

  const handleAdicionar = () => {
    const nome = `Medicamento ${gerarNumeroAleatorio(1, 100)}`;
    const dosagem = `${gerarNumeroAleatorio(100, 1000)}mg`;
    const intervalo = `${gerarNumeroAleatorio(4, 24)}h`;
    adicionarItem({ nome, dosagem, intervalo });
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
