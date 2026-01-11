export let sagasNpcs = [
    {
        nomeSaga: 'Saga Misterioso',
        nomeSagaId: 'SagaMisterioso',
        missoes: [
            {
                nomeMissao: 'Missão 1 - Coletar Moedas',
                objetivo: [
                    {
                        objective: 'Moeda de Ouro',
                        typeMission: 'coletável',
                        quantityMission: 5
                    }
                ],
                recompensa: [
                    {
                        nameReward: 'Dica do começo do Tutorial.',
                        quantityReward: 1,
                        typeReward: 'diálogo',
                        reward: [
                            {
                                nomeSaga: 'Saga Misterioso',
                                nomeSagaId: 'SagaMisterioso',
                                missoes: [
                                    {
                                        nomeMissao: 'Recompensa: Missão 1 - Coletar Moedas',
                                        dialogos: [
                                            {
                                                nomeNpc: 'Misterioso: ',
                                                corNomeNpc: '#000',
                                                textoNpc: 'Haha, mais um enganado por mim, não há nenhum tributo e nem guardião haha. Obrigado pelas moedas, para não te deixar de mãos abanadas te falarei uma coisa. A pessoa que pode te ajudar está dentro da casa.',
                                                corTextoNpc: '#8f8c02'
                                            }
                                        ],
                                        repostas: [
                                            'r', // deny
                                            'c', // accept ou next
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                descricaoObjetivo: 'Colete 20 Moedas para o Misterioso.',
                msgCompletar: 'Complete com o Misterioso.',
                npcCompletar: 'Misterioso'
            }
        ]
    }
]