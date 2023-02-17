var Agenda = class Agenda {
  classDados = { 'dadosAgenda': [] };

  constructor(agenda) {
    this.agenda = agenda;
    this.agendaContainer = this.agenda.querySelector('.agendamentos');

    this.formulario = this.agenda.querySelector('form');
  }

  carregar() {
    if (window.localStorage.length == 0 ){
      localStorage.setItem('titulos', '{"infoTitulos": new Array()}');
      localStorage.setItem('datas', '{"infoDatas": new Array()}');
      this.definirDados({})
      return
    }

    console.log(localStorage)
    const localStorageTitulo = localStorage.getItem('titulos')
    const localStorageData = localStorage.getItem('datas')


    let localTitulos = JSON.parse(localStorageTitulo);
    let localDatas = JSON.parse(localStorageData)

    localTitulos.infoTitulos = ['argg', 'ooorg']
    localDatas.infoDatas = ['02', '03']

    console.log('carregar() => localTitulos:', localTitulos)

    if (localTitulos.infoTitulos == null) {
      this.definirDados({})
    } else {
      localTitulos = localTitulos.infoTitulos;
      localDatas = localDatas.infoDatas;
  
      let Dados = [];
  
      for (let i = 0; i < localTitulos.infoTitulos.lenght; i++) {
        const objTitulo = String(localTitulos[i]);
        const objData = String(localDatas[i]);
        const obj = {
          "titulo": objTitulo,
          "data": objData,
        };
  
        Dados.push(obj);
      }
  
      console.log('Carregar() => ', Dados);
      this.definirDados(Dados);
    }
  }

  definirDados(dados) {
    if (!dados) {
      throw 'Não tem dado suficiente nessa porra :D';
    }

    console.log('definirDados() => ', dados);

    this.classDados['dadosAgenda'] = dados;

    console.log('definirDados() => ', dados);
  }

  iniciar() {
    const temDados = Object.keys(this.classDados['dadosAgenda']).lenght > 0;
    if (!temDados) return;

    this.classDados['dadosAgenda'].forEach((dadoObj) => {
      this.#incorporarElemento(dadoObj);
    });
  }

  #incorporarElemento(elemento) {
    const novaDiv = document.createElement('div');
    const tituloDiv = elemento.titulo;
    let dataDiv = elemento.data;
    const [anoDiv, mesDiv, diaDiv] = dataDiv.split('-');
    dataDiv = `${diaDiv}/${mesDiv}/${anoDiv}`;

    novaDiv.setAttribute('class', 'item-background');
    novaDiv.innerHTML = `   
      <div class='agenda-item'>
        <h3>${tituloDiv}</h3>
        <span>${dataDiv}</span>
      </div>
    `;
    this.agendaContainer.append(novaDiv);
  }

  adicionar(tituloElemento, dataElemento) {
    const elemento = {
      titulo: tituloElemento,
      data: dataElemento,
    };

    this.salvarElemento(elemento);
    this.#incorporarElemento(elemento);
  }

  salvarElemento(elemento) {
    // this.classDados['dadosAgenda'].push(elemento);
    let salvarDados = Array(this.classDados['dadosAgenda'])
    salvarDados = [...salvarDados, elemento]
    this.armazenarDados();
  }

  armazenarDados() {
    let quantidadeAgendamentos = this.classDados['dadosAgenda'].lenght;
    let titulos = [];
    let datas = [];

    for (let i; i < quantidadeAgendamentos; i++) {
      const objAtual = this.classDados['dadosAgenda'][i];
      const titulo = objAtual['titulo'];
      const data = objAtual['data'];

      titulos.push(titulo);
      datas.push(data);
    }

    console.log('armazenarDados() => Titulos array:', titulos);
    console.log('armazenarDados() => Datas array:', datas);

    titulos = { "infoTitulos": titulos };
    datas = { "infoDatas": datas };

    console.log('armazenarDados() => Titulos obj:', titulos);
    console.log('armazenarDados() => Datas obj:', datas);

    const stringTitulos = JSON.stringify(titulos);
    const stringDatas = JSON.stringify(datas);

    localStorage.setItem('titulos', stringTitulos);
    localStorage.setItem('datas', stringDatas);

    console.log('armazenarDados() => Titulos stringify:', stringTitulos);
    console.log('armazenarDados() => Datas stringify:', stringDatas);
    console.log('Agenda => this.classDados:', this.classDados);
  }
};
