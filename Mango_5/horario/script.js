import { attHorarioInterval } from "./JS/horario/horario.js"
import { interagirAll } from "./JS/interacao/interagir.js"
import { localizarMapa, localizarNomeMapa } from "./JS/mapa/localizarMapa.js"
import { invPersonagem } from "./JS/personagem/inventario.js"
import { attProtocoloQuestLog } from "./JS/personagem/missao/attProtocoQuestLog.js"
import { questLogPersonagem } from "./JS/personagem/missao/questLog.js"
import { urlSkinsPersonagem } from "./JS/personagem/skin.js"

attHorarioInterval

var trocarSkinIntervalo = ''

// Função para o personagem andar
window.addEventListener('keydown', (ev) => {
    let infoLocsItemsMapa = localizarMapa()

    let gridCompleto = document.getElementById(localizarNomeMapa()).style.gridTemplate.split('/')
    let gridY = gridCompleto[0].split(',')[0].slice(7)
    let gridX = gridCompleto[1].split(',')[0].slice(8)

    let tecla = ev.key
    let vertical = Number(document.documentElement.style.getPropertyValue('--posYPersonagem'))
    let horizontal = Number(document.documentElement.style.getPropertyValue('--posXPersonagem'))
    
    if (tecla == 'ArrowUp' || tecla.toLowerCase() == 'w') {
        ev.preventDefault()
        
        trocarSkinAndando('frente')
        
        if (vertical > 1 && possoAndarProximaLoc(horizontal, (vertical - 1))) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posYPersonagem', (vertical - 1))
            infoLocsItemsMapa[0].y = vertical - 1
        }
        
    } else if (tecla == 'ArrowDown' || tecla.toLowerCase() == 's') {
        ev.preventDefault()
        
        trocarSkinAndando('tras')
        
        if (vertical < (gridY - 1) && possoAndarProximaLoc(horizontal, (vertical + 1))) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posYPersonagem', (vertical + 1))
            infoLocsItemsMapa[0].y = vertical + 1
        }
    } else if (tecla == 'ArrowLeft' || tecla.toLowerCase() == 'a') {
        ev.preventDefault()
        
        trocarSkinAndando('esquerda')
        
        if (horizontal > 1 && possoAndarProximaLoc((horizontal - 1), vertical)) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posXPersonagem', (horizontal - 1))
            infoLocsItemsMapa[0].x = horizontal - 1
        }
    } else if (tecla == 'ArrowRight' || tecla.toLowerCase() == 'd') {
        ev.preventDefault()
        
        trocarSkinAndando('direita')
        
        if (horizontal < (gridX) && possoAndarProximaLoc((horizontal + 1), vertical)) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posXPersonagem', (horizontal + 1))
            infoLocsItemsMapa[0].x = horizontal + 1
        }
    } else if (tecla.toLowerCase() == 'p') { // Atualiz a página, então reinicia o jogo
        window.location.reload()
    } else if (tecla == ' ') {
        interagirAll()
    }
    passarPorItem()
    // console.log(infoLocsItemsMapa[0].x)
    // console.log(infoLocsItemsMapa[0].y)
})

// Função para o personagem se movimentar quando andar
function trocarSkinAndando(lado) {
        
    // verifica se a animação está acontecendo, para limpa-la caso esteja.
    if (trocarSkinIntervalo) {
        clearInterval(trocarSkinIntervalo)
        document.documentElement.style.setProperty('--imagePersonagem', `url(${urlSkinsPersonagem[lado][0]})`)
    }
    
    // criação de variáveis para definir qual skin utilizar
    let indiceSkinAtual = 0
    let skinAtual = urlSkinsPersonagem[lado][indiceSkinAtual]
    
    // cria o intervalo para ficar mudando de skin
    trocarSkinIntervalo = setInterval(() => {
        if (indiceSkinAtual == (urlSkinsPersonagem[lado].length - 1)) {
            indiceSkinAtual = 0
        } else {
            indiceSkinAtual ++
        }
        skinAtual = urlSkinsPersonagem[lado][indiceSkinAtual]
        
        document.documentElement.style.setProperty('--imagePersonagem', `url(${skinAtual})`)
    }, 50);

    // cria um timer para acabar com a animação
    setTimeout(() => {
        if (trocarSkinIntervalo) {
            clearInterval(trocarSkinIntervalo)
            document.documentElement.style.setProperty('--imagePersonagem', `url(${urlSkinsPersonagem[lado][0]})`)
        }
    }, 200);

}

