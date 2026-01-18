import { missoesFinalizadasPersonagem } from "../../personagem/missao/missoesFinalizadas.js";
import { questLogPersonagem } from "../../personagem/missao/questLog.js";
import { completarMissao } from "../completar/completarMissao.js";
import { dialogosNpcs } from "../dialogos/dialogoNpcs.js";
import { darMissao } from "../missoes/darMissao.js";

export function interagirNpcs(npcAtual) {
    // Verifica se tem missão para completar com este NPC
    if (completarMissao(npcAtual)) {
        return
    }
    
    // Verifica se o personagem já finalizou a missão
    let missaoFinalizadaAuxiliar = false
    for (let i = 0; i < npcAtual.quests.length; i++) {
        for (let saga_missaoFinalizada of missoesFinalizadasPersonagem) {
            if (npcAtual.quests[i].saga == saga_missaoFinalizada.nomeSaga) {

                for (let missaoFinalizada of saga_missaoFinalizada.missoes) {
                    if (missaoFinalizada.nomeMissao == npcAtual.quests[i].missao) {
                        missaoFinalizadaAuxiliar = true
                    }
                }
            }
        }
    }
    
    if (missaoFinalizadaAuxiliar) {
        console.log('Personagem já finalizou essa missão')
    } else {
        console.log('NÃO FINALIZOU')

        // Verifica se a missão está no questLog
        let missaoAtualQuestLog = false 
        for (let i = 0; i < npcAtual.quests.length; i++) {
            for (let saga_missaoQuestLog of questLogPersonagem) {
                if (npcAtual.quests[i].saga == saga_missaoQuestLog.nomeSaga) {
                    for (let missaoQuestLog of saga_missaoQuestLog.missoes) {
                        if (npcAtual.quests[0].missao == missaoQuestLog.nomeMissao) {
                            missaoAtualQuestLog = true
                        }
                    }
                }
            }
        }

        if (missaoAtualQuestLog) {
            console.log('Missão no questLog')
            alert('Você já pegou a missão.')
        } else {
            console.log('Não pegou a missão ainda')
            criarDialogo(npcAtual, 0)
        }
    }
}

