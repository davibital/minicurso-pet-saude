"use client";

import { LineChart, PieChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";

type DadosGrafico = {
  labels: string[];
  valores: number[];
};

interface GraficoMUIProps {
  dados: DadosGrafico;
  tipo?: "barra" | "linha" | "pizza";
}

/**
 * Exemplos de gráficos usando MUI X-Charts
 */
export const GraficoMUI = ({ dados, tipo = "barra" }: GraficoMUIProps) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>
        Medicamentos Mais Prescritos (Últimos 30 dias)
      </h3>
      {tipo === "barra" && (
        <BarChart
          xAxis={[{ scaleType: "band", data: dados.labels }]}
          series={[
            {
              data: dados.valores,
              label: "Prescrições",
              color: "#1976d2",
            },
          ]}
          width={700}
          height={400}
        />
      )}
      {tipo === "linha" && (
        <LineChart
          xAxis={[{ scaleType: "band", data: dados.labels }]}
          series={[
            {
              data: dados.valores,
              label: "Prescrições",
              color: "#1976d2",
            },
          ]}
          width={700}
          height={400}
        />
      )}
      {tipo === "pizza" && (
        <PieChart
          series={[
            {
              data: dados.labels.map((label, index) => ({
                value: dados.valores[index],
                label: label,
              })),
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={700}
          height={400}
        />
      )}
    </div>
  );
};
