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
            let datos = { _process_: 'auth', _data_: [datoUsu, psw] }
            ws.send(JSON.stringify(datos));
            console.log(`Enviado ${JSON.stringify(datos)} al servidor`);

        }
        //en escuha de mensajes, recibir datos y ejecutar acciones:
        ws.onmessage = function (event) {

            console.log('recibiendo y examinando resultado ... ')

            //recolectando datos de resultado
            let resultado = JSON.parse(JSON.stringify(JSON.parse(event.data)));
            let estadoErrorConexion = resultado.error_
            let usuariostack = resultado.resp_[0]
            let mjs_result = resultado.resp_[1]
            let estado_consulta = resultado.resp_[2]
            console.log(mjs_result)

            setInterval(() => {
                //stage 1: si se conectó sin error
                if (estadoErrorConexion === false) {
                    //stage 2: si error de consulta -> resolve(Error de consulta)
                    if (mjs_result !== 'Error de consulta') {
                        //stage 3: si datos erroneos -> resolve(datos no encontrados)
                        if (estado_consulta === false) {
                            //tumbar todo
                            setInterval(() => {
                                alertMjsError(mjs_result)
                            }, 500);
                        }
                        //stage 4:  datos encontrados -> resolve(Bienvenido al administardor de SG-SST)
                        if (estado_consulta === true) {
                            //complete_bar
                            document.getElementById('progress-bar').style.width = '100%';
                            //mostrar datos retornados
                            console.log(`Datos retornados desde el servidor: ${usuariostack}`);
                            //ocultar progressbar
                            setInterval(() => {
                                authSuccess(mjs_result)
                            }, 600);
                        }
                    }
                    //stage 2: si hubo error de consulta
                    if (mjs_result === 'Error de consulta') {
                        //tumbar todo
                        document.getElementById('progress-bar').style.width = '4%';
                        document.getElementById('progress-bar').style.width = '0%';
                        setInterval(() => {
                            alertMjsError(mjs_result)
                        }, 500);
                    }
                }
                //stage 1: si hubo error de conexion
                if (estadoErrorConexion === true) {
                    //tumbar todo
                    document.getElementById('progress-bar').style.width = '0%';
                    setInterval(() => {
                        alertMjsError(mjs_result)
                    }, 500);
                }

            }, 2000);

        }
        //si existe un error en websocket:
        ws.onerror = function (error) {
            //tumbar progressbar
            document.getElementById('progress-bar').style.width = '0%';
            setInterval(() => {
                cantConectWS(error)
            }, 1000);
        };

    } else {//Valores de entrada no cumplen condiciones
        alert(ResultVal)
    }
}

//FUNCIONES PARA FUNCIONALIDADES ADICIONAES

//validar campos
function ValidacionesDeCampo(datos, passw) {
    let mnjs = null;
    mnjs = 'aprobado'
    return mnjs
}

//no se pudo conectar a websocket
function cantConectWS(errorC) {
    //cerrar progressvarsubWind_alert_conexWS_cant
    document.getElementById('contentbarProgress').style.display = 'none';

    //alert(`No se pudo conectar, conexión: ${error.message}, `);
    document.getElementById('subWind_alert_conexWS_cant_errorMessage').innerHTML = errorC.message;

    //cerrar cualquier otra ventana y abrir "no se pud conectar WS"
    document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'inline';
    document.getElementById('contentsubWind_alert_auth_cant').style.display = 'none';
    document.getElementById('contentsubWind_alert_auth_success').style.display = 'none';

    //redireccionar a index
    setInterval(() => {
        window.location = '/'
    }, 1550);

}

//errores en conexion y consulta base de datos
function alertMjsError(msj) {
    //cerrar progressvarsubWind_alert_conexWS_cant
    document.getElementById('contentbarProgress').style.display = 'none';

    //alert(`No se pudo conectar, conexión: ${error.message}, `);
    document.getElementById('subWind_alert_errorMessage').innerHTML = msj;
    //cerrar cualquier otra ventana abrir ventana de alerta mostrando el mensaje configurado
    document.getElementById('contentsubWind_alert_auth_cant').style.display = 'none';
    document.getElementById('contentsubWind_alert_auth_cant').style.display = 'inline';
    document.getElementById('contentsubWind_alert_auth_success').style.display = 'none';

    //redireccionar a index
    setInterval(() => {
        window.location = '/'
    }, 1500);

}

