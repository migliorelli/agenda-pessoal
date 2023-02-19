var Agenda = class Agenda {
  constructor(agenda) {
    this.agenda = agenda;
    this.agendaContainer = this.agenda.querySelector('.agendamentos');
    
    this.dadosAgenda = {};
  }

  carregarDados() {
    if (window.localStorage.length == 0 ){
      localStorage.setItem('MIGLIORELLI@agenda', '{}');
      this.definirDados({})
      return
    }

    let Dados = JSON.parse(localStorage.getItem('MIGLIORELLI@agenda'));

    if (Dados == null) {
      throw 'não tem dado'
    } else {
      this.definirDados(Dados);
    }
  }

  definirDados(dados) {
    if (!dados) {
      throw 'Não tem dado suficiente nessa porra :D';
    }

    this.dadosAgenda = dados;
  }

  iniciarAgenda() {
    const temDados = Object.keys(this.dadosAgenda).length > 0;
    if (!temDados) return;

    for (let titulo in this.dadosAgenda) {
      let data = this.dadosAgenda[titulo]

      this.#incorporarElemento(String(titulo), String(data))
    }
  }

  #incorporarElemento(titulo, data) {
    const novaDiv = document.createElement('div');
    const [anoDiv, mesDiv, diaDiv] = data.split('-');
    const dataDiv = `${diaDiv}/${mesDiv}/${anoDiv}`;

    novaDiv.setAttribute('class', 'item-background');
    novaDiv.setAttribute('id', titulo);
    novaDiv.innerHTML = `   
      <div class="agenda-item">
        <h3>${titulo}</h3>
        <span>${dataDiv}</span>
      </div>
      <div class="botao-remover">
        <button onclick="agenda.removerItem(this.value)" value="${titulo}">Remover</button>
      </div>
    </div> 
    `;

    this.agendaContainer.append(novaDiv);
  }

  adicionarItem(titulo, data) {
    this.dadosAgenda[titulo] = data
    this.#incorporarElemento(titulo, data);

    this.atualizarDados();
  }

  elementoExiste(tituloElemento) {
    if (tituloElemento in this.dadosAgenda) {
      return true
    }

    return false
  }

  removerItem(item){
    for (let titulo in this.dadosAgenda) {
      if (String(titulo) == String(item)) {
        delete this.dadosAgenda[titulo]
      }
    }

    this.agendaContainer.innerHTML = ''
    this.atualizarDados()
    this.iniciarAgenda()
  }

  atualizarDados() {
    const stringDados = JSON.stringify(this.dadosAgenda);

    localStorage.setItem('MIGLIORELLI@agenda', stringDados);
  }

  limparDados() {
    localStorage.clear()
    this.agendaContainer.innerHTML = ''
    
    this.carregarDados()
    this.atualizarDados()
    this.iniciarAgenda()
  }
};
