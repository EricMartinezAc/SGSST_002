document.getElementById('modal_inicioSesion').style.display = 'flex'
document.getElementById('modal_registroUsuSesion').style.display = 'none'

function mostar_modal(modal_registroUsuSesion, modal_inicioSesion) {

    let display_ini = modal_inicioSesion.style.display
    let display_reg = modal_registroUsuSesion.style.display

    if (display_ini == 'flex') {
        modal_inicioSesion.style.display = 'none'
        modal_registroUsuSesion.style.display = 'flex'
    }
    if (display_reg == 'flex') {
        modal_inicioSesion.style.display = 'flex'
        modal_registroUsuSesion.style.display = 'none'
    }
}

