const hoje = new Date().toLocaleDateString("pt-br").slice(0, -5);
const dataHeader = document.querySelector(".hoje");
dataHeader.innerHTML = hoje;

const headerBotao = document.querySelector(".mudar-agenda-btn");
const agendaSala = document.querySelector(".agenda-sala");
const agendaPessoal = document.querySelector(".agenda-pessoal");

headerBotao.addEventListener("click", () => {
  agendaSala.classList.toggle("agenda-visivel");
  agendaPessoal.classList.toggle("agenda-visivel");

  headerBotao.innerHTML = agendaPessoal.classList.contains("agenda-visivel")
    ? "Agenda Pessoal"
    : "Agenda da Sala";
});

const botaoMenu = document.querySelector(".botao-menu");
const materias = document.querySelector(".materias");
const triangulo = document.querySelector(".botao-triangulo");
botaoMenu.addEventListener("click", () => {
  botaoMenu.classList.toggle("mostrando");
  materias.classList.toggle("mostrar");
  triangulo.classList.toggle("triangulo-rotate");
});

const menuOpcoes = document.querySelectorAll(".materias button");
const secoes = document.querySelectorAll(".seção-materia");

secoes.forEach((secao) => {
  if (!secao.querySelector("div")) {
    let secaoVazia = `
      <div class="item" style="justify-content: center;text-align: center;">
        <span>Não há nenhuma tarefa marcada.</span>
      </div>
    `;
    secao.classList.toggle("mostrar");
    secao.classList.toggle("esconder");
    secao.innerHTML = secao.innerHTML + secaoVazia;
  }
});

menuOpcoes.forEach((opcao) => {
  opcao.addEventListener("click", (botao) => {
    let botaoClicado = botao.target.value;

    if (botaoClicado == "mtd") {
      secoes.forEach((secao) => {
        if (!secao.classList.contains("mostrar")) {
          secao.classList.toggle("esconder");
          secao.classList.toggle("mostrar");
        }

        if (!secao.querySelector("div")) {
          secao.classList.toggle("mostrar");
          secao.classList.toggle("esconder");
        }

        botaoMenu.classList.toggle("mostrando");
        materias.classList.toggle("mostrar");
        triangulo.classList.toggle("triangulo-rotate");
      });
    } else {
      secoes.forEach((secao) => {
        let materiaSecao = secao.classList[0];

        if (!secao.classList.contains("esconder")) {
          secao.classList.toggle("mostrar");
          secao.classList.toggle("esconder");
        }

        if (materiaSecao == botaoClicado) {
          secao.classList.toggle("esconder");
          secao.classList.toggle("mostrar");

          botaoMenu.classList.toggle("mostrando");
          materias.classList.toggle("mostrar");
          triangulo.classList.toggle("triangulo-rotate");
        }
      });
    }
  });
});

const agendaFormulario = document.querySelector(".agenda-pessoal");
const agenda = new Agenda(agendaFormulario);
const formulario = document.querySelector(".form-add-elemento");

agenda.carregarDados();
agenda.iniciarAgenda();

function mostrarErro(mensagem) {
  const error = document.querySelector(".erro");

  error.style.transform = "translateY(0px)";
  error.style.opacity = ".7";
  error.classList.add("mostrar-erro");
  error.innerHTML = mensagem;
}

const botaoSubmit = document.querySelector(".botao-submit") 

botaoSubmit.addEventListener("click", () => {
  let erro = document.querySelector(".erro");
  erro.classList.remove("mostrar-erro");

  const titulo = formulario.querySelector(".titulo").value;
  const data = formulario.querySelector(".data").value;

  if (agenda.elementoExiste(titulo)) {
    mostrarErro("Agendamento já existe.");
    return false;
  
  } else  if (!titulo) {
    mostrarErro("Você precisa colocar um título.");
    return false;

  } else if (!data) {
    mostrarErro("Você precisa definir uma data.");
    return false;

  } else {
    erro.classList.remove("mostrar-erro");

    String(data);
    String(titulo)
    agenda.adicionarItem(titulo, data);
  }
})