// Função para aparecer items aleatórias no mapa
export function gerarItemsAleatorias(nameItem, classNameItem, quantidade, skinItem) {
    let infoLocsItemsMapa = localizarMapa()
    
    let items = []
    for (let i = 0; i < quantidade; i++) {
        let item = document.createElement('span')
        item.classList.add(classNameItem)

        let vertical = 0
        let horizontal = 0
        
        // Verificação se já existe item nessa posição (caso exista ele gera a posição novamente)
        let repetir = true
        while (repetir) {
            repetir = false

            vertical = Math.trunc(Math.random() * 27 + 2)
            horizontal = Math.trunc(Math.random() * 49 + 1)

            // Verifica no Array de todos os items do Mapa
            for (let item of infoLocsItemsMapa) {
                if (item.x == horizontal && item.y == vertical) {
                    repetir = true
                }
            }
            
            // Verifica no Array das items criadas no momento.
            for (let item of items) {
                if (item.x == horizontal && item.y == vertical) {
                    repetir = true
                }
            }

            if (repetir == false) {
                break
            }
        }

        item.style.gridColumn = horizontal
        item.style.gridRow = vertical

        // criação de um objeto para salvar em LOCSITEMSMAPA
        let itemObj = {}
        itemObj.nome = nameItem
        itemObj.x = horizontal
        itemObj.y = vertical
        itemObj.solid = false
        itemObj.coletavel = true
        itemObj.skin = skinItem
        itemObj.skinClass = classNameItem
        itemObj.npc = false

        items.push([item, itemObj])
    }

    let mapa = document.getElementById('idMapa')
    for (let i = 0; i < items.length; i++) {
        mapa.appendChild(items[i][0])
        infoLocsItemsMapa.push(items[i][1])
    }
    console.log(infoLocsItemsMapa)
}

// Função para coletar itens assim que passar por cima
function passarPorItem() {
    let infoLocsItemsMapa = localizarMapa()
    
    for (let i = 1; i < infoLocsItemsMapa.length; i++) {
        // Verifica se passou por algum item no mapa e se é coletável
        if (infoLocsItemsMapa[0].x == infoLocsItemsMapa[i].x && (infoLocsItemsMapa[0].y + 1) == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].coletavel) {
            // Verifica se é coletável e coleta
            if (infoLocsItemsMapa[i].coletavel) {
                let quantity = 0
                for (let j = 0; j < invPersonagem.length; j++) {
                    if (invPersonagem[j].nomeItem == infoLocsItemsMapa[i].nome) {
                        quantity++
                    }
                }
                if (quantity > 0) {
                    let itemColetado = invPersonagem.find(item => item.nomeItem == infoLocsItemsMapa[i].nome)
                    itemColetado.quantidade += 1
                    let indiceItemColetado = (invPersonagem.findIndex(item => item.nomeItem == infoLocsItemsMapa[i].nome) + 1)
                    console.log(indiceItemColetado)
                    document.getElementById(`idTdInventarioSpan${indiceItemColetado}`).textContent = itemColetado.quantidade
                } else {
                    let newItemColetadoImg = document.createElement('img')
                    let newItemColetadoSpan = document.createElement('span')

                    newItemColetadoImg.src = `${infoLocsItemsMapa[i].skin}`
                    newItemColetadoImg.alt = `${infoLocsItemsMapa[i].nome}`
                    newItemColetadoSpan.textContent = 1
                    newItemColetadoSpan.id = `idTdInventarioSpan${invPersonagem.length + 1}`

                    document.getElementById(`idTdInventario${invPersonagem.length + 1}`).append(newItemColetadoImg, newItemColetadoSpan)

                    invPersonagem.push(
                        {
                            nomeItem: `${infoLocsItemsMapa[i].nome}`,
                            quantidade: 1,
                            skin: `${infoLocsItemsMapa[i].skin}`
                        }
                    )
                }
                
                // Atualiza o questLog da Missão
                attProtocoloQuestLog()
            }

            
            // Procura o item para removelo do mapa
            let listaItems = document.getElementById('idMapa').getElementsByTagName('span')
            for (var j = 0; j < listaItems.length; j++) {
                // Verifica se é removivel
                if (listaItems[j].style.gridColumn == infoLocsItemsMapa[i].x && listaItems[j].style.gridRow == infoLocsItemsMapa[i].y && infoLocsItemsMapa[i].coletavel) {
                    // Remove o Item da Tela
                    listaItems[j].remove()

                    // Remove o Item do Array de items
                    infoLocsItemsMapa.splice(i, 1)
                }
            }
        }
    }
}

// Função para o sistema de tempo
// let intervaloTempo = setInterval(() => {
//     tempo -= 1
//     document.getElementById('idValorTempo').textContent = tempo
//     if (tempo <= 0) {
//         alert(`O tempo acabou! Você ficou com ${pontos} pontos.`)
//         clearInterval(intervaloTempo)
//     }
// }, 1000);

