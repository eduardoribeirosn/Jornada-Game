let hora = '07:00'

// Função para o sistema de horario

export let attHorarioInterval = setInterval(() => {
    let horaTela = document.getElementById('idHoraTela')
    let horaSeparada = hora.split(':')

    horaSeparada[1]++

    if (horaSeparada[1] >= 60) {
        horaSeparada[0] ++
        horaSeparada[1] = 0

        if (horaSeparada[0] >= 24) {
            horaSeparada[0] = 0
        }
    }

    // Colocar na tela
    let stringHora = ''
    if (horaSeparada[0] < 10) {
        stringHora = `0${Number(horaSeparada[0])}:`
    } else {
        stringHora = `${horaSeparada[0]}:`
    }
    if (horaSeparada[1] < 10) {
        stringHora += `0${horaSeparada[1]}`
    } else {
        stringHora += horaSeparada[1]
    }

    // console.log(stringHora)

    horaTela.textContent = stringHora
    hora = stringHora

    definirFundoGame()
}, 1000);

export function setHorario(newHorario) {
    hora = newHorario
    document.getElementById('idHoraTela').textContent = newHorario
}

function definirFundoGame() {
    let horaAtual = Number(hora.slice(0, 2))
    
    switch (horaAtual) {
        case 0:            
        case 1:            
        case 2:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.8)
            break
            
        case 3:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.6)
            break
            
        case 4:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FFDAB9')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.4)
            break
            
        case 5:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FFDAB9')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.3)
            break
            
        case 6:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FFDAB9')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.2)
            break
            
        case 7:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FFDAB9')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.1)
            break
            
        case 8:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FFDAB9')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.0)
            break
            
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#87CEEB')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.0)
            console.log('2')
            break
            
        case 16:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FF7F50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.0)
            break
            
        case 17:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#FF7F50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.1)
            break
            
        case 18:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.3)
            break
            
        case 19:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.4)
            break
            
        case 20:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.5)
            break
            
        case 21:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.6)
            break
            
        case 22:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.7)
            break
            
        case 23:
            document.documentElement.style.setProperty('--backgroundColorFundo', '#2C3E50')
            document.documentElement.style.setProperty('--opacityFundoGame', 0.7)
            break

        default:
            break
    }
}