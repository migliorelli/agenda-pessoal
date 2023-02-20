var Agenda = class Agenda {
  constructor(agenda) {
    this.agenda = agenda;
    this.agendaContainer = this.agenda.querySelector(".agendamentos");

    this.dadosAgenda = {};
  }

  carregarDados() {
    if (window.localStorage.length == 0) {
      localStorage.setItem("MIGLIORELLI@agenda", "{}");
      this.definirDados({});
      return;
    }

    let Dados = JSON.parse(localStorage.getItem("MIGLIORELLI@agenda"));

    if (Dados == null) {
      throw "não tem dado";
    } else {
      for (let item in Dados) {
        const checado = Object.keys(Dados[[item]])[1];
        if (!(checado in Dados[item])) {
          Dados[item]["checado"] = false;
        }
      }

      this.definirDados(Dados);
    }
  }

  definirDados(dados) {
    if (!dados) {
      throw "Não tem dado suficiente nessa porra :D";
    }

    this.dadosAgenda = dados;
  }

  iniciarAgenda() {
    const temDados = Object.keys(this.dadosAgenda).length > 0;
    if (!temDados) return;

    for (let titulo in this.dadosAgenda) {
      let item = this.dadosAgenda[titulo];
      let data = item["data"];
      let checado = item["checado"];

      this.#incorporarItem(String(titulo), String(data), Boolean(checado));
    }
  }

  #incorporarItem(titulo, data, checado) {
    const novaDiv = document.createElement("div");
    const [anoDiv, mesDiv, diaDiv] = data.split("-");
    const dataDiv = `${diaDiv}/${mesDiv}/${anoDiv}`;
    const taChecado = checado === false ? "" : "checked";

    novaDiv.setAttribute("class", "item-background");
    novaDiv.setAttribute("id", titulo);
    novaDiv.innerHTML = `   
    <div class="agenda-item">
      <h3>${titulo}</h3>
      <span>${dataDiv}</span>
    </div>
    <div class="botao-remover">
      <button onclick="agenda.removerItem(this.value)" value="${titulo}">Remover</button>
    </div>
    <div class="checkbox" >
      <label class="checkbox-label">
        <input type="checkbox" onchange="agenda.armazenarCheck(this)" value="${titulo}" ${taChecado}>
        <span class="checkmark"></span>
      </label>
    </div>
    `;

    this.agendaContainer.append(novaDiv);
  }

  adicionarItem(titulo, data) {
    this.dadosAgenda[titulo] = { data: data, checado: false };
    this.#incorporarItem(titulo, data, false);

    this.atualizarDados();
  }

  itemExiste(tituloItem) {
    if (tituloItem in this.dadosAgenda) {
      return true;
    }

    return false;
  }

  removerItem(item) {
    for (let titulo in this.dadosAgenda) {
      if (String(titulo) == String(item)) {
        delete this.dadosAgenda[titulo];
      }
    }

    this.agendaContainer.innerHTML = "";
    this.atualizarDados();
    this.iniciarAgenda();
  }

  armazenarCheck(checkbox) {
    for (let titulo in this.dadosAgenda) {
      if (String(checkbox.value) === String(titulo)) {
        if (checkbox.checked) {
          this.dadosAgenda[titulo]["checado"] = true;
        } else {
          this.dadosAgenda[titulo]["checado"] = false;
        }
      }
    }

    console.log(this.dadosAgenda);
    this.atualizarDados();
  }

  atualizarDados() {
    const stringDados = JSON.stringify(this.dadosAgenda);

    localStorage.setItem("MIGLIORELLI@agenda", stringDados);
  }

  limparDados() {
    localStorage.clear();
    this.agendaContainer.innerHTML = "";

    this.carregarDados();
    this.atualizarDados();
    this.iniciarAgenda();
  }
};
