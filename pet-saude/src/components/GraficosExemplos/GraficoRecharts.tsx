"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type DadosGrafico = {
  labels: string[];
  valores: number[];
};

interface GraficoRechartsProps {
  dados: DadosGrafico;
  tipo?: "barra" | "linha" | "pizza";
}

/**
 * Componente de gráfico usando Recharts
 */
export const GraficoRecharts = ({
  dados,
  tipo = "barra",
}: GraficoRechartsProps) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Transforma os dados para o formato do Recharts
  const chartData = dados.labels.map((label, index) => ({
    name: label,
    value: dados.valores[index],
  }));

  return (
    <div style={{ marginBottom: "50px" }}>
      <ResponsiveContainer width="100%" height={tipo === "pizza" ? 350 : 300}>
        {tipo === "barra" && (
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Quantidade" />
          </BarChart>
        )}

        {tipo === "linha" && (
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              name="Quantidade"
            />
          </LineChart>
        )}

        {tipo === "pizza" && (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
