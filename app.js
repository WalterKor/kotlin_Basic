const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key.js');

class App{
    constructor(){

        this.app = express();
        this.settingDB();
        this.getRouting();
        this.setViewEngine();
        this.setMiddleWare();
        this.setStatic();
        this.errorHandler();
        this.status404();
        
    }

    settingDB(){
        mongoose.connect(config.mongoURI,{useNewUrlParser: true}, function (err, result) {
            if(err){
                return console.log(err);
            }else{
                console.log("DB CONNECTED");
            }            
    });
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