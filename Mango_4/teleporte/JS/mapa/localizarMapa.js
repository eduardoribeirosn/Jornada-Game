import { locsItemsMapa } from "./locs.js";

export function localizarMapa() {
    for (let local in locsItemsMapa) {
        for (let itemLocal of locsItemsMapa[local]) {
            if (itemLocal.nome == 'Personagem') {
                return locsItemsMapa[local]
            }
        }
    }
}

export function localizarNomeMapa() {
    for (let local in locsItemsMapa) {
        for (let itemLocal of locsItemsMapa[local]) {
            if (itemLocal.nome == 'Personagem') {
                return local
            }
        }
    }
}

export function attItensMapa() {
    let infoLocsItemsMapa = localizarMapa()
    let mapaAtual = document.getElementById(`${localizarNomeMapa()}`)

    // Limpar mapa Atual
    mapaAtual.replaceChildren()

    let arrayLocsItemsMapa = []
    for (let itemLocal of infoLocsItemsMapa) {
        let itemLocsItemsMapa = document.createElement('div')
        if (itemLocal.nome == 'Personagem') {
            itemLocsItemsMapa = document.createElement('div')
        } else {
            itemLocsItemsMapa = document.createElement('span')
            itemLocsItemsMapa.style.gridColumn = itemLocal.x
            itemLocsItemsMapa.style.gridRow = itemLocal.y
        }

        itemLocsItemsMapa.id = `id${itemLocal.nome}`
        itemLocsItemsMapa.classList.add(itemLocal.skinClass)

        arrayLocsItemsMapa.push(itemLocsItemsMapa)
    }

    for (let newItemAdd of arrayLocsItemsMapa) {
        mapaAtual.appendChild(newItemAdd)
    }
}