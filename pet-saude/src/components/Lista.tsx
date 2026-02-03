interface ListaProps {
  items: string[];
}

export const Lista = ({ items }: ListaProps) => {
  return (
    <>
      <ul>
        {items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
};
