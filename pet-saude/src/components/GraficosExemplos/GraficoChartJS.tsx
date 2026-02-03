"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

type DadosGrafico = {
  labels: string[];
  valores: number[];
};

interface GraficoChartJSProps {
  dados: DadosGrafico;
  tipo?: "barra" | "linha" | "pizza";
}

/**
 * Componente de gráfico usando React-ChartJS-2
 */
export const GraficoChartJS = ({
  dados,
  tipo = "barra",
}: GraficoChartJSProps) => {
  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(201, 203, 207, 0.6)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(201, 203, 207, 1)",
  ];

  const chartData = {
    labels: dados.labels,
    datasets: [
      {
        label: "Quantidade",
        data: dados.valores,
        backgroundColor: tipo === "pizza" ? colors : "rgba(54, 162, 235, 0.6)",
        borderColor: tipo === "pizza" ? borderColors : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        tension: tipo === "linha" ? 0.3 : undefined,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: tipo === "pizza" ? ("right" as const) : ("top" as const),
      },
      title: {
        display: false,
      },
    },
    scales:
      tipo !== "pizza"
        ? {
            y: {
              beginAtZero: true,
            },
          }
        : undefined,
  };

  return (
    <div
      style={{
        marginBottom: "50px",
        maxWidth: tipo === "pizza" ? "600px" : "800px",
      }}
    >
      {tipo === "barra" && <Bar data={chartData} options={options} />}
      {tipo === "linha" && <Line data={chartData} options={options} />}
      {tipo === "pizza" && <Doughnut data={chartData} options={options} />}
    </div>
  );
};
