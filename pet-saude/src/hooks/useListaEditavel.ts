"use client";
import { useState } from "react";

export const useListaEditavel = <T>(listaInicial: T[]) => {
  const [items, setItems] = useState<T[]>(listaInicial);

  const adicionarItem = (item: T) => {
    setItems((prev) => [...prev, item]);
  };

  const removerItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    items,
    adicionarItem,
    removerItem,
  };
};

export type UseListaEditavelReturn<T> = ReturnType<typeof useListaEditavel<T>>;
