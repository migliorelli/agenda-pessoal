var Agenda = class Agenda {
  constructor(agenda) {
    this.agenda = agenda;
    this.agendaContainer = this.agenda.querySelector(".agendamentos");

    this.dadosAgenda = {};
    this.listaTemas = {
      roxo: { 
        "--cor-fundo": "#28243c",
        "--cor-principal-1": "#7949dd",
        "--cor-principal-2": "#b19ae4",
        "--cor-principal-3": "#8f06ff67",
        "--cor-texto": "white",
        "--cor-texto-botoes": "white",
        "--cor-texto-container": "black",
        "--cor-container": "white",
        "--cor-filtro": "invert(13%) sepia(25%) saturate(864%) hue-rotate(210deg) brightness(96%) contrast(96%)" },
      roxoClaro: { 
        "--cor-fundo": "#ececec",
        "--cor-principal-1": "#7949dd", 
        "--cor-principal-2": "#b19ae4",
        "--cor-principal-3": "#8f06ff67",
        "--cor-texto": "black",
        "--cor-texto-botoes": "white",
        "--cor-texto-container": "black",
        "--cor-container": "white",
        "--cor-filtro": "invert(92%) sepia(56%) saturate(12%) hue-rotate(220deg) brightness(118%) contrast(85%)"},
      escuro: {
        "--cor-fundo": "#0d1017",
        "--cor-principal-1": "#d4993a",
        "--cor-principal-2": "#d4b684",
        "--cor-principal-3": "#49424e67",
        "--cor-texto": "white",
        "--cor-texto-botoes": "white",
        "--cor-texto-container": "black",
        "--cor-container": "white",
        "--cor-filtro": "invert(4%) sepia(6%) saturate(4849%) hue-rotate(184deg) brightness(96%) contrast(94%)" }
    }
  }

  carregarDados(tema = "roxo") {
    if (window.localStorage.length == 0) {
      localStorage.setItem("MIGLIORELLI@agenda", `{tema: "${tema}"}`);
      this.definirDados({tema: tema});
      return;
    }

    let Dados = JSON.parse(localStorage.getItem("MIGLIORELLI@agenda"));

    if (Dados == null) {
      throw "não tem dado";
    } else {
      for (let item in Dados) {
        if (item === "tema") {
          continue
        }

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
      if (titulo == "tema") {
        this.mudarTema(item)
        continue
      }

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

    this.atualizarDados();
  }

  atualizarDados() {
    const stringDados = JSON.stringify(this.dadosAgenda);

    localStorage.setItem("MIGLIORELLI@agenda", stringDados);
  }

  limparDados() {
    const temaAtual = this.dadosAgenda['tema']
    localStorage.clear();
    this.agendaContainer.innerHTML = "";

    this.carregarDados(temaAtual);
    this.atualizarDados();
    this.iniciarAgenda();
  }

  mudarTema(tema = null) {
    if (tema) {
      
      const temas = this.listaTemas
      const temaIndex = Object.keys(temas).indexOf(tema)
      const temaNome = Object.keys(temas)[temaIndex]
      const colocarTema = temas[temaNome]
      const root = document.querySelector(":root")

      for (let cor in colocarTema) {
        root.style.setProperty(cor, colocarTema[cor])
      }
      
      this.dadosAgenda['tema'] = tema
      this.atualizarDados()
      return
    }
    
    const root = document.querySelector(":root")
    const temas = this.listaTemas
    const temaAtual = String(this.dadosAgenda['tema'])
    const temaAtualIndex = Object.keys(temas).indexOf(temaAtual)

    const proximoTemaIndex = temaAtualIndex + 1 > Object.keys(temas).length - 1 ? 0 : temaAtualIndex + 1
    const proximoTemaNome = Object.keys(temas)[proximoTemaIndex]
    const proximoTema = temas[proximoTemaNome]
    this.dadosAgenda['tema'] = proximoTemaNome

    for (let cor in proximoTema) {
      root.style.setProperty(cor, proximoTema[cor])
    }

    this.dadosAgenda['tema'] = proximoTemaNome
    this.atualizarDados()
  }
};