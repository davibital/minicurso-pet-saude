import { Equipamento } from "@/types/equipamento";
import { CreateEquipamentoInput } from "@/schemas";
import {
  CATEGORIA_EQUIPAMENTO,
  STATUS_EQUIPAMENTO,
  PRIORIDADE_EQUIPAMENTO,
} from "@/lib/constants";

// Lista de equipamentos
const equipamentos: Equipamento[] = [];

// Contador para gerar IDs sequenciais
let idCounter = 1;

// Tipos para filtros
interface EquipamentoFilters {
  categorias?: string[];
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}

// Função auxiliar para gerar ID único
function gerarId(): string {
  return `eq-${String(idCounter++).padStart(6, "0")}`;
}

// Função auxiliar para obter timestamp atual em ISO 8601
function obterTimestampAtual(): string {
  return new Date().toISOString();
}

// CRUD Operations

/**
 * Cria um novo equipamento
 */
export function criarEquipamento(dados: CreateEquipamentoInput): Equipamento {
  const novoEquipamento: Equipamento = {
    id: gerarId(),
    ...dados,
    dataUltimaManutencao: dados.dataUltimaManutencao || "",
    criadoEm: obterTimestampAtual(),
    atualizadoEm: obterTimestampAtual(),
  };

  equipamentos.push(novoEquipamento);
  return novoEquipamento;
}

/**
 * Lista todos os equipamentos com filtros opcionais
 */
export function listarEquipamentos(
  filtros?: EquipamentoFilters,
): Equipamento[] {
  let lista = equipamentos;

  if (!filtros) {
    return lista;
  }

  // Filtro por categorias (múltiplas)
  if (filtros.categorias && filtros.categorias.length > 0) {
    lista = lista.filter((eq) => filtros.categorias!.includes(eq.categoria));
  }

  // Filtro por status (único)
  if (filtros.status) {
    console.log("lista: ", lista);
    lista = lista.filter((eq) => eq.status === filtros.status);
  }

  // Filtro por data de aquisição (intervalo)
  if (filtros.dataInicio) {
    const dataInicio = new Date(filtros.dataInicio);
    lista = lista.filter((eq) => new Date(eq.dataAquisicao) >= dataInicio);
  }

  if (filtros.dataFim) {
    const dataFim = new Date(filtros.dataFim);
    lista = lista.filter((eq) => new Date(eq.dataAquisicao) <= dataFim);
  }

  return lista;
}

/**
 * Busca um equipamento por ID
 */
export function buscarEquipamentoPorId(id: string): Equipamento | undefined {
  return equipamentos.find((eq) => eq.id === id);
}

/**
 * Atualiza um equipamento existente (atualização parcial)
 */
export function atualizarEquipamento(
  id: string,
  dados: Partial<Omit<Equipamento, "id" | "criadoEm" | "atualizadoEm">>,
): Equipamento | undefined {
  const index = equipamentos.findIndex((eq) => eq.id === id);
  const equipamentoExistente = equipamentos[index];

  if (!equipamentoExistente) {
    return undefined;
  }

  const equipamentoAtualizado: Equipamento = {
    ...equipamentoExistente,
    ...dados,
    id: equipamentoExistente.id, // Preserva o ID
    criadoEm: equipamentoExistente.criadoEm, // Preserva criadoEm
    atualizadoEm: obterTimestampAtual(), // Atualiza atualizadoEm
  };

  equipamentos[index] = equipamentoAtualizado;
  return equipamentoAtualizado;
}

/**
 * Remove um equipamento
 */
export function removerEquipamento(id: string): boolean {
  const index = equipamentos.findIndex((eq) => eq.id === id);
  equipamentos.splice(index, 1);
  return true;
}

/**
 * Conta o total de equipamentos
 */
export function contarEquipamentos(): number {
  return equipamentos.length;
}

