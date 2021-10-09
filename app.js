const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');


class App{
    constructor(){
        this.app = express();

        this.setViewEngine();
        this.getRouting();
        this.setMiddleWare();
        this.setStatic();
        this.errorHandler();
        this.status404();
        this.app.get('/',(req, res)=>{
            res.send('hello');
        })

    }

    //Middel Setting
    setMiddleWare(){   
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }

    //nunjucks template setting 
    setViewEngine(){
        nunjucks.configure('template',{
            autoescape: true,
            express: this.app
        })
    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    setStatic(){
        this.app.use('/uploads', express.static('uploads'));
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).render('common/404.html')
        });
    }

    errorHandler() {

        this.app.use( (err, req, res,  _ ) => {
            console.log(err);
 
            res.status(500).render('common/500.html')
        });
    
    }


}

module.exports = new App().app;