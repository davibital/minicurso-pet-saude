# Cheat Sheet – React + TypeScript

Este material serve como um guia rápido de consulta para os principais conceitos, sintaxes e padrões usados em **React com TypeScript**, além de um resumo prático de **programação funcional em TypeScript**.

---

## 1. Fundamentos de TypeScript

### Declarando uma variável

```ts
// constante
const nome: Tipo = valor;
// variável
let nome: Tipo = valor;
// variável
var nome: Tipo = valor;
```

### Declarando uma função

```ts
const nomeDaFuncao = (arg1: Tipo1, arg2: Tipo2, ...): TipoRetorno => {
  // execução da função
}

function nomeDaFuncao(arg1: Tipo1, arg2: Tipo2, ...): TipoRetorno {
  // execução da função
}

const nomeDaFuncao = (arg1: Tipo1, arg2: Tipo2, ...): TipoRetorno => valorRetorno
```

### Tipos primitivos

```ts
let nome: string = "Davi";
let idade: number = 23;
let ativo: boolean = true;
```

### Arrays

```ts
let numeros: number[] = [1, 2, 3];
let nomes: Array<string> = ["Ana", "João"];
```

### Tuplas

```ts
let usuario: [string, number] = ["Maria", 30];
```

### Enums

```ts
enum Status {
  PENDENTE,
  SUCESSO,
  ERRO,
}
```

### Union Types

Pode ser número ou string

```ts
let id: number | string;
id = 10;
id = "10";
```

### Type Alias

```ts
type User = {
  id: number;
  name: string;
};
```

### Interfaces

```ts
interface Product {
  id: number;
  price: number;
}
```

### Optional e Readonly

```ts
interface User {
  id: number;
  // name pode existir ou não
  name?: string;
  // email não pode ser modificado
  readonly email: string;
}
```

### Classe básica

```ts
class Usuario {
  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  public saudacao(): string {
    return `Olá, meu nome é ${this.nome}`;
  }
}

const usuario = new Usuario("Davi", "davi@email.com");
console.log(usuario.saudacao());
```

### Modificadores de acesso

```ts
class Conta {
  public dono: string;
  private saldo: number;
  protected numeroDaConta: string;

  constructor(dono: string, saldoInicial: number) {
    this.dono = dono;
    this.saldo = saldoInicial;
    this.numeroDaConta = "123-456";
  }

  protected formatarSaldo(): string {
    return `R$${this.saldo},00`;
  }

  public depositar(valor: number): void {
    this.saldo += valor;
  }

  public getSaldo(): string {
    return this.formatarSaldo();
  }
}
```

### Herança

```ts
class ContaPoupanca extends Conta {
  private taxaJuros: number;

  constructor(dono: string, saldo: number, taxaJuros: number) {
    super(dono, saldo);
    this.taxaJuros = taxaJuros;
  }

  public aplicar(): void {
    // acesso permitido ao protected
    console.log(`Conta: ${this.numeroDaConta}`);
  }
}
```

### Interfaces

```ts
interface Transferencia {
  transferir(Conta: origem, Conta: destino, valor: number): boolean;
}

class TransferenciaPix implements Transferencia {
  transferir(Conta: origem, Conta: destino, valor: number): boolean {
    if (origem.saldo < valor) return false;

    origem.saldo = origem.saldo - valor;
    destino.saldo = destino.saldo + valor;

    return true;
  }
}
```

---

## 2. React com TypeScript – Essencial

### Componente Funcional

```tsx
type Props = {
  title: string;
};

// ou

interface Props {
  title: string;
}

function Header({ title }: Props) {
  return <h1>{title}</h1>;
}

// ou

const Header = ({ title }: Props) => {
  return <h1>{title}</h1>;
};

const MeuComponente = () => {
  return <Header title="Título" />;
  // ou
  return <Header title="Título"></Header>;
};
```

### Eventos

```tsx
function handleNomeDoEvento(event: MouseEvent<HTMLButtonElement>) {
  console.log("Execução do evento: ", event);
}

//...
<button onClick={handleNomeDoEvento}>Meu botão</button>;
```

## 3. Hooks mais comuns

### useState

```tsx
const [count, setCount] = useState<number>(0);
```

### useEffect

```tsx
useEffect(() => {
  console.log("Executou");
}, []);
```

### useContext

```tsx
const ThemeContext = createContext<string>("light");

const theme = useContext(ThemeContext);

const ComponentePai = () => {
  return <ThemeContext.Provider value="dark"></ThemeContext.Provider>;
};

const ComponenteFilho = () => {
  const theme = useContext(ThemeContext);
  // theme = "dark";
  //...
};
```

---

## 4. Programação Funcional em TypeScript

### map

```ts
Array.map((valorAtual, indice, array) => {
  // processamento
  return novoValor;
});

// Programação imperativa
const numeros: number[] = [1, 2, 3];
const dobro: number[] = [null, null, null];
for (let i = 0; i < numeros.length; i++) {
  dobro[i] = numeros[i] * 2;
}

// Programação funcional
const numeros: number[] = [1, 2, 3];
const dobro: number[] = numeros.map((n) => n * 2);
// [2, 4, 6]
```

### filter

```ts
Array.filter((valorAtual, indice, array) => {
  // processamento
  return true;
  // ou
  return false;
});

type Usuario = {
  nome: string;
  ativo: boolean;
};

const usuarios: Usuario[] = [
  { nome: "Ana", ativo: true },
  { nome: "João", ativo: false },
  { nome: "Miguel", ativo: true },
];

// Programação imperativa
const usuariosAtivos: Usuarios[] = [];

for (let i = 0; i < usuarios.length; i++) {
  if (usuarios[i].ativo) usuariosAtivos.push(usuarios[i]);
}

// Programação funcional
const usuariosAtivos: Usuario[] = usuarios.filter((u) => u.ativo);
/* [
 *   { nome: "Ana", ativo: true },
 *   { nome: "Miguel", ativo: true },
 * ]
 */
```

### reduce

```ts
Array.reduce((valorAnterior, valorAtual, indice, array) => {
  // processamento
  return novoValor;
}, valorInicial);

// Programação imperativa
let soma: number = 0;
const valores: number[] = [10, 20, 30];
for (let i = 0; i < valores.length; i++) {
  soma += valores[i];
}

// Programação funcional
const valores: number[] = [10, 20, 30];
const soma: number = valores.reduce((acc, atual) => acc + atual, 0);
```

### map + filter + reduce

```ts
type Produto = {
  nome: string;
  preco: number;
  disponivel: boolean;
};

const produtos: Produto[] = [
  { nome: "Mouse", preco: 100, disponivel: true },
  { nome: "Teclado", preco: 200, disponivel: false },
  { nome: "Monitor", preco: 900, disponivel: true },
];

const total = produtos
  .filter((p) => p.disponivel)
  .map((p) => p.preco)
  .reduce((acc, preco) => acc + preco, 0);
```

---

## 6. Boas práticas rápidas

- Prefira componentes funcionais
- Tipar sempre props, states e retornos
- Evite `any`
- Use imutabilidade
- Extraia lógica para hooks personalizados

---

## 7. Onde isso aparece no dia a dia

- Listagens (map no JSX)
- Filtros de busca (filter)
- Cálculos agregados (reduce)
- Formulários controlados
- Consumo de APIs
