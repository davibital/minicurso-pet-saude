"use client";
import { createContext } from "react";

type Tema = "claro" | "escuro";

export const TemaContext = createContext<Tema>("claro");
