const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const { User } = require('../models/User');
const cookieParser = require('cookie-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cookieParser());


router.get('/', (req, res)=>{
    res.render('home/home.html');
});


/*login*/
router.get('/login', (req, res)=>{
    res.render('home/login.html');
})

router.post('/login' ,(req, res)=>{

});



/*join*/
router.get('/join', (req, res)=>{
    res.render('home/join.html');
});


router.post('/join' ,(req, res)=>{
   const user = new User(req.body);
   user.save((err), userInfo=>{
       if(err){
           return res.redirect('/login', {
               message : '이메일이 중복되었습니다.'
           })
       }else{
           return res.redirect('/')
       }

   })

});



module.exports = router;