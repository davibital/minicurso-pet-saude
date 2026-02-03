import {
  PRIORIDADE_EQUIPAMENTO,
  STATUS_EQUIPAMENTO,
  CATEGORIA_EQUIPAMENTO,
} from "@/lib/constants";

export type PrioridadeEquipamento =
  (typeof PRIORIDADE_EQUIPAMENTO)[keyof typeof PRIORIDADE_EQUIPAMENTO];
export type StatusEquipamento =
  (typeof STATUS_EQUIPAMENTO)[keyof typeof STATUS_EQUIPAMENTO];
export type CategoriaEquipamento =
  (typeof CATEGORIA_EQUIPAMENTO)[keyof typeof CATEGORIA_EQUIPAMENTO];

export type Equipamento = {
  id: string;
  nome: string;
  categoria: CategoriaEquipamento;
  status: StatusEquipamento;
  prioridade: PrioridadeEquipamento;
  localizacao: string;

  // Data em formato ISO 8601
  dataAquisicao: string;
  dataUltimaManutencao: string;

  // Data em formato ISO 8601
  criadoEm: string;
  atualizadoEm: string;
};
