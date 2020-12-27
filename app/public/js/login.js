const login = (datoUsu, psw) => {

    let ResultVal = ValidacionesDeCampo(datoUsu, psw)

    if (ResultVal.length >= 1) {

        let ws = new WebSocket('ws://localhost:8002')

        ws.onopen = function (e) {

            //waiting_bar
            document.getElementById('contentbarProgress').style.display = 'inline';

            setInterval(() => {
                document.getElementById('progress-bar').style.width = '75%';
                setInterval(() => {
                    let datos = {
                        _process_: 'read',
                        _data_: [datoUsu, psw]
                    }
                    console.log("Conexión establecida")
                    ws.send(JSON.stringify(datos));
                    console.log(`Enviado ${JSON.stringify(datos)} al servidor`);
                }, 2000);
            }, 2000);
        }

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

        ws.onclose = function (event) {
            document.getElementById('progress-bar').style.width = '100%';
            setInterval(() => {
                if (event.wasClean) {
                    alert(`Conexión cerrada y limpiada, code=${event.code} reason=${event.reason}`);
                    document.getElementById('contentbarProgress').style.display = 'none';
                    document.getElementById('progress-bar').style.width = '0%';
                } else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    alert('Conexión cortada');
                    document.getElementById('contentbarProgress').style.display = 'none';
                    document.getElementById('progress-bar').style.width = '0%';
                }
            }, 2000);
        };

        ws.onerror = function (error) {
            document.getElementById('progress-bar').style.width = '100%';
            setInterval(() => {
                document.getElementById('contentbarProgress').style.display = 'none';
                document.getElementById('progress-bar').style.width = '0%';
                alert(`No se pudo conectar, conexión: ${error.message}, `);
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