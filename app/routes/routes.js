const express = require("express");
const router = express.Router();
const tittle = "sgsst"

router.get('/',(req,res) => {
    res.render('index.html',{tittle});
});
router.get('/dashboard',(req,res) => {
    res.render('dashboard.html',{tittle});
});
router.get('/afiliar',(req,res) => {
    res.render('U_dboard/_afiliar.html',{tittle});
});
router.get('/contactos',(req,res) => {
    res.render('U_dboard/_contactos.html',{tittle});
});
router.get('/empresas',(req,res) => {
    res.render('U_dboard/_empresas.html',{tittle});
});
router.get('/personas',(req,res) => {
    res.render('U_dboard/_personas.html',{tittle});
});
router.get('/planificar',(req,res) => {
    res.render('U_dboard/_planificar.html',{tittle});
});
router.get('/hacer',(req,res) => {
    res.render('U_dboard/_hacer.html',{tittle});
});
router.get('/verificar',(req,res) => {
    res.render('U_dboard/_verificar.html',{tittle});
});
router.get('/actuar',(req,res) => {
    res.render('U_dboard/_actuar.html',{tittle});
});




module.exports = router;