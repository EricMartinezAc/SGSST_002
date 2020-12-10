const login = (datoUsu, psw) => {
    alert(datoUsu, psw)
    let ws = new WebSocket('ws://localhost:8002')

    ws.onopen = function (e) {
        alert("Connection established");
        alert("Sending to server");
        ws.send("My name is John");
    }

    ws.onmessage = function (event) {
        alert(`Data received from server: ${event.data}`);
    };

    ws.onclose = function (event) {
        if (event.wasClean) {
            alert(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('Connection died');
        }
    };

    ws.onerror = function (error) {
        alert(`${error.message}`);
    };
}