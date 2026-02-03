"use client";

import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export const ToastShadcn = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Exemplo de Toast - Shadcn/UI</h2>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            toast.success("Equipamento criado com sucesso!");
          }}
        >
          Toast Sucesso
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            toast.error("Erro ao criar equipamento!");
          }}
        >
          Toast Erro
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toast.warning("Equipamento em manutenção!");
          }}
        >
          Toast Aviso
        </Button>
      </div>

      <Toaster />
    </div>
  );
};
