const hoje = new Date().toLocaleDateString("pt-br").slice(0, -5);
const dataHeader = document.querySelector(".data h3");
dataHeader.innerHTML = hoje;

const headerBotao = document.querySelector(".mudar-agenda-btn");
const agendaSala = document.querySelector(".agenda-sala");
const agendaPessoal = document.querySelector(".agenda-pessoal");
const limparBotao = document.querySelector(".limpar-agenda");

const agendaFormulario = document.querySelector(".agenda-pessoal");
const agenda = new Agenda(agendaFormulario);
const formulario = document.querySelector(".form-add-elemento");

agenda.carregarDados();
agenda.iniciarAgenda();

function mostrarErro(mensagem) {
  const error = document.querySelector(".erro");

  error.style.transform = "translateY(0px)";
  error.style.opacity = "1";
  error.classList.add("mostrar-erro");
  error.innerHTML = mensagem;
}

const botaoSubmit = document.querySelector(".botao-submit");

botaoSubmit.addEventListener("click", () => {
  let erro = document.querySelector(".erro");
  erro.classList.remove("mostrar-erro");

  const titulo = formulario.querySelector(".titulo").value;
  const anotacoes = formulario.querySelector(".anotação").value;
  const data = formulario.querySelector(".data").value;
  const hora = formulario.querySelector(".hora").value;

  if (agenda.itemExiste(titulo)) {
    mostrarErro("Agendamento já existe.");
    return false;
  } else if (!titulo) {
    mostrarErro("Você precisa colocar um título.");
    return false;
  } else if (!data) {
    mostrarErro("Você precisa definir uma data.");
    return false;
  } else {
    erro.classList.remove("mostrar-erro");

    String(titulo);
    String(anotacoes);
    String(data);
    String(hora);
    agenda.adicionarItem(titulo, anotacoes, data, hora);

    formulario.querySelector(".titulo").value = "";
    formulario.querySelector(".anotação").value = "";
    formulario.querySelector(".data").value = "";
    formulario.querySelector(".hora").value = "";
  }
});
