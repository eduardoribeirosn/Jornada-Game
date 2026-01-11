export let invPersonagem = [
    // {
    //     nomeItem: 'Moeda de Ouro',
    //     quantidade: 32,
    //     skin: '../../assets/objetos/moedaOuro.png'
    // }
]

export function setNewInvPersonagem(newInvPersonagem) {
    invPersonagem = newInvPersonagem
}

export function attInvPersonagem() {
    // Zerar o inventário
    for (let i = 1; i <= 30; i++) {
        document.getElementById(`idTdInventario${i}`).replaceChildren()
    }

    for (let i = 0; i < invPersonagem.length; i++) {
        let newItemColetadoImg = document.createElement('img')
        let newItemColetadoSpan = document.createElement('span')

        newItemColetadoImg.src = `${invPersonagem[i].skin}`
        newItemColetadoImg.alt = `${invPersonagem[i].nomeItem}`
        newItemColetadoSpan.textContent = invPersonagem[i].quantidade
        newItemColetadoSpan.id = `idTdInventarioSpan${i + 1}`

        document.getElementById(`idTdInventario${i + 1}`).append(newItemColetadoImg, newItemColetadoSpan)
    }
}