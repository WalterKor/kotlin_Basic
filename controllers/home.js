const { Router } = require('express');
const router = Router();

router.get('/', (req, res)=>{
    res.render('home/home.html');
});

router.get('/login', (req, res)=>{
    res.render('home/login.html');
})

router.get('/join', (req, res)=>{
    res.render('home/join.html');
});


module.exports = router;