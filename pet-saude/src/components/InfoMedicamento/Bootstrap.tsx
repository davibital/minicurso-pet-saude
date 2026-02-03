import { InfoMedicamentoProps } from "@/components/InfoMedicamento";

export function InfoMedicamentoBootstrap({
  medicamento,
}: InfoMedicamentoProps) {
  return (
    <div className="d-flex flex-column gap-2">
      <span className="fw-semibold fs-6">{medicamento.nome}</span>

      <div className="d-flex gap-2 flex-wrap">
        <span className="badge bg-info">{medicamento.dosagem}</span>

        <span className="badge bg-info">A cada {medicamento.intervalo}</span>

        <span className="badge bg-info">Via {medicamento.uso}</span>
      </div>
    </div>
  );
}
