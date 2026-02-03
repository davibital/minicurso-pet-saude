"use client";
import styles from "./page.module.css";
import { Lista } from "@/components/Lista";
import { BotaoContador } from "@/components/BotaoContador";

export default function Home() {
  const itensLista = ["Primeiro item", "Segundo item", "Terceiro item"];

  return (
    <>
      <header>
        <h1>Hello, world!</h1>
      </header>
      <main>
        <h2>Esse é o conteúdo principal</h2>
        <Lista items={itensLista} />
        <BotaoContador className={styles.botao} />
      </main>
      <footer>
        <p>Rodapé da página</p>
      </footer>
    </>
  );
}
