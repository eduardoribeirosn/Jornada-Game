import { attQuestLogInteiro } from "../../../script.js";
import { attTelaInvPersonagem, invPersonagem, setNewInvPersonagem } from "../../personagem/inventario.js";
import { missoesFinalizadasPersonagem } from "../../personagem/missao/missoesFinalizadas.js";
import { questLogPersonagem, setNewQuestLogPersonagem } from "../../personagem/missao/questLog.js";
import { darRecompensa } from "../missoes/darRecompensa.js";

export function completarMissao(npcAtual) {
    for (let i = 0; i < questLogPersonagem.length; i++) {
        for (let j = 0; j < questLogPersonagem[i].missoes.length; j++) {
            let arrayObjetivosAuxiliar = []
            for (let k = 0; k < questLogPersonagem[i].missoes[j].objetivo.length; k++) {
                arrayObjetivosAuxiliar.push(questLogPersonagem[i].missoes[j].objetivo[k].completed)
                // let missaoCompletada = questLogPersonagem[i].missoes[j].objetivo[k].completed
                
            }

            let objetivosCompletados = true
            for (let objetivoAuxiliar of arrayObjetivosAuxiliar) {
                if (!objetivoAuxiliar) {
                    objetivosCompletados = false
                    stop
                }
            }
            if (objetivosCompletados) {
                if (questLogPersonagem[i].missoes[j].npcCompletar == npcAtual.nome.slice(4)) {
                    console.log('Missão completada')
                    // Tirar os itens caso a missão for do tipo "coletável"
                    for (let objetivoMissao of questLogPersonagem[i].missoes[j].objetivo) {
                        if (objetivoMissao.typeMission == 'coletável') {
                            for (let itemInvPersonagem of invPersonagem) {
                                if (itemInvPersonagem.nomeItem == objetivoMissao.objective) {
                                    if (itemInvPersonagem.quantidade == objetivoMissao.quantityMission) {
                                        // Excluir o Item do Inventário
                                        let arrayInvPersonagemAuxiliar = []
                                        for (let itemInvPersonagemAuxiliar of invPersonagem) {
                                            if (itemInvPersonagemAuxiliar != itemInvPersonagem) {
                                                arrayInvPersonagemAuxiliar.push(itemInvPersonagemAuxiliar)
                                            }
                                        }
                                        setNewInvPersonagem(arrayInvPersonagemAuxiliar)
                                        attTelaInvPersonagem()
                                    } else {
                                        // Tirar a quantidade da missão
                                        itemInvPersonagem.quantidade -= objetivoMissao.quantityMission
                                        attTelaInvPersonagem()
                                    }
                                }
                            }
                        }
                    }
                    darRecompensa(npcAtual, questLogPersonagem[i].missoes[j])
                    finalizarMissao(questLogPersonagem[i], questLogPersonagem[i].missoes[j])
                    return true
                }
            }
        }
    }
}

// Finalizar Missão (tirar do questLog e passar pro finalizadas)
function finalizarMissao(sagaMissaoFinalizada, missaoFinalizada) {
    let newQuestLog = []
    for (let itemQuestLog of questLogPersonagem) {
        if (itemQuestLog.missoes.length <= 1) {
            if (itemQuestLog.missoes[0] != missaoFinalizada) {
                newQuestLog.push(itemQuestLog)
            }
        } else {
            let itemQuestLogAtual = itemQuestLog
            let itemQuestLogAtualMissoes = itemQuestLog.missoes
            let newItemQuestLogAtualMissoes = []

            for (let i = 0; i < itemQuestLogAtualMissoes.length; i++) {
                if (itemQuestLogAtualMissoes[i] != missaoFinalizada) {
                    newItemQuestLogAtualMissoes.push(itemQuestLogAtualMissoes[i])
                }
            }
            itemQuestLogAtual.missoes = newItemQuestLogAtualMissoes
            newQuestLog.push(itemQuestLogAtual)
        }
    }

    // Atualiza o objeto QuestLog
    setNewQuestLogPersonagem(newQuestLog)
    // Atualiza a tela QuestLog
    attQuestLogInteiro()

    // Passar pro objeto missoesFinalizadas
    let sagaExistenteAuxiliar = false
    for (let i = 0; i < missoesFinalizadasPersonagem.length; i++) {
        if (missoesFinalizadasPersonagem[i].nomeSaga == sagaMissaoFinalizada.nomeSaga) {
            sagaExistenteAuxiliar = true
            missoesFinalizadasPersonagem[i].missoes.push(missaoFinalizada)
        }
    }

    if (!sagaExistenteAuxiliar) {
        let newObjectSaga = {}
        newObjectSaga.nomeSaga = sagaMissaoFinalizada.nomeSaga
        newObjectSaga.nomeSagaId = sagaMissaoFinalizada.nomeSagaId
        newObjectSaga.missoes = []
        newObjectSaga.missoes.push(missaoFinalizada)
        missoesFinalizadasPersonagem.push(newObjectSaga)
    }
}