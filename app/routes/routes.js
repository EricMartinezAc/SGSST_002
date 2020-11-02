const express = require("express");
const router = express.Router();
const tittle = "sgsst"

router.get('/',(req,res) => {
    res.render('index.html',{tittle});
});
router.get('/contact',(req,res) => {
    res.render('contact.html',{tittle});
});




module.exports = router;