import { localizarMapa } from "../mapa/localizarMapa.js"
import { teleportarPersonagem } from "../mapa/teleporte.js"
import { interagirNpcs } from "../npc/interacoes/interacao.js"
import { urlSkinsPersonagem } from "../personagem/skin.js"

export function interagirAll() {
    let infoLocsItemsMapa = localizarMapa()
    
    let ladoInteracao = descobrirLado()

    let posXPersonagemInteracao = infoLocsItemsMapa[0].x
    let posYPersonagemInteracao = infoLocsItemsMapa[0].y

    
    // Caso esteja olhando para frente/cima
    if (ladoInteracao == 'frente') {
        for (let i = 1; i < infoLocsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == infoLocsItemsMapa[i].x && posYPersonagemInteracao == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(infoLocsItemsMapa[i])
            } else if (posXPersonagemInteracao == infoLocsItemsMapa[i].x && (posYPersonagemInteracao + 1) == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].teleporte) {
                console.log('É um teleporte')
                let localT = infoLocsItemsMapa[i].infoTeleporte.localTeleporte
                let posXT = infoLocsItemsMapa[i].infoTeleporte.posXTeleporte
                let posYT = infoLocsItemsMapa[i].infoTeleporte.posYTeleporte
                teleportarPersonagem(localT, posYT, posXT)
            }
        }
    } else if (ladoInteracao == 'esquerda') {
        for (let i = 1; i < infoLocsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == (infoLocsItemsMapa[i].x + 1) && posYPersonagemInteracao == (infoLocsItemsMapa[i].y - 1) && infoLocsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(infoLocsItemsMapa[i])
            } else if (posXPersonagemInteracao == infoLocsItemsMapa[i].x && (posYPersonagemInteracao + 1) == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].teleporte) {
                console.log('É um teleporte')
                let localT = infoLocsItemsMapa[i].infoTeleporte.localTeleporte
                let posXT = infoLocsItemsMapa[i].infoTeleporte.posXTeleporte
                let posYT = infoLocsItemsMapa[i].infoTeleporte.posYTeleporte
                teleportarPersonagem(localT, posYT, posXT)
            }
        }
    } else if (ladoInteracao == 'direita') {
        for (let i = 1; i < infoLocsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == (infoLocsItemsMapa[i].x - 1) && posYPersonagemInteracao == (infoLocsItemsMapa[i].y - 1) && infoLocsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(infoLocsItemsMapa[i])
            } else if (posXPersonagemInteracao == infoLocsItemsMapa[i].x && (posYPersonagemInteracao + 1) == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].teleporte) {
                console.log('É um teleporte')
                let localT = infoLocsItemsMapa[i].infoTeleporte.localTeleporte
                let posXT = infoLocsItemsMapa[i].infoTeleporte.posXTeleporte
                let posYT = infoLocsItemsMapa[i].infoTeleporte.posYTeleporte
                teleportarPersonagem(localT, posYT, posXT)
            }
        }
    } else if (ladoInteracao == 'tras') {
        for (let i = 1; i < infoLocsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == infoLocsItemsMapa[i].x && posYPersonagemInteracao == (infoLocsItemsMapa[i].y - 2) && infoLocsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(infoLocsItemsMapa[i])
            } else if (posXPersonagemInteracao == infoLocsItemsMapa[i].x && (posYPersonagemInteracao + 1) == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].teleporte) {
                console.log('É um teleporte')
                let localT = infoLocsItemsMapa[i].infoTeleporte.localTeleporte
                let posXT = infoLocsItemsMapa[i].infoTeleporte.posXTeleporte
                let posYT = infoLocsItemsMapa[i].infoTeleporte.posYTeleporte
                teleportarPersonagem(localT, posYT, posXT)
            }
        }
    }
}

function descobrirLado() {
    let skin = document.documentElement.style.getPropertyValue('--imagePersonagem')
    
    skin = skin.slice(4, -1)

    let ladoInteracaoDescobrir = 'vazio'
    if (ladoInteracaoDescobrir == 'vazio') {
        for (let i = 0; i < urlSkinsPersonagem.direita.length; i++) {
            if (skin == urlSkinsPersonagem.direita[i]) {
                ladoInteracaoDescobrir = 'direita'
            }
        }
    }
    if (ladoInteracaoDescobrir == 'vazio') {
        for (let i = 0; i < urlSkinsPersonagem.esquerda.length; i++) {
            if (skin == urlSkinsPersonagem.esquerda[i]) {
                ladoInteracaoDescobrir = 'esquerda'
            }
        }
    }
    if (ladoInteracaoDescobrir == 'vazio') {
        for (let i = 0; i < urlSkinsPersonagem.frente.length; i++) {
            if (skin == urlSkinsPersonagem.frente[i]) {
                ladoInteracaoDescobrir = 'frente'
            }
        }
    }
    if (ladoInteracaoDescobrir == 'vazio') {
        for (let i = 0; i < urlSkinsPersonagem.tras.length; i++) {
            if (skin == urlSkinsPersonagem.tras[i]) {
                ladoInteracaoDescobrir = 'tras'
            }
        }
    }

    return ladoInteracaoDescobrir
}