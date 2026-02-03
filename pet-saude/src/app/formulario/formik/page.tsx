"use client";

import styles from "../page.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Medicamento, TipoUsoMedicamento } from "@/types/medicamento";
import { USO_MEDICAMENTO } from "@/lib/constants";

import { Spinner } from "@/components/Spinner";

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

// Uso padrão do Yup para validação
const validationSchema = Yup.object({
  nome: Yup.string()
    .required("É necessário informar o nome do medicamento.")
    .trim()
    .min(1, "Nome não pode ser vazio."),
  intervalo: Yup.number()
    .required("É necessário informar o intervalo do medicamento.")
    .typeError("Intervalo deve ser um número válido."),
  dosagem: Yup.number()
    .required("É necessário informar a dosagem do medicamento.")
    .typeError("Dosagem deve ser um número válido."),
  uso: Yup.string()
    .required("É necessário selecionar um tipo de uso de medicamento.")
    .oneOf(tiposUso, "Tipo de uso inválido."),
});

type FormValues = {
  nome: string;
  intervalo: number | "";
  dosagem: number | "";
  uso: TipoUsoMedicamento | "";
};

export default function PaginaFormulario() {
  const initialValues: FormValues = {
    nome: "",
    intervalo: "",
    dosagem: "",
    uso: "",
  };

  const handleSubmit = (
    values: FormValues,
    {
      resetForm,
      setSubmitting,
    }: {
      resetForm: () => void;
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    const medicamento: Medicamento = {
      nome: values.nome,
      dosagem: `${values.dosagem}mg`,
      intervalo: `${values.intervalo}h`,
      uso: values.uso as TipoUsoMedicamento,
    };

    setTimeout(() => {
      alert("Medicamento salvo: " + JSON.stringify(medicamento));
      setSubmitting(false);
      resetForm();
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Medicamentos</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) =>
            isSubmitting ? (
              <Spinner />
            ) : (
              <Form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome" className={styles.label}>
                    Nome do Medicamento
                  </label>
                  <Field
                    name="nome"
                    id="nome"
                    type="text"
                    className={styles.input}
                    placeholder="Ex: Dipirona"
                  />
                  <ErrorMessage
                    name="nome"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="intervalo" className={styles.label}>
                    Intervalo (horas)
                  </label>
                  <Field
                    name="intervalo"
                    id="intervalo"
                    type="number"
                    className={styles.input}
                    placeholder="Ex: 8"
                  />
                  <ErrorMessage
                    name="intervalo"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dosagem" className={styles.label}>
                    Dosagem (mg)
                  </label>
                  <Field
                    name="dosagem"
                    id="dosagem"
                    type="number"
                    className={styles.input}
                    placeholder="Ex: 500"
                  />
                  <ErrorMessage
                    name="dosagem"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="uso" className={styles.label}>
                    Tipo de uso:
                  </label>
                  <Field
                    as="select"
                    name="uso"
                    id="uso"
                    className={styles.select}
                  >
                    <option value="">Selecione o tipo de uso</option>
                    {tiposUso.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="uso"
                    component="p"
                    className={styles.error}
                  />
                </div>

                <button type="submit" className={styles.button}>
                  Salvar Medicamento
                </button>
              </Form>
            )
          }
        </Formik>
      </div>
    </main>
  );
}
