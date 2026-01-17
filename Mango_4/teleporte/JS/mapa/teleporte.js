import { attItensMapa, localizarMapa, localizarNomeMapa } from "./localizarMapa.js";
import { locsItemsMapa } from "./locs.js";

export function teleportarPersonagem(newLocation, y, x) {
    let mapaAntigo = localizarNomeMapa()
    let infoLocsItemsMapa = localizarMapa()

    // Passou o personagem para o outro mapa no "VIRTUAL"
    locsItemsMapa[newLocation].unshift(infoLocsItemsMapa[0])

    infoLocsItemsMapa.shift()

    // Trocou a posição dele
    // locsItemsMapa[newLocation][0].x = x
    // locsItemsMapa[newLocation][0].y = y
    document.documentElement.style.setProperty('--posYPersonagem', y)
    document.documentElement.style.setProperty('--posXPersonagem', x)

    // Trocou o mapa na Tela
    document.getElementById(mapaAntigo).style.display = 'none'
    document.getElementById(newLocation).style.display = 'grid'

    attItensMapa()
}