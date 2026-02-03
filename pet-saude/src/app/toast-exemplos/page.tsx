"use client";

import { ToastMUI } from "@/components/ToastExemplos/ToastMUI";
import { ToastShadcn } from "@/components/ToastExemplos/ToastShadcn";

export default function ToastExemplosPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px" }}
      >
        Exemplos de Toast - Comparação
      </h1>

      <div style={{ marginBottom: "60px" }}>
        <ToastMUI />
      </div>

      <hr style={{ margin: "40px 0", border: "1px solid #ccc" }} />

      <div>
        <ToastShadcn />
      </div>
    </div>
  );
}
