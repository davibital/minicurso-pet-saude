"use client";
import { useState } from "react";
import { CartaoTema } from "@/components/CartaoTema";
import { TemaContext } from "@/context/TemaContext";

export default function PaginaTema() {
  const [tema, setTema] = useState<"claro" | "escuro">("escuro");

  const corFundo = tema === "claro" ? "#FFFFFF" : "#882cdd";

  const trocarTema = () => {
    if (tema === "claro") setTema("escuro");
    else setTema("claro");
  };

  return (
    <TemaContext.Provider value={tema}>
      <div
        style={{
          width: "100%",
          height: "100dvh",
          backgroundColor: corFundo,
        }}
      >
        <button onClick={trocarTema}>Trocar tema</button>
        <CartaoTema titulo="Tema Dinâmico" />
      </div>
    </TemaContext.Provider>
  );
}
