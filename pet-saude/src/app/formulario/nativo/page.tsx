"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Medicamento, TipoUsoMedicamento } from "@/types/medicamento";
import styles from "../page.module.css";
import { Spinner } from "@/components/Spinner";
import { USO_MEDICAMENTO } from "@/lib/constants";

const tiposUso: TipoUsoMedicamento[] = Object.values(
  USO_MEDICAMENTO,
) as TipoUsoMedicamento[];

export default function PaginaFormulario() {
  const [nome, setNome] = useState<string>("");
  const [intervalo, setIntervalo] = useState<number | null>(null);
  const [dosagem, setDosagem] = useState<number | null>(null);
  const [uso, setUso] = useState<TipoUsoMedicamento | null>(null);

  const [erros, setErros] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState<boolean>(false);

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!nome || nome.trim() === "") {
      novosErros.nome = "É necessário informar o nome do medicamento.";
    }

    if (!intervalo || isNaN(intervalo)) {
      novosErros.intervalo =
        "É necessário informar o intervalo do medicamento.";
    }

    if (!dosagem || isNaN(dosagem)) {
      novosErros.dosagem = "É necessário informar a dosagem do medicamento.";
    }

    if (!uso) {
      novosErros.uso = "É necessário selecionar um tipo de uso de medicamento.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity("");
    setNome(event.target.value);
  };

  const handleIntervaloChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity("");
    if (!event.target.value) {
      setIntervalo(null);
      return;
    }

    setIntervalo(parseInt(event.target.value));
  };

  const handleDosagemChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity("");
    if (!event.target.value) {
      setDosagem(null);
      return;
    }

    setDosagem(parseInt(event.target.value));
  };

  const handleTipoUsoChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    event.currentTarget.setCustomValidity("");
    const novoUso = event.target.value as TipoUsoMedicamento;

    setUso(novoUso);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCarregando(true);

    if (!validarFormulario()) {
      setCarregando(false);
      return;
    }

    const medicamento: Medicamento = {
      nome,
      dosagem: `${dosagem}mg`,
      intervalo: `${intervalo}h`,
      uso: uso as TipoUsoMedicamento,
    };

    setTimeout(() => {
      setCarregando(false);
      alert("Medicamento salvo: " + JSON.stringify(medicamento));
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Medicamentos</h1>
        {carregando ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nome" className={styles.label}>
                Nome do Medicamento
              </label>
              <input
                name="nome"
                id="nome"
                type="text"
                value={nome ?? ""}
                onChange={handleNomeChange}
                className={styles.input}
                placeholder="Ex: Dipirona"
              />
              {erros.nome && <p className={styles.error}>{erros.nome}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="intervalo" className={styles.label}>
                Intervalo (horas)
              </label>
              <input
                type="number"
                name="intervalo"
                id="intervalo"
                value={intervalo ?? ""}
                onChange={handleIntervaloChange}
                className={styles.input}
                placeholder="Ex: 8"
              />
              {erros.intervalo && (
                <p className={styles.error}>{erros.intervalo}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dosagem" className={styles.label}>
                Dosagem (mg)
              </label>
              <input
                type="number"
                name="dosagem"
                id="dosagem"
                value={dosagem ?? ""}
                onChange={handleDosagemChange}
                className={styles.input}
                placeholder="Ex: 500"
              />
              {erros.dosagem && <p className={styles.error}>{erros.dosagem}</p>}
            </div>

            {/* <div className={styles.formGroup}>
              <label htmlFor="uso" className={styles.label}>
                Tipo de uso:
              </label>
              {tiposUso.map((opcao) => (
                <div key={opcao} className={styles.radioOption}>
                  <input
                    type="radio"
                    name={opcao.toLowerCase()}
                    id={opcao.toLowerCase()}
                    value={opcao}
                    checked={uso === opcao}
                    onChange={handleTipoUsoChange}
                  />
                  <label
                    htmlFor={opcao.toLocaleLowerCase()}
                    className={styles.label}
                    style={{ marginBottom: 0 }}
                  >
                    {opcao}
                  </label>
                </div>
              ))}
              {erros.uso && <p className={styles.error}>{erros.uso}</p>}
            </div> */}

            <div className={styles.formGroup}>
              <label htmlFor="uso" className={styles.label}>
                Tipo de uso:
              </label>
              <select
                id="uso"
                name="uso"
                className={styles.select}
                value={uso ?? ""}
                onChange={handleTipoUsoChange}
              >
                <option value="" disabled defaultValue={""}>
                  Selecione o tipo de uso
                </option>
                {tiposUso.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              {erros.uso && <p className={styles.error}>{erros.uso}</p>}
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
