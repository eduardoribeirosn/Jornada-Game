export let dialogosNpcMisterioso = [
    {
        nomeSaga: 'Saga Misterioso',
        nomeSagaId: 'SagaMisterioso',
        missoes: [
            {
                nomeMissao: 'Missão 1 - Coletar Moedas',
                dialogos: [
                    {
                        nomeNpc: 'Misterioso: ',
                        corNomeNpc: '#000',
                        textoNpc: 'As sombras sussurram que você busca o caminho através do portão... mas o guardião exige um tributo de luz. Traga-me 20 Moedas de Ouro perdidas nestas terras. Somente quando o brilho do metal for suficiente para cegar o abismo, eu revelarei a passagem oculta. Vá, pequeno viajante, o tempo é um luxo que você não possui.',
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