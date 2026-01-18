import { darItem } from "../../personagem/inventario.js"
import { criarDialogo } from "../interacoes/interacao.js"

export function darRecompensa(npcMissao, missaoConcluida) {
    if (missaoConcluida.recompensa.length > 0) {
        let recompensas = missaoConcluida.recompensa

        for (let itemRecompensa of recompensas) {
            for (let i = 0; i < itemRecompensa.quantityReward; i++) {
                // Tipos diferentes de Recompensa (diálogo, item...)
                if (itemRecompensa.typeReward == 'diálogo') {
                    criarDialogo(npcMissao, 0, itemRecompensa.reward)
                } else if (itemRecompensa.typeReward == 'item') {
                    darItem(itemRecompensa.reward[i])
                }
            }
        }
    }
}