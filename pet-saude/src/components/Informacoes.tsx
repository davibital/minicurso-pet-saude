import { useContext } from "react";
import { TemaContext } from "@/context/TemaContext";

export const Informacoes = () => {
  const tema = useContext(TemaContext);

  const dataHoje = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
    new Date(),
  );
  const corFundo = tema === "claro" ? "#FFFFFF" : "#882cdd";
  const corData = tema === "claro" ? "#b100ff" : "#FFFFFF";

  return (
    <div style={{ padding: 10, backgroundColor: corFundo }}>
      <p>Este é um componente de informações adicionais.</p>
      <p style={{ color: corData }}>Hoje é dia {dataHoje}</p>
    </div>
  );
};
