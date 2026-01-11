import { attQuestLogMissaoAtual } from "../../../script.js";
import { invPersonagem } from "../inventario.js";
import { questLogPersonagem } from "./questLog.js";

export function attProtocoloQuestLog() {
    for (let sagaQuestLog of questLogPersonagem) {
        for (let missaoSagaQuestLog of sagaQuestLog.missoes) {
            for (let objetivoMissaoSagaQuestLog of missaoSagaQuestLog.objetivo) {
                // Verificação dos tipos de missão
                if (objetivoMissaoSagaQuestLog.typeMission == 'coletável') {
                    for (let itemInvPersonagem of invPersonagem) {
                        if (itemInvPersonagem.nomeItem == objetivoMissaoSagaQuestLog.objective) {
                            objetivoMissaoSagaQuestLog.quantityMissionFeita = itemInvPersonagem.quantidade
                            // Se entrar aqui é porque a missão foi completada
                            if (itemInvPersonagem.quantidade >= objetivoMissaoSagaQuestLog.quantityMission) {
                                objetivoMissaoSagaQuestLog.quantityMissionFeita = objetivoMissaoSagaQuestLog.quantityMission
                                objetivoMissaoSagaQuestLog.completed = true
                            }
                            attQuestLogMissaoAtual()
                        }
                    }
                }
            }
        }
    }
}