const login = (datoUsu, psw) => {

    //levantar progressbar:
    document.getElementById('contentbarProgress').style.display = 'inline';
    document.getElementById('progress-bar').style.width = '75%';

    //validar campos:
    let ResultVal = ValidacionesDeCampo(datoUsu, psw)

    //si campos son cumplen especificaciones:
    if (ResultVal.length >= 1) {

        //crear websocket:
        let ws = new WebSocket('ws://localhost:8002')

        //en conexión de websocket, enviar datos:
        ws.onopen = function (e) {

            console.log("Conexión establecida")

            //enviar datos
            let datos = { _process_: 'read', _data_: [datoUsu, psw] }
            ws.send(JSON.stringify(datos));
            console.log(`Enviado ${JSON.stringify(datos)} al servidor`);

        }

        //en escuha de mensajes, recibir datos y ejecutar acciones:
        ws.onmessage = function (event) {
            //complete_bar
            document.getElementById('progress-bar').style.width = '100%';
            //mostrar datos retornados
            console.log(`Datos retornados desde el servidor: ${event.data}`);
            //ocultar progressbar
            setInterval(() => {
                document.getElementById('contentbarProgress').style.display = 'none';
                //redireccionar a dashboar
                setInterval(() => {
                    window.location = '/dashboard'
                }, 800);
            }, 2000);
        };

        //al cerrar websocket:
        ws.onclose = function (event) {
            //tumbar progressbar
            document.getElementById('progress-bar').style.width = '0%';
            setInterval(() => {
                if (event.wasClean) {
                    //alert(`Conexión cerrada y limpiada, code=${event.code} reason=${event.reason}`);
                    conexion_ws_closeclean(event)
                    //cerrar progressvar
                    document.getElementById('contentbarProgress').style.display = 'none';
                } else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case1
                    conexion_ws_cortada()
                    //cerrar progressvar
                    document.getElementById('contentbarProgress').style.display = 'none';
                };
                //redireccionar a inicio
                setInterval(() => {
                    window.location = '/'
                }, 800);
            }, 2000);
        }

        //si existe un error en websocket:
        ws.onerror = function (error) {
            //tumbar progressbar
            document.getElementById('progress-bar').style.width = '0%';
            setInterval(() => {
                //cerrar progressvarsubWind_alert_conexWS_cant
                //alert(`No se pudo conectar, conexión: ${error.message}, `);
                cantConect(error)
                document.getElementById('contentbarProgress').style.display = 'none';
                //redireccionar a inicio
                setInterval(() => {
                    window.location = '/'
                }, 800);
            }, 2000);
        };

    } else {
        alert(ResultVal)
    }
}

function ValidacionesDeCampo(datos, passw) {
    let mnjs = null;
    mnjs = 'aprobado'
    return mnjs
}

function conexion_ws_closeclean(evento) {
}

function conexion_ws_cortada() {
}

function cantConect(errorC) {
    
}