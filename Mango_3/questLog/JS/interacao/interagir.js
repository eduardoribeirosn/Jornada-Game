import { locsItemsMapa } from "../mapa/locs.js"
import { interagirNpcs } from "../npc/interacoes/interacao.js"
import { urlSkinsPersonagem } from "../personagem/skin.js"

export function interagirAll() {
    let ladoInteracao = descobrirLado()

    let posXPersonagemInteracao = locsItemsMapa[0].x
    let posYPersonagemInteracao = locsItemsMapa[0].y

    // Caso esteja olhando para frente/cima
    if (ladoInteracao == 'frente') {
        for (let i = 1; i < locsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == locsItemsMapa[i].x && posYPersonagemInteracao == locsItemsMapa[i].y && locsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(locsItemsMapa[i])
            } 
        }
    } else if (ladoInteracao == 'esquerda') {
        for (let i = 1; i < locsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == (locsItemsMapa[i].x + 1) && posYPersonagemInteracao == (locsItemsMapa[i].y - 1) && locsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(locsItemsMapa[i])
            } 
        }
    } else if (ladoInteracao == 'direita') {
        for (let i = 1; i < locsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == (locsItemsMapa[i].x - 1) && posYPersonagemInteracao == (locsItemsMapa[i].y - 1) && locsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(locsItemsMapa[i])
            } 
        }
    } else if (ladoInteracao == 'tras') {
        for (let i = 1; i < locsItemsMapa.length; i++) {
            // Verificar se há uma interação com NPC
            if (posXPersonagemInteracao == locsItemsMapa[i].x && posYPersonagemInteracao == (locsItemsMapa[i].y - 2) && locsItemsMapa[i].npc) {
                console.log('É um NPC')
                interagirNpcs(locsItemsMapa[i])
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