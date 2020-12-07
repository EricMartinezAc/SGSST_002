const express = require('express')
const app = express()
const path = require('path')
const routes = require('./app/routes/routes')

//settings
app.set('port', 8001 || process.env.PORT)//set de puerto
const puerto = app.get('port')
app.set('views', path.join(__dirname, './app/views'))//set de vistas
//set de renderizado y motor
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//routes
app.use(routes)

//static files
app.use(express.static(path.join(__dirname, 'app/public')));

//listen
app.listen(app.get('port'), () => {
    console.log('servidor corriendo en ', puerto)
})