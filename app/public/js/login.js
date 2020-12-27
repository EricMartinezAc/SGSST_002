const login = (datoUsu, psw) => {

    let ResultVal = ValidacionesDeCampo(datoUsu, psw)

    if (ResultVal.length >= 1) {

        let ws = new WebSocket('ws://localhost:8002')

        ws.onopen = function (e) {

            waiting_bar(1)

            let datos = {
                _process_: 'read',
                _data_: [datoUsu, psw]
            }
            console.log("Conexión establecida")
            ws.send(JSON.stringify(datos));
            console.log(`Enviado ${JSON.stringify(datos)} al servidor`);
        }

        ws.onmessage = function (event) {
            console.log(`Datos retornados desde el servidor: ${event.data}`);
            window.location = '/dashboard'
        };

        ws.onclose = function (event) {
            if (event.wasClean) {
                alert(`Conexión cerrada y limpiada, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                alert('Conexión cortada');
            }
        };

        ws.onerror = function (error) {
            alert(`No se pudo conectar, conexión: ${error.message}, `);
        };

    } else {
        alert(ResultVal)
    }
}

function waiting_bar(estado) {
    alert(`Barra de espera aquí ${estado}`)
}
function ValidacionesDeCampo(datos, passw) {
    let mnjs = null;
    mnjs = 'aprobado'
    return mnjs
}