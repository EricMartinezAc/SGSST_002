const express = require("express");
const router = express.Router();
const tittle = "sgsst"

router.get('/',(req,res) => {
    res.render('index.html',{tittle});
});
router.get('/dashboard',(req,res) => {
    res.render('dashboard.html',{tittle});
});




module.exports = router;