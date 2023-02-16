const data = new Date()
const hojeDia = ("0" + data.getDate()).slice(-2)
const hojeMes = ("0" + (data.getMonth() + 1)).slice(-2)
const dataHeader = document.querySelector(".hoje")
dataHeader.innerHTML = `${hojeDia}/${hojeMes}`

const botaoMenu = document.querySelector(".botao-menu")
const materias = document.querySelector(".materias")
const triangulo = document.querySelector(".botao-triangulo")
botaoMenu.addEventListener("click", () => {
    materias.classList.toggle("mostrar");
    triangulo.classList.toggle("triangulo-rotate");
})

const menuOpcoes = document.querySelectorAll(".materias button")
const secoes = document.querySelectorAll(".seção-materia")

menuOpcoes.forEach(opcao => {
    opcao.addEventListener("click", botao => {
        let botaoClicado = botao.target.value

        if (botaoClicado == "mtd") {
            secoes.forEach(secao => {
                if (!secao.classList.contains("mostrar")){
                    secao.classList.toggle("esconder")
                    secao.classList.toggle("mostrar")
                }
                materias.classList.toggle("mostrar");
                triangulo.classList.toggle("triangulo-rotate");
            })
        } else {
            secoes.forEach(secao => {
                let materiaSecao = secao.classList[0]
    
                if (!secao.classList.contains("esconder")){
                    secao.classList.toggle("mostrar")
                    secao.classList.toggle("esconder")
                }
    
                if (materiaSecao == botaoClicado) {
                    secao.classList.toggle("esconder")
                    secao.classList.toggle("mostrar")
                    materias.classList.toggle("mostrar");
                    triangulo.classList.toggle("triangulo-rotate");
                }
            });
        }
    })
});

secoes.forEach(secao => {   
    if (!secao.querySelector("div")) {
        secao.classList.toggle("mostrar")
        secao.classList.toggle("esconder")
    }
})




















// class agendaMateria {
//     constructor(materia) {
//         this.materia = materia
//     }
// }

// const lpb = new agendaMateria("lpb")
// const mat = new agendaMateria("mat")
// const fis = new agendaMateria("fis")
// const qui = new agendaMateria("qui")
// const bio = new agendaMateria("bio")
// const his = new agendaMateria("his")
// const geo = new agendaMateria("geo")
// const fil = new agendaMateria("fil")
// const soc = new agendaMateria("soc")
// const edf = new agendaMateria("edf")
// const bdd = new agendaMateria("bdd")
// const poo = new agendaMateria("bdd")
// const aps = new agendaMateria("aps")