//autenticado con exito
function authSuccess(msjA) {
    //cerrar progressvarsubWind_alert_conexWS_cant
    document.getElementById('contentbarProgress').style.display = 'none';

    document.getElementById('subWind_alert_successMessage').innerHTML = msjA;
    //cerrar cualquier otra ventana y abrir "success"
    document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'none';
    document.getElementById('contentsubWind_alert_auth_cant').style.display = 'none';
    document.getElementById('contentsubWind_alert_auth_success').style.display = 'inline';

    //redireccionar a index
    setInterval(() => {
        window.location = '/dashboard'
    }, 1000);
}
/*
//function error no tener conexion
function cantConect(errorC) {
    setInterval(() => {
        //cerrar progressvarsubWind_alert_conexWS_cant
        document.getElementById('contentbarProgress').style.display = 'none';

        //alert(`No se pudo conectar, conexión: ${error.message}, `);
        document.getElementById('subWind_alert_conexWS_cant_errorMessage').innerHTML = errorC.message;


        document.getElementById('contentsubWind_alert_auth_cant').style.display = 'none';

        document.getElementById('contentsubWind_alert_conexWS_cortada').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'inline';
        document.getElementById('contentsubWind_alert_conexWS_closeclean').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS').style.display = 'none';

        //redireccionar a index
        setInterval(() => {
            window.location = '/'
        }, 2000);
    }, 1000);
}

//function se logró conexión
function connected() {
    setInterval(() => {

        //alert success;
        document.getElementById('contentsubWind_alert_conexWS_cortada').style.display = 'none';

        document.getElementById('contentsubWind_alert_auth_cant').style.display = 'none';

        document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS_closeclean').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS').style.display = 'inline';

        //redireccionar a index
        setInterval(() => {
            window.location = '/dashboard'
        }, 1500);
    }, 1000);
}

//function error en consulta
function cantQuery(errorC) {
    setInterval(() => {
        //cerrar progressvarsubWind_alert_conexWS_cant
        document.getElementById('contentbarProgress').style.display = 'none';

        //alert(`No se pudo conectar, conexión: ${error.message}, `);
        document.getElementById('subWind_alert_auth_cant_errorMessage').innerHTML = errorC;


        document.getElementById('contentsubWind_alert_auth_cant').style.display = 'inline';

        document.getElementById('contentsubWind_alert_conexWS_cortada').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS_closeclean').style.display = 'none';
        document.getElementById('contentsubWind_alert_conexWS').style.display = 'none';

        //redireccionar a index
        setInterval(() => {
            window.location = '/'
        }, 2000);
    }, 1000);
}

*/























//al cerrar websocket:
/*
ws.onclose = function (event) {
    //tumbar progressbar
    document.getElementById('progress-bar').style.width = '0%';
    setInterval(() => {
        if (event.wasClean) {
            //cerrar progressvar
            document.getElementById('contentbarProgress').style.display = 'none';
            //mostar mensaje alerta
            setInterval(() => {
                //alert(`Conexión cerrada y limpiada, code=${event.code} reason=${event.reason}`);
                conexion_ws_closeclean(event)
            }, 500);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case1
            conexion_ws_cortada()
            //cerrar progressvar
            document.getElementById('contentbarProgress').style.display = 'none';
        };
    }, 4000);
}
*/



//function al cerrar websocket:
/*
function conexion_ws_closeclean(evento) {
    document.getElementById('subWind_alert_conexWS_closeclean_eventCode').innerHTML = evento.code;
    document.getElementById('subWind_alert_conexWS_closeclean_eventReason').innerHTML = evento.reason;
    document.getElementById('contentsubWind_alert_conexWS_cortada').style.display = 'none';
    document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'none';
    document.getElementById('contentsubWind_alert_conexWS_closeclean').style.display = 'inline';

}


function conexion_ws_cortada() {
    document.getElementById('contentsubWind_alert_conexWS_cortada').style.display = 'inline';
    document.getElementById('contentsubWind_alert_conexWS_cant').style.display = 'none';
    document.getElementById('contentsubWind_alert_conexWS_closeclean').style.display = 'none';
}
*/
