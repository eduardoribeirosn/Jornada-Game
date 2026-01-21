export function attFocoPersonagem() {
    let mapa = document.getElementById('idMapa')
    let posP = mapa.querySelector('#idPersonagem').getBoundingClientRect()
    let escuridao = document.getElementById('idEfeitoEscuridao')
    
    let elementIdMapaTotal = document.getElementById('idMapaTotal').getBoundingClientRect()
    
    let subTop = elementIdMapaTotal.top
    let subLeft = elementIdMapaTotal.left

    let x = (posP.left + (posP.width / 2)) - subLeft
    let y = (posP.top + (posP.height / 2)) - subTop

    escuridao.style.setProperty('--xFoco', `${x}px`)
    escuridao.style.setProperty('--yFoco', `${y}px`)
}

addEventListener('resize', () => {
    attFocoPersonagem()
})