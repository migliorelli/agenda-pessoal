var Agenda = class Agenda {
  constructor(agenda) {
    this.agenda = agenda;
    this.agendamentos = this.agenda.querySelector(".agendamentos");

    this.config = {};
    this.dados = {};
    this.fontes = [
      '"Nunito", sans-serif',
      '"Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif',
      "Arial, Helvetica, sans-serif",
    ];
    this.temas = Temas;
  }

  carregarDados() {
    const dados = JSON.parse(localStorage.getItem("MIGLIORELLI@agendaDados"));
    const config = JSON.parse(localStorage.getItem("MIGLIORELLI@agendaConfig"));

    if (config === null && dados === null) {
      const configs = {
        usuario: 0,
        genero: 0,
        fonte: 0,
        tema: 0,
      };
      localStorage.setItem("MIGLIORELLI@agendaConfig", JSON.stringify(configs));
      this.definirDados({});
      this.definirConfig(configs);
      return;
    }

    this.definirDados(dados);
    this.definirConfig(config);
  }

  

  definirDados(dados) {
    if (dados && Object.keys(dados).length) {
      const Dados = Object.keys(dados).map((key) => dados[key]);
      Dados.sort((a, b) => new Date(a.data) - new Date(b.data));
      Dados.forEach((item) => {
        const titulo = item.titulo;
        this.dados[titulo] = item;
      });
    }

    this.iniciarAgenda();
  }

  definirConfig(config) {
    this.config = config;
    const { usuario, genero, fonte, tema } = config;

    const titulo = document.querySelector(".header-title h1");
    const generoRadios = document.querySelectorAll(
      '[name="config-usuario-genero"]'
    );
    const usuarioField = document.querySelector(
      '.config-usuario input[type="text"]'
    );

    if (usuario) {
      let prefixo;
      switch (genero) {
        case "1":
          prefixo = "do";
          generoRadios[0].checked = true;
          break;

        case "2":
          prefixo = "da";
          generoRadios[1].checked = true;
          break;

        default:
          prefixo = "de";
          break;
      }

      usuarioField.value = usuario;
      usuarioField.style.background = "var(--cor-principal-1)";
      titulo.innerHTML = `Agenda ${prefixo} <span>${usuario}</span>`;
      document.title = `Agenda ${prefixo} ${usuario}`;
    } else {
      usuarioField.style.background = "var(--cor-principal-2)";
      titulo.innerHTML = "Agenda <span>Pessoal</span>";
      document.title = "Agenda Pessoal";
    }

    const fonteBtn = document.getElementById(fonte);
    fonteBtn.checked = true;
    const Sfonte = this.fontes[fonte];

    const root = document.querySelector(":root");
    root.style.setProperty("--fonte", Sfonte);

    this.definirTema(tema);
    this.atualizarDados();
  }

  definirTema(temaID = "none") {
    const root = document.querySelector(":root");
    const temas = Object.keys(this.temas);
    const temaAtual = this.config.tema;
    let proxTema;
    let temaNome;
    let tema;

    if (temaID === "none") {
      proxTema = temaAtual + 1 > temas.length - 1 ? 0 : temaAtual + 1;
    } else {
      proxTema = temaAtual;
    }

    temaNome = temas[proxTema];
    tema = this.temas[temaNome];
    this.config.tema = proxTema;

    for (let cor in tema) root.style.setProperty(cor, tema[cor]);
    this.atualizarDados();
  }

  atualizarDados() {
    const dados = JSON.stringify(this.dados);
    const config = JSON.stringify(this.config);

    localStorage.setItem("MIGLIORELLI@agendaDados", dados);
    localStorage.setItem("MIGLIORELLI@agendaConfig", config);
  }

  iniciarAgenda() {
    const hoje = new Date().toLocaleDateString("pt-br").slice(0, -5);
    const dataHeader = document.querySelector(".data h3");
    dataHeader.innerHTML = hoje;
    this.agendamentos.innerHTML = "";

    const temDados = Object.keys(this.dados).length > 0;
    if (!temDados) return;

    const itens = Object.keys(this.dados);
    if (itens.length) {
      itens.forEach((key, index) => {
        let { titulo, desc, data, anot, checado } = this.dados[key];
        this.#incorporarItem(titulo, desc, data, anot, checado, index);
      });
    }
  }

  #incorporarItem(titulo, desc, data, anot, check, index) {
    const div = document.createElement("div");

    let Data = "";
    let Hora = "";
    if (data) {
      let [mes, dia, ano, horario] = data.split(" ");
      mes = Number(mes) < 10 ? `0${Number(mes) + 1}` : Number(mes) + 1;
      Data = `${dia}/${mes}/${ano}`;

      const [hora, minuto] = horario.split(":");
      if (Number(hora) && Number(minuto)) {
        Hora = `${hora}:${minuto}, `;
      }
    }
    let Checado = "";
    if (check) {
      Checado = "checked";
      div.classList.toggle("checado");
    }

    div.classList.add("item-background");
    div.setAttribute("index", index);

    div.innerHTML = `   
    <div class="agenda-item-titulo">
      <h3>${titulo}</h3>
    </div>
    <div class="agenda-item-descricao">
      ${desc ? `<div class="desc-div">${desc}</div>` : ""}
      <span>${Hora}${Data}</span>
    </div>
    <div class="botao-remover">
      <button onclick="agenda.removerItem(this.value)" value="${index}">Remover</button>
    </div>
    <div class="checkbox" >
      <label class="checkbox-label">
        <input type="checkbox" onchange="agenda.armazenarCheck(this)" value="${index}" ${Checado}>
        <span class="checkmark"></span>
      </label>
    </div>
    <textarea class="agenda-item-anot" spellcheck="false" placeholder="Anotações..." index=${index} oninput="agenda.salvarAnotacao(this)">${anot ? anot : ""}</textarea>
    `;

    this.agendamentos.append(div);
  }

  adicionarItem(titulo, desc, data, anot = "", checado = false) {
    this.dados[titulo] = { titulo, desc, data, anot, checado };

    this.atualizarDados();
    this.definirDados(this.dados);
  }

  removerItem(index) {
    const itens = Object.keys(this.dados);
    const item = itens[index];
    delete this.dados[item];

    this.atualizarDados();
    this.definirDados(this.dados);
  }

  itemExiste(titulo) {
    return titulo in this.dados;
  }

  limparDados() {
    this.dados = {};
    this.atualizarDados();
    this.definirDados(this.dados);
  }

  armazenarCheck(checkbox) {
    const itens = Object.keys(this.dados);
    const item = itens[checkbox.value];

    const div = this.agendamentos.querySelector(
      `div.item-background[index="${checkbox.value}"]`
    );

    if (checkbox.checked) {
      this.dados[item].checado = true;
      div.classList.add("checado");
    } else {
      this.dados[item].checado = false;
      div.classList.remove("checado");
    }

    this.atualizarDados();
  }

  salvarAnotacao(textarea) {
    const itens = Object.keys(this.dados)
    const item = itens[textarea.getAttribute("index")]
    const texto = textarea.value

    textarea.style.height = texto ? `${textarea.scrollHeight}px` : `40px`;

    this.dados[item].anot = texto
    this.atualizarDados()
  }

  copiarDados(botao) {
    botao.innerHTML = "Dados copiados";
    setTimeout(() => {
      botao.innerHTML = "Copiar dados";
    }, 5000);

    const dados = localStorage.getItem("MIGLIORELLI@agendaDados");
    const config = localStorage.getItem("MIGLIORELLI@agendaConfig");
    const copy = JSON.stringify({
      dados,
      config,
    });

    navigator.clipboard.writeText(copy)
  }

  fazerBackup() {
    const textField = document.querySelector(".novos-dados-txt");
    
    try {
      JSON.parse(textField.value)
    } catch (e) {
      textField.value = `"${textField.value.slice(0, 30)}"... NÃO É UM FORMATO VÁLIDO.`
      return false
    }

    this.limparDados();
    const dadosCopiados = JSON.parse(textField.value);
    const { dados, config } = dadosCopiados;
    localStorage.setItem("MIGLIORELLI@agendaDados", dados);
    localStorage.setItem("MIGLIORELLI@agendaConfig", config);

    textField.value = "";
    this.carregarDados();

    return true
  }

};
