import { USO_MEDICAMENTO } from "@/lib/constants";

export type TipoUsoMedicamento =
  (typeof USO_MEDICAMENTO)[keyof typeof USO_MEDICAMENTO];

export type Medicamento = {
  nome: string;
  dosagem: string;
  intervalo: string;
  uso: TipoUsoMedicamento;
};
