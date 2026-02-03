import { NextRequest, NextResponse } from "next/server";
import {
  listarEquipamentos,
  criarEquipamento,
  inicializarDadosSeed,
  contarEquipamentos,
} from "@/lib/equipamento-store";
import { CreateEquipamentoSchema } from "@/schemas";
import { ZodError } from "zod";

// Inicializa dados seed na primeira execução
if (contarEquipamentos() === 0) {
  inicializarDadosSeed();
}

/**
 * GET /api/equipamentos
 * Lista todos os equipamentos com filtros opcionais
 *
 * Query params:
 * - categorias: string (separadas por vírgula, ex: "Monitor,Ultrassom")
 * - status: string (único)
 * - dataInicio: string (ISO 8601)
 * - dataFim: string (ISO 8601)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extrai filtros dos query params
    const categorias = searchParams.get("categorias");
    const status = searchParams.get("status");
    const dataInicio = searchParams.get("dataInicio");
    const dataFim = searchParams.get("dataFim");

    // Valida e converte categorias (múltiplas, separadas por vírgula)
    const categoriasArray = categorias
      ? categorias.split(",").map((c) => c.trim())
      : undefined;

    // Valida datas se fornecidas
    if (dataInicio && isNaN(Date.parse(dataInicio))) {
      return NextResponse.json(
        { error: "dataInicio deve estar no formato ISO 8601" },
        { status: 400 },
      );
    }

    if (dataFim && isNaN(Date.parse(dataFim))) {
      return NextResponse.json(
        { error: "dataFim deve estar no formato ISO 8601" },
        { status: 400 },
      );
    }

    // Lista equipamentos com filtros
    const equipamentos = listarEquipamentos({
      categorias: categoriasArray,
      status: status || undefined,
      dataInicio: dataInicio || undefined,
      dataFim: dataFim || undefined,
    });

    return NextResponse.json({ dados: equipamentos }, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar equipamentos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/equipamentos
 * Cria um novo equipamento
 *
 * Body: CreateEquipamentoInput (JSON)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valida dados com Zod
    const dadosValidados = CreateEquipamentoSchema.parse(body);

    // Cria equipamento
    const novoEquipamento = criarEquipamento(dadosValidados);

    return NextResponse.json({ dados: novoEquipamento }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          detalhes: error.issues.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        },
        { status: 400 },
      );
    }

    console.error("Erro ao criar equipamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
