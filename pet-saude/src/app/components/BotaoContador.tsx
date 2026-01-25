'use client'
import { useState } from "react";

interface BotaoContador {
  className: string;
}

export const BotaoContador = ({ className }: BotaoContador) => {
  const [cliques, setCliques] = useState(0);

  function atualizarCliques() {
    setCliques(prev => prev + 1);
  }
    
  const texto = `${cliques} clique${cliques != 1 ? 's' : ''}`;

  return (
    <button onClick={atualizarCliques} className={className}>
      {texto}
    </button>
  );
}