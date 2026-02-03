import styles from "./InfoMedicamento.module.css";

import { InfoMedicamentoProps } from "@/components/InfoMedicamento";

export const InfoMedicamentoCSS = ({ medicamento }: InfoMedicamentoProps) => {
  return (
    <div className={styles["info"]}>
      <span className={styles["nome"]}>{medicamento.nome}</span>
      <div className={styles["detalhes"]}>
        <span className={styles["badge"]}>{medicamento.dosagem}</span>
        <span className={styles["badge"]}>A cada {medicamento.intervalo}</span>
        <span className={styles["badge"]}>Via {medicamento.uso}</span>
      </div>
    </div>
  );
};
