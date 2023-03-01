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
  const erro = document.querySelector(".erro");
  erro.classList.remove("mostrar-erro");

  const titulo = formulario.querySelector(".titulo");
  const anotacoes = formulario.querySelector(".anotação");
  const data = formulario.querySelector(".data");
  const hora = formulario.querySelector(".hora");

  const tituloValue = titulo.value;
  const anotacoesValue = anotacoes.value;
  const dataValue = data.value;
  const horaValue = hora.value;

  if (agenda.itemExiste(tituloValue)) {
    mostrarErro("Agendamento já existe.");
    return false;
  } else if (!tituloValue) {
    mostrarErro("Você precisa colocar um título.");
    return false;
  } else if (!dataValue) {
    mostrarErro("Você precisa definir uma dataValue.");
    return false;
  } else {
    erro.classList.remove("mostrar-erro");

    String(tituloValue);
    String(anotacoesValue);
    String(dataValue);
    String(horaValue);
    agenda.adicionarItem(tituloValue, anotacoesValue, dataValue, horaValue);

    titulo.value = "";
    anotacoes.value = "";
    data.value = "";
    hora.value = "";
  }
});

function toggleCard(botao) {
  const cardId = botao.id;
  const div = document.querySelector(`div.${cardId}`);
  const cards = document.querySelectorAll(".tela-flutuante")

  cards.forEach(card => {
    if (!card.classList.contains(botao.id)) {
      card.classList.remove("mostrar-card")
    }
  })

  if (div.classList.contains("mostrar-card")) {
    div.style.opacity = "0";
    div.classList.toggle("mostrar-card");
    return;
  }

  div.style.opacity = "1";
  div.style.animation = "cardIn 0.3s ease-in-out";
  div.classList.toggle("mostrar-card");
}

const formularioConfig = document.querySelector(".config-form");
const salvarConfig = document.querySelector(".config-salvar");

salvarConfig.addEventListener("click", (botao) => {
  let usuario = formularioConfig.querySelector(
    '.config-usuario input[type="text"]'
  );
  usuario = usuario.value ? usuario.value : false;

  let genero = formularioConfig.querySelector(
    'input[name="config-usuario-genero"]:checked'
  );
  genero = genero ? genero.value : false;

  let fonte = formularioConfig.querySelector(
    'input[name="config-font"]:checked'
  ).value;

  agenda.definirConfig({ usuario, genero, fonte });
  toggleCard(botao.target);
});

const botaoBackup = document.querySelector(".backup-botao");
botaoBackup.addEventListener("click", (botao) => {
  agenda.fazerBackup();
  toggleCard(botao.target);
});
