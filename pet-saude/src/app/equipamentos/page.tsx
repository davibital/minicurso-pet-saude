"use client";
import styles from "./page.module.css";
import { useListaEditavel } from "@/hooks/useListaEditavel";

export default function PaginaEquipamentos() {
  const itensIniciais = ["Equipamento 1", "Equipamento 2", "Equipamento 3"];
  const { items, removerItem, adicionarItem } =
    useListaEditavel<string>(itensIniciais);

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <h1 className={styles["titulo"]}>Lista de equipamentos</h1>
        <ul className={styles["lista"]}>
          {items.map((item, index) => (
            <li key={index} className={styles["item-lista"]}>
              <span className={styles["item-texto"]}>{item}</span>
              <button
                className={styles["botao-remover"]}
                onClick={() => removerItem(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <button
          className={styles["botao-adicionar"]}
          onClick={() =>
            adicionarItem(
              `Equipamentos ${parseInt(items[items.length - 1].split(" ")[1]) + 1}`,
            )
          }
        >
          + Adicionar equipamento
        </button>
      </div>
    </div>
  );
}
