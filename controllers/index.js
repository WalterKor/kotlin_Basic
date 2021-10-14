const { Router } = require('express');
const router = Router();

router.use('/',require('./home.js'));
module.exports = router;