// Seed data - dados iniciais para teste
export function inicializarDadosSeed(): void {
  // Cria equipamentos de exemplo
  const dadosSeed: CreateEquipamentoInput[] = [
    {
      nome: "Monitor Cardíaco Philips MX40",
      categoria: CATEGORIA_EQUIPAMENTO.MONITOR,
      status: STATUS_EQUIPAMENTO.DISPONIVEL,
      prioridade: PRIORIDADE_EQUIPAMENTO.ALTA,
      localizacao: "UTI - Sala 101",
      dataAquisicao: "2023-03-15T10:00:00.000Z",
      dataUltimaManutencao: "2025-11-20T14:30:00.000Z",
    },
    {
      nome: "Respirador Mecânico Drager Evita V800",
      categoria: CATEGORIA_EQUIPAMENTO.RESPIRADOR,
      status: STATUS_EQUIPAMENTO.EM_USO,
      prioridade: PRIORIDADE_EQUIPAMENTO.ALTA,
      localizacao: "UTI - Sala 102",
      dataAquisicao: "2023-06-10T08:00:00.000Z",
      dataUltimaManutencao: "2025-12-01T09:00:00.000Z",
    },
    {
      nome: "Bomba de Infusão B.Braun Infusomat Space",
      categoria: CATEGORIA_EQUIPAMENTO.BOMBA_INFUSAO,
      status: STATUS_EQUIPAMENTO.MANUTENCAO,
      prioridade: PRIORIDADE_EQUIPAMENTO.MEDIA,
      localizacao: "Centro Cirúrgico - Sala 3",
      dataAquisicao: "2024-01-20T12:00:00.000Z",
      dataUltimaManutencao: "2026-01-15T10:00:00.000Z",
    },
    {
      nome: "Aparelho de Raio-X Digital Siemens",
      categoria: CATEGORIA_EQUIPAMENTO.RAIO_X,
      status: STATUS_EQUIPAMENTO.DISPONIVEL,
      prioridade: PRIORIDADE_EQUIPAMENTO.ALTA,
      localizacao: "Radiologia - Sala 1",
      dataAquisicao: "2024-05-10T09:30:00.000Z",
      dataUltimaManutencao: "2025-10-05T16:00:00.000Z",
    },
    {
      nome: "Ultrassom GE Logiq E10",
      categoria: CATEGORIA_EQUIPAMENTO.ULTRASSOM,
      status: STATUS_EQUIPAMENTO.DISPONIVEL,
      prioridade: PRIORIDADE_EQUIPAMENTO.MEDIA,
      localizacao: "Diagnóstico por Imagem - Sala 2",
      dataAquisicao: "2024-08-15T11:00:00.000Z",
    },
    {
      nome: "Maca Hospitalar Elétrica Premium",
      categoria: CATEGORIA_EQUIPAMENTO.MACA,
      status: STATUS_EQUIPAMENTO.DISPONIVEL,
      prioridade: PRIORIDADE_EQUIPAMENTO.BAIXA,
      localizacao: "Emergência - Corredor A",
      dataAquisicao: "2025-02-01T07:00:00.000Z",
    },
    {
      nome: "Monitor Multiparamétrico Mindray BeneView T8",
      categoria: CATEGORIA_EQUIPAMENTO.MONITOR,
      status: STATUS_EQUIPAMENTO.EM_USO,
      prioridade: PRIORIDADE_EQUIPAMENTO.ALTA,
      localizacao: "UTI - Sala 103",
      dataAquisicao: "2025-06-20T13:00:00.000Z",
      dataUltimaManutencao: "2025-12-10T11:30:00.000Z",
    },
    {
      nome: "Respirador de Transporte Oxylog 3000 Plus",
      categoria: CATEGORIA_EQUIPAMENTO.RESPIRADOR,
      status: STATUS_EQUIPAMENTO.INATIVO,
      prioridade: PRIORIDADE_EQUIPAMENTO.MEDIA,
      localizacao: "Almoxarifado - Prateleira C5",
      dataAquisicao: "2022-11-30T15:00:00.000Z",
      dataUltimaManutencao: "2024-08-22T10:00:00.000Z",
    },
    {
      nome: "Bomba de Infusão Portátil Fresenius Vial",
      categoria: CATEGORIA_EQUIPAMENTO.BOMBA_INFUSAO,
      status: STATUS_EQUIPAMENTO.DISPONIVEL,
      prioridade: PRIORIDADE_EQUIPAMENTO.BAIXA,
      localizacao: "Enfermaria 2 - Posto de Enfermagem",
      dataAquisicao: "2025-09-10T10:30:00.000Z",
    },
    {
      nome: "Desfibrilador Portátil Zoll AED Plus",
      categoria: CATEGORIA_EQUIPAMENTO.OUTRO,
      status: STATUS_EQUIPAMENTO.DESCARTADO,
      prioridade: PRIORIDADE_EQUIPAMENTO.ALTA,
      localizacao: "Depósito de Descarte",
      dataAquisicao: "2020-03-05T08:00:00.000Z",
      dataUltimaManutencao: "2024-01-15T14:00:00.000Z",
    },
  ];

  dadosSeed.forEach((dados) => criarEquipamento(dados));
}
