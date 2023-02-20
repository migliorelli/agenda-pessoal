const hoje = new Date().toLocaleDateString("pt-br").slice(0, -5);
const dataHeader = document.querySelector(".hoje");
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
  const data = formulario.querySelector(".data").value;

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

    String(data);
    String(titulo);
    agenda.adicionarItem(titulo, data);

    formulario.querySelector(".titulo").value = "";
    formulario.querySelector(".data").value = "";
  }
});
