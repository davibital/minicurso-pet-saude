"use client";

import styles from "../page.module.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";

import { medicamentoFormSchema, type MedicamentoFormData } from "@/schemas";
import { Medicamento, TipoUsoMedicamento } from "@/types/medicamento";
import { USO_MEDICAMENTO } from "@/lib/constants";

import { Spinner } from "@/components/Spinner";

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

export default function PaginaFormulario() {
  const [carregando, setCarregando] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedicamentoFormData>({
    // resolver: zodResolver(medicamentoFormSchema),
    resolver: yupResolver(medicamentoFormSchema), // Alternativa com Yup
  });

  const onSubmit = (data: MedicamentoFormData) => {
    setCarregando(true);

    const medicamento: Medicamento = {
      nome: data.nome,
      dosagem: `${data.dosagem}mg`,
      intervalo: `${data.intervalo}h`,
      uso: data.uso,
    };

    setTimeout(() => {
      setCarregando(false);
      alert("Medicamento salvo: " + JSON.stringify(medicamento));
      reset();
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Medicamentos</h1>
        {carregando ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nome" className={styles.label}>
                Nome do Medicamento
              </label>
              <input
                {...register("nome")}
                id="nome"
                type="text"
                className={styles.input}
                placeholder="Ex: Dipirona"
              />
              {errors.nome && (
                <p className={styles.error}>{errors.nome.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="intervalo" className={styles.label}>
                Intervalo (horas)
              </label>
              <input
                {...register("intervalo", { valueAsNumber: true })}
                id="intervalo"
                type="number"
                className={styles.input}
                placeholder="Ex: 8"
              />
              {errors.intervalo && (
                <p className={styles.error}>{errors.intervalo.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dosagem" className={styles.label}>
                Dosagem (mg)
              </label>
              <input
                {...register("dosagem", { valueAsNumber: true })}
                id="dosagem"
                type="number"
                className={styles.input}
                placeholder="Ex: 500"
              />
              {errors.dosagem && (
                <p className={styles.error}>{errors.dosagem.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="uso" className={styles.label}>
                Tipo de uso:
              </label>
              <select {...register("uso")} id="uso" className={styles.select}>
                <option value="">Selecione o tipo de uso</option>
                {tiposUso.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              {errors.uso && (
                <p className={styles.error}>{errors.uso.message}</p>
              )}
            </div>

            <button type="submit" className={styles.button}>
              Salvar Medicamento
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
