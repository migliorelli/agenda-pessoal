var Agenda = class Agenda {
  agendamentos = []

  constructor(agenda) {
    this.agenda = agenda;
    this.agendaContainer = this.agenda.querySelector(".agendamentos");

    this.formulario = this.agenda.querySelector("form")
    this.formulario.addEventListener("change", () => this.#atualizar())

    this.dados = {}

    this.carregar();

  }

  adicionar(titulo, data) {
    const elemento = {
      "titulo": titulo,
      "data": data,
    };

    this.#incorporarElemento(elemento);
    this.salvarElemento(elemento)
  }

  #incorporarElemento(elemento) {
    const novaDiv = document.createElement("div");
    const tituloDiv = elemento.titulo;
    let dataDiv = elemento.data;
    const [anoDiv, mesDiv, diaDiv] = dataDiv.split("-")
    dataDiv = `${diaDiv}/${mesDiv}/${anoDiv}`

    novaDiv.setAttribute("class", "item-background");
    novaDiv.innerHTML = `   
      <div class="agenda-item">
        <h3>${tituloDiv}</h3>
        <span>${dataDiv}</span>
      </div>
    `;
    this.agendaContainer.append(novaDiv);
  }

  salvarElemento(elemento) {
    const titulo = elemento.titlulo

    this.agendamentos = [...this.agendamentos, titlulo]
    this.dados = {...this.dados, elemento }
  }

  carregar() {
    const temDados = Object.keys(this.dados).lenght > 0
    if (!temDados) return

    for (let elemento of this.dados) {
      this.#incorporarElemento(elemento)
    }
  }

  definirDados(dados){
    if (!dados) {
      throw "Não tem dado suficiente nessa porra :D"
    }

    this.dados = dados
  }

  #atualizar() {
    const formData = new FormData(this.formulario)
    const novosDados = []
    for (let elemento of this.agendamentos) {
      novosDados[elemento] = formData.getAll(elemento)
    }

    this.definirDados(novosDados)
  }
};