"use client";

import { useForm } from "react-hook-form";
import { Medicamento, TipoUsoMedicamento } from "@/types/medicamento";
import styles from "../page.module.css";
import { Spinner } from "@/components/Spinner";
import { USO_MEDICAMENTO } from "@/lib/constants";
import { useState } from "react";

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

type FormData = {
  nome: string;
  intervalo: number;
  dosagem: number;
  uso: TipoUsoMedicamento;
};

export default function PaginaFormulario() {
  const [carregando, setCarregando] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
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
                {...register("nome", {
                  required: "É necessário informar o nome do medicamento.",
                  validate: (value) =>
                    value.trim() !== "" || "Nome não pode ser vazio.",
                })}
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
                {...register("intervalo", {
                  required: "É necessário informar o intervalo do medicamento.",
                  valueAsNumber: true,
                  validate: (value) =>
                    !isNaN(value) || "Intervalo deve ser um número válido.",
                })}
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
                {...register("dosagem", {
                  required: "É necessário informar a dosagem do medicamento.",
                  valueAsNumber: true,
                  validate: (value) =>
                    !isNaN(value) || "Dosagem deve ser um número válido.",
                })}
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
              <select
                {...register("uso", {
                  required:
                    "É necessário selecionar um tipo de uso de medicamento.",
                })}
                id="uso"
                className={styles.select}
              >
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
