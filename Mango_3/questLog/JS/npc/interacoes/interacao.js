import { missoesFinalizadasPersonagem } from "../../personagem/missao/missoesFinalizadas.js";
import { questLogPersonagem } from "../../personagem/missao/questLog.js";
import { dialogosNpcMisterioso } from "../dialogos/dialogoNpcs.js";
import { darMissao } from "../missoes/darMissao.js";

export function interagirNpcs(npcAtual) {
    // Verifica se o personagem já finalizou a missão
    let missaoFinalizada = false
    for (let i = 0; i < npcAtual.quests.length; i++) {
        for (let saga_missaoFinalizada of missoesFinalizadasPersonagem) {
            if (npcAtual.quests[i].saga == saga_missaoFinalizada.nomeSaga) {

                for (let missaoFinalizada of saga_missaoFinalizada.missoes) {
                    if (missaoFinalizada.nomeMissao == npcAtual.quests[i].missao) {
                        missaoFinalizada = true
                    }
                }
            }
        }
    }
    
    if (missaoFinalizada) {
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
            // Fazer a verificação se ele já completou a missão. FAZERRRRRRRRRR
        } else {
            console.log('Não pegou a missão ainda')
            criarDialogo(npcAtual, 0)
        }
    }
}

function criarDialogo(npcAtual, dialogoAtual) {
    // Identificação do diálogo
    let dialogoMissao = ''
    for (let sagasMisteriosos of dialogosNpcMisterioso) {
        if (sagasMisteriosos.nomeSaga == npcAtual.quests[0].saga) {
            for (let missoesSagasMisteriosos of sagasMisteriosos.missoes) {
                if (missoesSagasMisteriosos.nomeMissao == npcAtual.quests[0].missao) {
                    dialogoMissao = missoesSagasMisteriosos.dialogos
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
    
}