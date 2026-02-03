import { z } from "zod";
import { USO_MEDICAMENTO } from "@/lib/constants";
import { TipoUsoMedicamento } from "@/types/medicamento";

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

// Schema para formulário (antes de transformar os dados)
export const medicamentoFormSchema = z.object({
  nome: z
    .string()
    .min(1, "É necessário informar o nome do medicamento.")
    .trim()
    .refine((val) => val.length > 0, {
      message: "Nome não pode ser vazio.",
    }),
  intervalo: z
    .number("É necessário informar o intervalo do medicamento.")
    .positive("Intervalo deve ser um número positivo."),
  dosagem: z
    .number("É necessário informar a dosagem do medicamento.")
    .positive("Dosagem deve ser um número positivo."),
  uso: z.enum(tiposUso as TipoUsoMedicamento[], {
    message: "É necessário selecionar um tipo de uso de medicamento.",
  }),
});

// Types inferidos (prefixo com o nome do schema)
export type MedicamentoFormData = z.infer<typeof medicamentoFormSchema>;
