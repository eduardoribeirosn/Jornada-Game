import { locsItemsMapa} from "./JS/mapa/locs.js"
import { invPersonagem } from "./JS/personagem/inventario.js"
import { urlSkinsPersonagem } from "./JS/personagem/skin.js"

let pontos = 0
let tempo = 30

// Função para o personagem andar
window.addEventListener('keydown', (ev) => {
    let tecla = ev.key
    let vertical = Number(document.documentElement.style.getPropertyValue('--posYPersonagem'))
    let horizontal = Number(document.documentElement.style.getPropertyValue('--posXPersonagem'))
    
    if (tecla == 'ArrowUp' || tecla == 'w') {
        ev.preventDefault()
        
        trocarSkinAndando('frente')
        
        if (vertical > 1 && possoAndarProximaLoc(horizontal, (vertical - 1))) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posYPersonagem', (vertical - 1))
            locsItemsMapa[0].y = vertical - 1
        }
        
    } else if (tecla == 'ArrowDown' || tecla == 's') {
        ev.preventDefault()
        
        trocarSkinAndando('tras')
        
        if (vertical < 29 && possoAndarProximaLoc(horizontal, (vertical + 1))) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posYPersonagem', (vertical + 1))
            locsItemsMapa[0].y = vertical + 1
        }
    } else if (tecla == 'ArrowLeft' || tecla == 'a') {
        ev.preventDefault()
        
        trocarSkinAndando('esquerda')
        
        if (horizontal > 1 && possoAndarProximaLoc((horizontal - 1), vertical)) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posXPersonagem', (horizontal - 1))
            locsItemsMapa[0].x = horizontal - 1
        }
    } else if (tecla == 'ArrowRight' || tecla == 'd') {
        ev.preventDefault()
        
        trocarSkinAndando('direita')
        
        if (horizontal < 50 && possoAndarProximaLoc((horizontal + 1), vertical)) { // Limita o personagem a não sair do mapa, limita o personagem a não passar por blocos sólidos.
            document.documentElement.style.setProperty('--posXPersonagem', (horizontal + 1))
            locsItemsMapa[0].x = horizontal + 1
        }
    } else if (tecla == 'p') { // Atualiz a página, então reinicia o jogo
        window.location.reload()
    }
    passarPorItem()
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
    var trocarSkinIntervalo = setInterval(() => {
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
function gerarItemsAleatorias(nameItem, classNameItem, quantidade, skinItem) {
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
            for (let item of locsItemsMapa) {
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

        items.push([item, itemObj])
    }

    let mapa = document.getElementById('idMapa')
    for (let i = 0; i < items.length; i++) {
        mapa.appendChild(items[i][0])
        locsItemsMapa.push(items[i][1])
    }
    console.log(locsItemsMapa)
}

// Função para ganhar pontos assim que passar por uma moeda
function passarPorItem() {
    for (let i = 1; i < locsItemsMapa.length; i++) {
        // Verifica se passou por algum item no mapa e se é coletável
        if (locsItemsMapa[0].x == locsItemsMapa[i].x && (locsItemsMapa[0].y + 1) == locsItemsMapa[i].y && locsItemsMapa[i].coletavel) {
            // Verifica se o item da Ponto
            if (locsItemsMapa[i].nome == 'Moeda de Ouro') {
                pontos += 5
                document.getElementById('idValorPontos').textContent = pontos
            } else if (locsItemsMapa[i].nome == 'Bau') {
                pontos += 25
                document.getElementById('idValorPontos').textContent = pontos

            }

            // Verifica se é coletável e coleta
            if (locsItemsMapa[i].coletavel) {
                let quantity = 0
                for (let j = 0; j < invPersonagem.length; j++) {
                    if (invPersonagem[j].nomeItem == locsItemsMapa[i].nome) {
                        quantity++
                    }
                }
                if (quantity > 0) {
                    let itemColetado = invPersonagem.find(item => item.nomeItem == locsItemsMapa[i].nome)
                    itemColetado.quantidade += 1
                    let indiceItemColetado = (invPersonagem.findIndex(item => item.nomeItem == locsItemsMapa[i].nome) + 1)
                    console.log(indiceItemColetado)
                    document.getElementById(`idTdInventarioSpan${indiceItemColetado}`).textContent = itemColetado.quantidade
                } else {
                    let newItemColetadoImg = document.createElement('img')
                    let newItemColetadoSpan = document.createElement('span')

                    newItemColetadoImg.src = `${locsItemsMapa[i].skin}`
                    newItemColetadoImg.alt = `${locsItemsMapa[i].nome}`
                    newItemColetadoSpan.textContent = 1
                    newItemColetadoSpan.id = `idTdInventarioSpan${invPersonagem.length + 1}`

                    document.getElementById(`idTdInventario${invPersonagem.length + 1}`).append(newItemColetadoImg, newItemColetadoSpan)

                    invPersonagem.push(
                        {
                            nomeItem: `${locsItemsMapa[i].nome}`,
                            quantidade: 1,
                            skin: `${locsItemsMapa[i].skin}`
                        }
                    )
                }
            }

            
            // Procura o item para removelo do mapa
            let listaItems = document.getElementById('idMapa').getElementsByTagName('span')
            for (var j = 0; j < listaItems.length; j++) {
                // Verifica se é removivel
                if (listaItems[j].style.gridColumn == locsItemsMapa[i].x && listaItems[j].style.gridRow == locsItemsMapa[i].y && locsItemsMapa[i].coletavel) {
                    // Remove o Item da Tela
                    listaItems[j].remove()

                    // Remove o Item do Array de items
                    locsItemsMapa.splice(i, 1)
                }
            }
            // if (locsItemsMapa.length == 1 && tempo > 0) { // Aqui funcionava antes do Sistema de Solid, que sobrava apenas o personagem no mapa.
            // if ((locsItemsMapa.filter(item => item.solid == false)).length == 1 && tempo > 0) {
            //     clearInterval(intervaloTempo)
            //     alert(`Você venceu! Sobrou ${tempo} segundos.`)
            //     alert("Clique 'p' para reiniciar o jogo.")
            // }
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
    for (let i = 1; i < locsItemsMapa.length; i++) { // Começando o contador em 1, ele não pega o personagem
        if (locsItemsMapa[i].x == x && locsItemsMapa[i].y == (y + 1)) {
            var proximoLocal = locsItemsMapa[i]
            break
        }
    }
    // let proximoLocal = locsItemsMapa.find(item => item.x == x && item.y == (y + 1))
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

gerarItemsAleatorias('Moeda de Ouro', 'moedaOuro', 10, './assets/objetos/moedaOuro.png')
gerarItemsAleatorias('Bau', 'chest', 5, './assets/objetos/chest.png')