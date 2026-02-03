import { z } from "zod";
import {
  CATEGORIA_EQUIPAMENTO,
  STATUS_EQUIPAMENTO,
  PRIORIDADE_EQUIPAMENTO,
} from "@/lib/constants";

// Schema para criação de equipamento
export const CreateEquipamentoSchema = z
  .object({
    nome: z
      .string({
        message: "Nome é obrigatório",
      })
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres"),

    categoria: z.enum(
      [
        CATEGORIA_EQUIPAMENTO.MONITOR,
        CATEGORIA_EQUIPAMENTO.RESPIRADOR,
        CATEGORIA_EQUIPAMENTO.BOMBA_INFUSAO,
        CATEGORIA_EQUIPAMENTO.RAIO_X,
        CATEGORIA_EQUIPAMENTO.ULTRASSOM,
        CATEGORIA_EQUIPAMENTO.MACA,
        CATEGORIA_EQUIPAMENTO.OUTRO,
      ],
      {
        message: "Categoria é obrigatória",
      },
    ),

    status: z.enum(
      [
        STATUS_EQUIPAMENTO.DISPONIVEL,
        STATUS_EQUIPAMENTO.EM_USO,
        STATUS_EQUIPAMENTO.MANUTENCAO,
        STATUS_EQUIPAMENTO.INATIVO,
        STATUS_EQUIPAMENTO.DESCARTADO,
      ],
      {
        message: "Status é obrigatório",
      },
    ),

    prioridade: z.enum(
      [
        PRIORIDADE_EQUIPAMENTO.BAIXA,
        PRIORIDADE_EQUIPAMENTO.MEDIA,
        PRIORIDADE_EQUIPAMENTO.ALTA,
      ],
      {
        message: "Prioridade é obrigatória",
      },
    ),

    localizacao: z
      .string({
        message: "Localização é obrigatória",
      })
      .min(3, "Localização deve ter no mínimo 3 caracteres")
      .max(100, "Localização deve ter no máximo 100 caracteres"),

    dataAquisicao: z
      .string({
        message: "Data de aquisição é obrigatória",
      })
      .datetime({
        message: "Data de aquisição deve estar no formato ISO 8601",
      }),

    dataUltimaManutencao: z
      .string()
      .datetime({
        message: "Data da última manutenção deve estar no formato ISO 8601",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.dataUltimaManutencao) return true;
      return (
        new Date(data.dataUltimaManutencao) >= new Date(data.dataAquisicao)
      );
    },
    {
      message:
        "Data da última manutenção não pode ser anterior à data de aquisição",
      path: ["dataUltimaManutencao"],
    },
  );

// Schema para atualização de equipamento (todos os campos opcionais)
export const UpdateEquipamentoSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .optional(),

    categoria: z
      .enum([
        CATEGORIA_EQUIPAMENTO.MONITOR,
        CATEGORIA_EQUIPAMENTO.RESPIRADOR,
        CATEGORIA_EQUIPAMENTO.BOMBA_INFUSAO,
        CATEGORIA_EQUIPAMENTO.RAIO_X,
        CATEGORIA_EQUIPAMENTO.ULTRASSOM,
        CATEGORIA_EQUIPAMENTO.MACA,
        CATEGORIA_EQUIPAMENTO.OUTRO,
      ])
      .optional(),

    status: z
      .enum([
        STATUS_EQUIPAMENTO.DISPONIVEL,
        STATUS_EQUIPAMENTO.EM_USO,
        STATUS_EQUIPAMENTO.MANUTENCAO,
        STATUS_EQUIPAMENTO.INATIVO,
        STATUS_EQUIPAMENTO.DESCARTADO,
      ])
      .optional(),

    prioridade: z
      .enum([
        PRIORIDADE_EQUIPAMENTO.BAIXA,
        PRIORIDADE_EQUIPAMENTO.MEDIA,
        PRIORIDADE_EQUIPAMENTO.ALTA,
      ])
      .optional(),

    localizacao: z
      .string()
      .min(3, "Localização deve ter no mínimo 3 caracteres")
      .max(100, "Localização deve ter no máximo 100 caracteres")
      .optional(),

    dataAquisicao: z
      .string()
      .datetime({
        message: "Data de aquisição deve estar no formato ISO 8601",
      })
      .optional(),

    dataUltimaManutencao: z
      .string()
      .datetime({
        message: "Data da última manutenção deve estar no formato ISO 8601",
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Se ambas as datas estiverem presentes, valida
      if (data.dataAquisicao && data.dataUltimaManutencao) {
        return (
          new Date(data.dataUltimaManutencao) >= new Date(data.dataAquisicao)
        );
      }
      return true;
    },
    {
      message:
        "Data da última manutenção não pode ser anterior à data de aquisição",
      path: ["dataUltimaManutencao"],
    },
  );

export type CreateEquipamentoInput = z.infer<typeof CreateEquipamentoSchema>;
export type UpdateEquipamentoInput = z.infer<typeof UpdateEquipamentoSchema>;