// Função para saber se tem item no lugar que você irá andar
function possoAndarProximaLoc(x, y) {
    let infoLocsItemsMapa = localizarMapa()
    
    for (let i = 1; i < infoLocsItemsMapa.length; i++) { // Começando o contador em 1, ele não pega o personagem
        if (infoLocsItemsMapa[i].x == x && infoLocsItemsMapa[i].y == (y + 1)) {
            var proximoLocal = infoLocsItemsMapa[i]
            break
        }
    }
    // let proximoLocal = infoLocsItemsMapa.find(item => item.x == x && item.y == (y + 1))
    if (proximoLocal) {
        if (proximoLocal.solid) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

// Função para passar as sagas para a Tela
function montarQuestLogSagas() {
    // Pegando a tag Pai do containerSagas
    let tagContainerSagas = document.getElementById('idQuestLog').querySelector('.sagas')

    // Zera tudo 
    tagContainerSagas.replaceChildren()

    // Pegando o Objeto do QuestLog
    let objQuestLogPersonagem = questLogPersonagem

    // Pegando a tag Pai do QuestLog
    let tagQuestLog = document.getElementById('idQuestLog')

    // Criar um array com todas as sagas do Usuário / PARTE SAGAS
    let sagasPersonagem = []
    for (let i = 0; i < objQuestLogPersonagem.length; i++) {

        let divCriada = document.createElement('div')
        divCriada.classList.add('saga')
        divCriada.id = `id${objQuestLogPersonagem[i].nomeSagaId}`

        divCriada.addEventListener('click', () => {
            montarQuestLogMissoes(objQuestLogPersonagem[i])
        })

        let spanCriado = document.createElement('span')
        spanCriado.textContent = objQuestLogPersonagem[i].nomeSaga
        
        sagasPersonagem.push(
            {
                div: divCriada,
                span: spanCriado
            }
        )
    }

    for (let i = 0; i < sagasPersonagem.length; i++) {
        let divAtual = sagasPersonagem[i].div
        divAtual.appendChild(sagasPersonagem[i].span)
        tagQuestLog.querySelector('.sagas').appendChild(divAtual)
    }
    // FINAL PARTE SAGAS

    montarQuestLogMissoes(objQuestLogPersonagem[0])
}

// Função para passar as missões para a Tela
function montarQuestLogMissoes(sagaAtual) {
    // Pegando a tag Pai do containerQuest
    let tagContainerQuest = document.getElementById('idContainerQuest')

    // Zerando as tags
    tagContainerQuest.querySelector('.containerQuestSagas').querySelector('.questSagasTitle').replaceChildren()
    tagContainerQuest.querySelector('.containerQuestSagas').querySelector('.questSagasConteudo').replaceChildren()

    // Tirar a class Selecionada caso haja alguma
    let listSagasAnterior = document.getElementsByClassName('saga')
    for (let i = 0; i < listSagasAnterior.length; i++) {
        if (listSagasAnterior[i].classList.contains('sagaSelecionada')) {
            listSagasAnterior[i].classList.remove('sagaSelecionada')
        }
    }
    // Colocar a class Selecionada na saga Selecionada
    let listSagas = document.getElementsByClassName('saga')
    for (let i = 0; i < listSagas.length; i++) {
        if (listSagas[i].id == `id${sagaAtual.nomeSagaId}`) {
            listSagas[i].classList.add('sagaSelecionada')
        }
    }

    // Cria o título da saga
    let tituloSaga = document.createElement('span')
    tituloSaga.textContent = `${sagaAtual.nomeSaga}`

    tagContainerQuest.querySelector('.containerQuestSagas').querySelector('.questSagasTitle').appendChild(tituloSaga)

    // Cria as missões da saga
    let missoesSaga = []
    for (let i = 0; i < sagaAtual.missoes.length; i++) {
        let missaoSaga = document.createElement('span')
        missaoSaga.textContent = `${sagaAtual.missoes[i].nomeMissao}`

        missaoSaga.addEventListener('click', () => {
            montarQuestLogMissaoSelecionada(sagaAtual.missoes[i])
        })
        
        missoesSaga.push(missaoSaga)
    }

    for (let i = 0; i < missoesSaga.length; i++) {
        tagContainerQuest.querySelector('.containerQuestSagas').querySelector('.questSagasConteudo').appendChild(missoesSaga[i])
    }

    montarQuestLogMissaoSelecionada(sagaAtual.missoes[0])
}

// Função para passar a missão Selecionada para a Tela
function montarQuestLogMissaoSelecionada(missaoAtual) {

    // Pegando a tag Pai do containerQuestAtual
    let tagContainerQuestAtual = document.getElementById('idContainerQuestAtual')

    // Caso a quest clicada já esteja selecionada, irá ser desativada
    let questSagasConteudoTest = document.getElementById('idQuestSagasConteudo')
    let testMissions = questSagasConteudoTest.getElementsByTagName('span')
    for (let i = 0; i < testMissions.length; i++) {
        if (testMissions[i].textContent == `${missaoAtual.nomeMissao}`) {
            if (testMissions[i].classList.contains('questSelecionada')) {
                testMissions[i].classList.remove('questSelecionada')

                // Pegando a tag Pai do containerQuestAtual
                let tagContainerQuestAtual = document.getElementById('idContainerQuestAtual')

                // Zerando as tags
                tagContainerQuestAtual.querySelector('.questAtualTitle').replaceChildren()
                tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.objetivo').replaceChildren()
                tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.descricaoObjetivo').replaceChildren()
                tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.msgCompletar').replaceChildren()

                return
            }
        }
    }

    // Zerando as tags
    tagContainerQuestAtual.querySelector('.questAtualTitle').replaceChildren()
    tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.objetivo').replaceChildren()
    tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.descricaoObjetivo').replaceChildren()
    tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.msgCompletar').replaceChildren()

    // Tirar a class Selecionada caso haja alguma
    let questSagasConteudoAnterior = document.getElementById('idQuestSagasConteudo')
    let listMissionsAnterior = questSagasConteudoAnterior.getElementsByTagName('span')
    for (let i = 0; i < listMissionsAnterior.length; i++) {
        if (listMissionsAnterior[i].classList.contains('questSelecionada')) {
            listMissionsAnterior[i].classList.remove('questSelecionada')
        }
    }
    // Colocar a class Selecionada na missao Selecionada
    let questSagasConteudo = document.getElementById('idQuestSagasConteudo')
    let listMissions = questSagasConteudo.getElementsByTagName('span')
    for (let i = 0; i < listMissions.length; i++) {
        if (listMissions[i].textContent == `${missaoAtual.nomeMissao}`) {
            listMissions[i].classList.add('questSelecionada')
        }
    }

    // Cria um título da missão
    let tituloMissao = document.createElement('span')
    tituloMissao.textContent = `${missaoAtual.nomeMissao}`

    tagContainerQuestAtual.querySelector('.questAtualTitle').appendChild(tituloMissao)

    // Cria o conteúdo da missão - objetivo
    let listObjectives = []
    for (let i = 0; i < missaoAtual.objetivo.length; i++) {
        let objetivoMissao = document.createElement('span')
        objetivoMissao.textContent = missaoAtual.objetivo[i].getTextObjective()

        listObjectives.push(objetivoMissao)
    }

    for (let i = 0; i < listObjectives.length; i++) {
        tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.objetivo').appendChild(listObjectives[i])
    }
    
    // Cria o conteúdo da missão - descricaoObjetivo
    let descricaoObjetivoMissao = document.createElement('span')
    descricaoObjetivoMissao.textContent = missaoAtual.descricaoObjetivo

    tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.descricaoObjetivo').appendChild(descricaoObjetivoMissao)

    // Verificando se a missão foi completada
    let arrayObjetivosAuxiliar = []
    for (let objetivoMissaoAtual of missaoAtual.objetivo) {
        arrayObjetivosAuxiliar.push(objetivoMissaoAtual.completed)
    }
    let verificacaoObjetivosAuxiliar = true
    for (let i = 0; i < arrayObjetivosAuxiliar.length; i++) {
        if (!arrayObjetivosAuxiliar[i]) {
            verificacaoObjetivosAuxiliar = false
        }
    }

    if (verificacaoObjetivosAuxiliar) {
        // Cria o conteúdo da missão - msgCompletar
        let msgCompletarMissao = document.createElement('span')
        msgCompletarMissao.textContent = missaoAtual.msgCompletar
        msgCompletarMissao.style.fontWeight = 'bold'
    
        tagContainerQuestAtual.querySelector('.questAtualConteudo').querySelector('.msgCompletar').appendChild(msgCompletarMissao)
    }

}

// Função para atualizar o questLog Inteiro
export function attQuestLogInteiro() {
    montarQuestLogSagas()
}

// Função para atualizar o questLog Missão Atual
export function attQuestLogMissaoAtual() {
    let sagaSelecionada = document.querySelector('.sagaSelecionada')
    let missaoSelecionada = document.querySelector('.questSelecionada')

    for (let sagaQuestLog of questLogPersonagem) {
        if (sagaQuestLog.nomeSaga == sagaSelecionada.textContent) {
            for (let missaoSagaQuestLog of sagaQuestLog.missoes) {
                if (missaoSagaQuestLog.nomeMissao == missaoSelecionada.textContent) {
                    montarQuestLogMissaoSelecionada(missaoSagaQuestLog)
                    montarQuestLogMissaoSelecionada(missaoSagaQuestLog)
                }
            }
        }
    }
}

gerarItemsAleatorias('Moeda de Ouro', 'moedaOuro', 10, './assets/cenario/objetos/moedaOuro.png')
gerarItemsAleatorias('Bau', 'chest', 5, './assets/cenario/objetos/chest.png')

montarQuestLogSagas()