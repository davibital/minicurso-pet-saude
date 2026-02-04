const minhaLista = document.getElementById("minha-lista");
const meuBotao = document.getElementById("meu-botao");
const elementoFormulario = document.getElementById("formulario");

let cliques = 0;
const itensLista = ["Primeiro item", "Segundo item", "Terceiro item"];

function atualizarContadorCliques(event) {
  cliques += 1;

  event.target.innerText = `${cliques} clique${cliques != 1 ? "s" : ""}`;
}

function enviarDados(event) {
  event.preventDefault();
  const dados = new FormData(elementoFormulario);

  alert(`{ nome: ${dados.get("nome")}, sobrenome: ${dados.get("sobrenome")} }`);
}

meuBotao.addEventListener("click", atualizarContadorCliques);
formulario.addEventListener("submit", enviarDados);

for (let i = 0; i < itensLista.length; i++) {
  const li = document.createElement("li");
  li.innerText = itensLista[i];

  minhaLista.appendChild(li);
}
