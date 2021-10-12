const { Router } = require('express');
const router = Router();
const ctrl = require('./home.ctrl.js');

router.get('/', ctrl.hompage);


module.exports = router;

