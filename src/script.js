const agendaFormulario = document.querySelector(".agenda-pessoal");
const agenda = new Agenda(agendaFormulario);
const formulario = document.querySelector(".form-add-elemento");

agenda.carregarDados();

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

  const tituloField = formulario.querySelector(".titulo");
  const titulo = tituloField.value;

  const descField = formulario.querySelector(".desc");
  const desc = descField.value ? descField.value : false;

  const dataField = formulario.querySelector(".data");
  const horaField = formulario.querySelector(".hora");
  let data = false;
  if (dataField.value) {
    const [ano, mes, dia] = dataField.value.split("-");
    const [horas, minutos] = horaField.value
      ? horaField.value.split(":")
      : ["00", "00"];
    data = `${mes - 1} ${dia} ${ano} ${horas}:${minutos}`;
  }

  if (agenda.itemExiste(titulo)) {
    mostrarErro("Agendamento já existe.");
    return;

  } else if (!titulo) {
    mostrarErro("Você precisa colocar um título.");
    return;

  } else if (horaField.value && !dataField.value) {
    mostrarErro("Não pode ter hora sem data.");
    return;

  } else {
    erro.classList.remove("mostrar-erro");

    agenda.adicionarItem(titulo, desc, data);

    tituloField.value = "";
    descField.value = "";
    dataField.value = "";

    horaField.value = "";
  }
});

function toggleCard(botao) {
  const cardId = botao.id;
  const div = document.querySelector(`div.${cardId}`);
  const cards = document.querySelectorAll(".tela-flutuante");

  cards.forEach((card) => {
    if (!card.classList.contains(botao.id)) {
      card.classList.remove("mostrar-card");
    }
  });

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
    '[name="config-usuario-genero"]:checked'
  );
  genero = genero ? genero.value : 0;

  let fonte = formularioConfig.querySelector('[name="config-font"]:checked');
  fonte = fonte.value;

  const tema = agenda.config.tema;

  agenda.definirConfig({ usuario, genero, fonte, tema });
  toggleCard(botao.target);
});

const botaoBackup = document.querySelector(".backup-botao");
botaoBackup.addEventListener("click", (botao) => {
  agenda.fazerBackup();
  toggleCard(botao.target);
});
