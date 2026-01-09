export let missoesFinalizadasPersonagem = [
    // exemplo
    {
        nomeSaga: 'Saga Clássica',
        nomeSagaId: 'SagaClassica',
        missoes: [
            {
                nomeMissao: 'Missão 1',
                objetivo: [
                    {
                        objective: 'Mizuki',
                        typeMission: 'kill',
                        quantityMission: 1,
                    },
                    {
                        objective: 'Sombra do Mizuki',
                        typeMission: 'kill',
                        quantityMission: 3,
                    }
                ],
                descricaoObjetivo: 'Derrotar o Mizuki e suas sombras.',
                msgCompletar: 'Complete com o Iruka.'
            }
        ]
    },
    {
        nomeSaga: 'Saga Misterioso',
        nomeSagaId: 'SagaMisterioso',
        missoes: [
            {
                nomeMissao: 'Missão 1 - Coletar Moedas',
                objetivo: [
                    {
                        objective: 'Moedas de Ouro',
                        typeMission: 'Coletável',
                        quantityMission: 20
                    }
                ],
                descricaoObjetivo: 'Coletar 20 Moedas para o Misterioso.',
                msgCompletar: 'Complete com o Misterioso.'
            }
        ]
    }
]