# Como usar o sistema de questLog

## Como funciona o layout HTML+CSS

DIV questLog é dividido em 2 partes (sagas / containerQuest).

### sagas

dentro da DIV sagas, temos uma DIV para cada saga, ela possui a class "saga", um id para identifica-la, exemplo "saga1", e a saga selecionada recebe a class "sagaSelecionada".

### containerQuest

DIV containerQuest é dividido em 2 partes (containerQuestsSagas / containerQuestAtual).

#### containerQuestsSagas

nela temos 2 divs, uma para o título e outra para o conteúdo, no conteúdo, a missão selecionada recebe a class "questSelecionada".

#### containerQuestAtual

nela temos 2 divs também, uma para o título e a outra para o conteúdo, nesta o conteúdo recebe outras 3 divs (objetivo, descricaoObjetivo e msgCompletar).

##### objetivo

fala sobre o que falta e o que já foi feito da missão.

##### descricaoObjetivo

descreve sobre o que deve ser feito na missão.

##### msgCompletar

normalmente fala com quem concluir a missão.