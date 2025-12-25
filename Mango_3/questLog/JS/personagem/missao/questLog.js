export let questLogPersonagem = [
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
                        quantityMissionFeita: 0,
                        completed: false,
                        getTextObjective() {
                            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
                        }
                    },
                    {
                        objective: 'Sombra do Mizuki',
                        typeMission: 'kill',
                        quantityMission: 3,
                        quantityMissionFeita: 0,
                        completed: false,
                        getTextObjective() {
                            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
                        }
                    }
                ],
                descricaoObjetivo: 'Derrotar o Mizuki e suas sombras.',
                msgCompletar: 'Complete com o Iruka.'
            },
            {
                nomeMissao: 'Missão 2',
                objetivo: [
                    {
                        objective: 'Iruka Disfarçado',
                        typeMission: 'kill',
                        quantityMission: 1,
                        quantityMissionFeita: 0,
                        completed: false,
                        getTextObjective() {
                            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
                        }
                    }
                ],
                descricaoObjetivo: 'Derrotar o Iruka Disfarçado.',
                msgCompletar: 'Complete com o Iruka.'
            }
        ]
    },
    {
        nomeSaga: 'Saga Shippuden',
        nomeSagaid: 'SagaShippuden',
        missoes: [
            {
                nomeMissao: 'Missão 1',
                objetivo: [
                    {
                        objective: 'Kakashi',
                        typeMission: 'kill',
                        quantityMission: 1,
                        quantityMissionFeita: 0,
                        completed: false,
                        getTextObjective() {
                            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
                        }
                    },
                    {
                        objective: 'Clones do Kakashi',
                        typeMission: 'kill',
                        quantityMission: 3,
                        quantityMissionFeita: 0,
                        completed: false,
                        getTextObjective() {
                            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
                        }
                    }
                ],
                descricaoObjetivo: 'Derrotar o Kakashi e seus clones.',
                msgCompletar: 'Complete com o Kakashi.'
            },
            {
                nomeMissao: 'Missão 2',
                objetivo: [
                    {
                        objective: 'Sombra',
                        typeMission: 'kill',
                        quantityMission: 1,
                        quantityMissionFeita: 0,
                        completed: false,
                        getTextObjective() {
                            return `- ${this.objective}: ${this.quantityMissionFeita}/${this.quantityMission}`
                        }
                    }
                ],
                descricaoObjetivo: 'Derrotar a Sombra.',
                msgCompletar: 'Complete com o Naruto.'
            }
        ]
    },
]