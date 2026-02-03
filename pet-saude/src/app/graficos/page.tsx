"use client";

import { GraficoChartJS } from "@/components/GraficosExemplos/GraficoChartJS";
import { GraficoMUI } from "@/components/GraficosExemplos/GraficoMUI";
import { GraficoRecharts } from "@/components/GraficosExemplos/GraficoRecharts";
import styles from "./page.module.css";

export default function PaginaGraficos() {
  const dados = {
    labels: [
      "Dipirona",
      "Paracetamol",
      "Ibuprofeno",
      "Amoxicilina",
      "Omeprazol",
    ],
    valores: [450, 380, 320, 290, 250],
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 Exemplos de Gráficos</h1>

      {/* MUI X-Charts */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📈 Gráficos com MUI</h2>
        <GraficoMUI dados={dados} tipo="pizza" />
      </div>

      <hr className={styles.divider} />

      {/* React-ChartJS-2 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📈 Gráficos com React-ChartJS-2</h2>
        <GraficoChartJS dados={dados} tipo="barra" />
      </div>

      <hr className={styles.divider} />

      {/* Recharts */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📈 Gráficos com Recharts</h2>
        <GraficoRecharts dados={dados} tipo="linha" />
      </div>
    </div>
  );
}
