const minhaLista = document.getElementById('minha-lista');
const meuBotao = document.getElementById('meu-botao');

let cliques = 0;
const itensLista = [
    'Primeiro item',
    'Segundo item',
    'Terceiro item'
];

function atualizarContadorCliques(event) {
    cliques += 1;

    event.target.innerText = `${cliques} clique${cliques != 1 ? 's' : ''}`;
}

meuBotao.addEventListener('click', atualizarContadorCliques);

for (let i = 0; i < itensLista.length; i++)
{
    const li = document.createElement('li');
    li.innerText = itensLista[i];

    minhaLista.appendChild(li);
}