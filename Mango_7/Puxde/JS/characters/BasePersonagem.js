export class BasePersonagem {
    constructor(name, atributo, raca, classe) { // (dano/defesa/vida), velocidade, critico, chCritico
       this.name = name
       this.level = 1
       this.xpLevel = 10
       this.xpLevelAtual = 0
       this.evolucao = 1
       this.atributo = atributo
       this.raca = raca
       this.classe = classe
       this.nivelPoder = 0
       this.dano = 0
       this.pceDano = 0.1
       this.vida = 0
       this.vidaAtual = 0
       this.defesa = 0
       this.pceDefesa = 0.1
       this.velocidade = 0
       this.critico = 0
       this.chCritico = 1
       this.skills = [
        [{}, {}, {}], // Básica 1 (nível 1, 2, 3)
        [{}, {}, {}], // Básica 2 (nível 1, 2, 3)
        {}  // Ult (Contador)
       ]
    }
}

    // Status (100) (50)
    // Dano 3x
    // Vida 15x
    // Defesa 1.5x

    // Atributos
    // Verde - Natureza
    // Azul - Mar
    // Vermelho - Fogo

    // Raças
    // Demonio
    // Humano
    // Gigante
    // Fada

    // Classe
    // Guerreiro - Tacker - DPS
    // Suporte
    // Tank
    
let psZariaki = new BasePersonagem('Zariaki', 'Vermelho', 'Demonio', 'Guerreiro')
let psVernade = new BasePersonagem('Vernade', 'Verde', 'Gigante', 'Tank')
let psCirilano = new BasePersonagem('Cirilano', 'Azul', 'Fada', 'Guerreiro')

psZariaki.name