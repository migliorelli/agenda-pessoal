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

  const titulo = formulario.querySelector(".titulo");
  const desc = formulario.querySelector(".desc");
  const data = formulario.querySelector(".data");
  const hora = formulario.querySelector(".hora");

  if (agenda.itemExiste(titulo.value)) {
    mostrarErro("Agendamento já existe.");
    return false;
  } else if (!titulo.value) {
    mostrarErro("Você precisa colocar um título.");
    return false;
  } else {
    erro.classList.remove("mostrar-erro");

    agenda.adicionarItem(
      titulo.value,
      desc.value ? desc.value : false,
      data.value ? data.value : false,
      hora.value ? hora.value : false
    );

    titulo.value = "";
    desc.value = "";
    data.value = "";
    hora.value = "";
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
    'input[name="config-usuario-genero"]:checked'
  );
  genero = genero ? genero.value : "de";

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