export function criarDialogo(npcAtual, dialogoAtual, dialogosPossiveis = dialogosNpcs) {
    // Identificação do diálogo
    let missaoAtualDialogo = ''
    let dialogoMissao = ''
    let firstDialogo = true
    for (let i = 0; i < npcAtual.dialogo.length; i++) {
        if (firstDialogo) {
            for (let sagasDialogosNpc of dialogosPossiveis) {
                if (sagasDialogosNpc.nomeSaga == npcAtual.dialogo[i].saga) {
                    for (let missoesSagasDialogosNpc of sagasDialogosNpc.missoes) {
                        if (missoesSagasDialogosNpc.nomeMissao == npcAtual.dialogo[i].missao) {
                            missaoAtualDialogo = missoesSagasDialogosNpc
                            dialogoMissao = missoesSagasDialogosNpc.dialogos
                            firstDialogo = false
                        }
                    }
                }
            }
        }
    }

    let containerDialogo = document.querySelector('.contentAbsolute')
    if (containerDialogo.style.display == 'block') {
        return
    }

    let arrayDialogos = []
    for (let i = 0; i < dialogoMissao.length; i++) {
        // Criação do article, que vai receber todo o diálogo
        let articleDialogo = document.createElement('article')
        articleDialogo.classList.add('dialogoNpc')
        articleDialogo.style.margin = '0.8rem'
        articleDialogo.style.color = dialogoMissao[i].corTextoNpc
        articleDialogo.style.fontSize = '1.1rem'
        articleDialogo.style.fontFamily = 'var(--FontItens2)'
    
        // Criação do nome do Npc
        let nameNpcDialogo = document.createElement('span')
        nameNpcDialogo.classList.add('nameNpc')
        nameNpcDialogo.textContent = dialogoMissao[i].nomeNpc
        nameNpcDialogo.style.color = dialogoMissao[i].corNomeNpc
        
        // Criação do texto do Npc
        let textNpcDialogo = document.createElement('span')
        textNpcDialogo.classList.add('textNpc')
        textNpcDialogo.textContent = dialogoMissao[i].textoNpc
        
        // Criação divs repostas
        let divRespostas = document.createElement('div')
        divRespostas.classList.add('respostas')

        // Criação da respostas SIM
        let spanAccept = document.createElement('span')
        dialogoAtual == arrayDialogos.length ? spanAccept.classList.add('accept') :
        spanAccept.classList.add('next')
        dialogoAtual == arrayDialogos.length ? spanAccept.textContent = 'Aceitar - pressione c' : spanAccept.textContent = 'Continuar - pressione c'

        // Criação da resposta NÃO
        let spanDeny = document.createElement('span')
        spanDeny.classList.add('fechar')
        spanDeny.textContent = 'Fechar - pressione r'

        divRespostas.appendChild(spanAccept)
        divRespostas.appendChild(spanDeny)

        // Criação de um br
        let tagBr = document.createElement('br')
        let tagBr2 = document.createElement('br')
        let tagBr3 = document.createElement('br')

        articleDialogo.appendChild(nameNpcDialogo)
        articleDialogo.appendChild(textNpcDialogo)
        articleDialogo.appendChild(tagBr)
        articleDialogo.appendChild(tagBr2)
        articleDialogo.appendChild(divRespostas)
        articleDialogo.appendChild(tagBr3)
        
        arrayDialogos.push(articleDialogo)
    }
    
    containerDialogo.style.display = 'block'
    containerDialogo.appendChild(arrayDialogos[dialogoAtual])
    console.log(dialogosPossiveis)
    if (missaoAtualDialogo.nomeMissao.slice(0, 11) != 'Recompensa:') {
        if (dialogoAtual == (arrayDialogos.length - 1)) {
    
            function eventoRespostasDialogo(ev) {
                if (ev.key.toLowerCase() == 'c') {
                    darMissao(npcAtual)
                    containerDialogo.replaceChildren()
                    containerDialogo.style.display = 'none'
                    removeEventListener('keyup', eventoRespostasDialogo)
                } else if (ev.key.toLowerCase() == 'r') {
                    containerDialogo.replaceChildren()
                    containerDialogo.style.display = 'none'
                    removeEventListener('keyup', eventoRespostasDialogo)
                }
            }
    
            addEventListener('keyup', eventoRespostasDialogo)
        } else {
    
            function eventoRespostasDialogo(ev) {
                if (ev.key.toLowerCase() == 'c') {
                    containerDialogo.replaceChildren()
                    criarDialogo(npcAtual, dialogoAtual + 1)
                    removeEventListener('keyup', eventoRespostasDialogo)
                } else if (ev.key.toLowerCase() == 'r') {
                    containerDialogo.replaceChildren()
                    containerDialogo.style.display = 'none'
                    removeEventListener('keyup', eventoRespostasDialogo)
                }
            }
            
            addEventListener('keyup', eventoRespostasDialogo)
        }
    } else {
        if (dialogoAtual == (arrayDialogos.length - 1)) {
    
            function eventoRespostasDialogo(ev) {
                if (ev.key.toLowerCase() == 'c') {
                    containerDialogo.replaceChildren()
                    containerDialogo.style.display = 'none'
                    removeEventListener('keyup', eventoRespostasDialogo)
                } else if (ev.key.toLowerCase() == 'r') {
                    containerDialogo.replaceChildren()
                    containerDialogo.style.display = 'none'
                    removeEventListener('keyup', eventoRespostasDialogo)
                }
            }
    
            addEventListener('keyup', eventoRespostasDialogo)
        } else {
    
            function eventoRespostasDialogo(ev) {
                if (ev.key.toLowerCase() == 'c') {
                    containerDialogo.replaceChildren()
                    criarDialogo(npcAtual, dialogoAtual + 1)
                    removeEventListener('keyup', eventoRespostasDialogo)
                } else if (ev.key.toLowerCase() == 'r') {
                    containerDialogo.replaceChildren()
                    criarDialogo(npcAtual, dialogoAtual + 1)
                    removeEventListener('keyup', eventoRespostasDialogo)
                }
            }
            
            addEventListener('keyup', eventoRespostasDialogo)
        }
    }
    
}