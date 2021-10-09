const { Router } = require('express');
const router = Router();
const ctrl = require('./home.ctrl.js');

router.get('/',(req, res)=>{
    res.render('common/home.html');
});

module.exports = router;

