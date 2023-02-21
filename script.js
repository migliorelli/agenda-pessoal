let hoje = new Date().toLocaleDateString("pt-br").slice(0, -5),
  dataHeader = document.querySelector(".data h3");
dataHeader.innerHTML = hoje;

let headerBotao = document.querySelector(".mudar-agenda-btn"),
  agendaSala = document.querySelector(".agenda-sala"),
  agendaPessoal = document.querySelector(".agenda-pessoal"),
  limparBotao = document.querySelector(".limpar-agenda"),
  agendaFormulario = document.querySelector(".agenda-pessoal"),
  agenda = new Agenda(agendaFormulario),
  formulario = document.querySelector(".form-add-elemento");

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

  let titulo = formulario.querySelector(".titulo").value,
    anotacoes = formulario.querySelector(".anotação").value,
    data = formulario.querySelector(".data").value,
    hora = formulario.querySelector(".hora").value;

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

let telaBackup = document.querySelector(".tela-backup")

function toogleTelaBackup() {
  if (telaBackup.classList.contains("mostrar-backup")) {
    telaBackup.style.opacity = "0";
    telaBackup.style.animation = "backupOut 0.3s ease-in-out";
    telaBackup.classList.toggle("mostrar-backup")

  } else {
    telaBackup.style.opacity = "1";
    telaBackup.style.animation = "backupIn 0.3s ease-in-out";
    telaBackup.classList.toggle("mostrar-backup")
  }

}
