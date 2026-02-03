import { NextRequest, NextResponse } from "next/server";
import {
  buscarEquipamentoPorId,
  atualizarEquipamento,
  removerEquipamento,
} from "@/lib/equipamento-store";
import { UpdateEquipamentoSchema } from "@/schemas/equipamento.schema";
import { ZodError } from "zod";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/equipamentos/[id]
 * Busca um equipamento por ID
 */
export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;

    const equipamento = buscarEquipamentoPorId(id);

    if (!equipamento) {
      return NextResponse.json(
        { error: "Equipamento não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ dados: equipamento }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar equipamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/equipamentos/[id]
 * Atualiza um equipamento existente (atualização parcial)
 *
 * Body: UpdateEquipamentoInput (JSON)
 */
export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Valida dados com Zod
    const dadosValidados = UpdateEquipamentoSchema.parse(body);

    // Verifica se há pelo menos um campo para atualizar
    if (Object.keys(dadosValidados).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo fornecido para atualização" },
        { status: 400 },
      );
    }

    // Atualiza equipamento
    const equipamentoAtualizado = atualizarEquipamento(id, dadosValidados);

    if (!equipamentoAtualizado) {
      return NextResponse.json(
        { error: "Equipamento não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ dados: equipamentoAtualizado }, { status: 200 });
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

    console.error("Erro ao atualizar equipamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/equipamentos/[id]
 * Remove um equipamento
 */
export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;

    const removido = removerEquipamento(id);

    if (!removido) {
      return NextResponse.json(
        { error: "Equipamento não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { mensagem: "Equipamento removido com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao remover equipamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
