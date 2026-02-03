import { InfoMedicamentoProps } from "@/components/InfoMedicamento";

export const InfoMedicamentoTailwind = ({
  medicamento,
}: InfoMedicamentoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-base">{medicamento.nome}</span>

      <div className="flex flex-wrap gap-2">
        <span className="bg-cyan-200 text-xs px-2 py-1 rounded">
          {medicamento.dosagem}
        </span>

        <span className="bg-cyan-200 text-xs px-2 py-1 rounded">
          A cada {medicamento.intervalo}
        </span>

        <span className="bg-cyan-200 text-xs px-2 py-1 rounded">
          Via {medicamento.uso}
        </span>
      </div>
    </div>
  );
};
