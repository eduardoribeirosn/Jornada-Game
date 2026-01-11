import { attQuestLogInteiro, attQuestLogMissaoAtual } from "../../../script.js";
import { attProtocoloQuestLog } from "../../personagem/missao/attProtocoQuestLog.js";
import { questLogPersonagem } from "../../personagem/missao/questLog.js";
import { sagasNpcs } from "./missoesNpcs.js";

export function darMissao(npcAtual) {
    let copiaSagaAtual = []
    let copiaMissaoAtual = ''
    for (let sagaMissao of sagasNpcs) {
        if (sagaMissao.nomeSaga == npcAtual.quests[0].saga) {
            for (let missoesMissao of sagaMissao.missoes) {
                if (missoesMissao.nomeMissao == npcAtual.quests[0].missao) {
                    copiaSagaAtual.push(sagaMissao.nomeSaga)
                    copiaSagaAtual.push(sagaMissao.nomeSagaId)
                    copiaMissaoAtual = missoesMissao
                }
            }
        }
    }

    copiaMissaoAtual.objetivo.forEach(objetivoAtual => {
        objetivoAtual.quantityMissionFeita = 0
        objetivoAtual.completed = false
        objetivoAtual.getTextObjective = function() {
            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
        }
    });

    let missaoAtualTotal = {
        nomeSaga: copiaSagaAtual[0],
        nomeSagaId: copiaSagaAtual[1],
        missoes: [copiaMissaoAtual]
    }
    // console.log(missaoAtualTotal)
    questLogPersonagem.push(missaoAtualTotal)
    attQuestLogInteiro()
    attProtocoloQuestLog()
}