import { Informacoes } from "@/app/components/Informacoes";

interface CartaoTemaProps {
  titulo: string;
}

export const CartaoTema = ({ titulo }: CartaoTemaProps) => {
  return (
    <>
      <h2>{titulo}</h2>
      <Informacoes />
    </>
  );
};
