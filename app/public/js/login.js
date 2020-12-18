const login = (datoUsu, psw) => {
    let ws = new WebSocket('ws://localhost:8002')

    ws.onopen = function (e) {

        waiting_bar(1)

        console.log("Conexión establecida");

        let datos = {
            _process_: 'consult',
            _data_: [datoUsu, psw]
        }

        ws.send(JSON.stringify(datos));

        console.log(`Enviado ${JSON.stringify(datos)} al servidor`);
    }

    ws.onmessage = function (event) {
        console.log(`Datos retornados desde el servidor: ${event.data}`);
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
}

function waiting_bar(estado) {
    alert(`Barra de espera aquí ${estado}`)
}