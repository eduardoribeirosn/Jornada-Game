# Jornada-Game
Repositório criado para colocar minhas ideias em jogo e aproveitar para praticar conceitos de programação.

## Intuito
Criei este repositório para desenvolver minhas habilidades de programação enquanto desenvolvo algumas das minhas ideias de jogos, então cada Mango seria um desafio/passo para uma ideia.

### Mango 1
Já aviso que acabei me empolgando por ser o meu primeiro.

1- Criação: Criar um cenário com possibilidade de colocar um personagem e objetos.

2- Criação: Criar um personagem que ande no cenário.

3- Upgrade: Polir o personagem para que não saia do cenário.

4- Criação: Criar items que possam ser colocados no cenário (baú e moeda).

5- Upgrade: Fazer o item aparecer sozinho em lugares aleatórios.

6- Upgrade: Fazer com que o item não apareça no mesmo lugar que já exista algo.

7- Criação: Criar um sistema de quando passar por cima da moeda/bau, ganhar Ponto.

8- Upgrade: Fazer com que cada item de um valor diferente de pontos.

9- Upgrade: Fazer com que o item suma, assim que o personagem passar por cima.

10- Upgrade: Transformar o sistema de criar moedas aleatórias para qualquer item aleatório.

11- Criação: Criar um sistema de tempo.

12- Upgrade: Fazer com que quando ele pegar todos os items antes do tempo acabar, ele finalize o jogo. Caso o tempo acabar antes o jogo finalize também.

13- Criação: Criar mais um item (pedra).

14- Criação: Criar um sistema que deixe o item solido e o personagem não consiga passar por cima.

15- Upgrade: Adicionar o preventDefault para as setas, para não mexer na tela do site enquanto joga.

16- Fix: Na parte de finalizar o jogo quando coletar tudo, trocar de .lenght para .filter, para não contar os blocos sólidos.

### Mango 2
Após uma conversa com a IA Gemini, tive algumas ideias para criar. (Continuação do Mango_1)

{
##### Coisas a Fazer no Mango_2

    - Criar um inventário no lado esquerdo da Tela.

}

1- Criação: Criar uma tela para inventário.

1.5- Bônus: Procurar fonts para as letras do site/jogo.

2- Criação: Criar um sistema de inventário e implementar na tela feita. (adicionei um novo campo "skin" no Objeto [locsItemsMapa]).

3- Criação: Criar um sistema para separar itens coletaveis de itens não coletaveis como decoração, por exemplo uma flor no chão. (adicionei um novo campo "coletavel" no Objeto [locsItemsMapa]).

### Mango 3
Continuação do Mango_2 (Quebrei o Mango_2 em alguns mangos...)

{
    
##### Coisas a Fazer no Mango_3

    - Criar um espaço para ver as missões no lado direito da Tela (Quest Log).
    
    - Criar Npcs com missões, (pegar tantas Moedas, ir para tal local...)

    - Fazer teleportes para outros local.

    - Pesquisar sobre fundos para dar sensações de tempos/temperaturas/horas diferentes.
}

1- Criação: Procurar uma skin para o primeiro NPC de missão.

2- Criação: Criar um método de diálogo com o NPC, inicialmente o design.

3- Criação: Criar uma tela para as missões (Design).

4- Criação: Criar um sistema e integrar ele com a tela de missões. (Sistema para passar as quests de um mero objeto para a tela)

5- Criação: Criar algo que quando clicar em uma missão selecionada, ela não estará mais selecionada.

6- Criação: Criar um sistema de interação com o NPC, vara vir o diálogo e ganhar a missão.

7- Criação: Criar um sistema que passa a missão do NPC para o questLog do Personagem.

8- Upgrade: Melhorar o sistema, assim que o personagem completar a missão com o npc, tirar ela do questLog e passar ela pro histórico de missões finalizadas.