const express = require('express');
const bodyParser= require('body-parser');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.use( (req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/html');
    next();
})
promoRouter.get('/', (req,res,next) =>{
    
     res.end(`your will get list of all the promotions `);
});

promoRouter.post('/', (req,res,next) =>{

    res.statusCode=403;
    res.end(` POST request doesn't support in promo router`);
});

promoRouter.put('/', (req,res,next) =>{
    res.statusCode=403;
    res.end(`PUT request doesn't support in promo router`);
});

promoRouter.delete('/', (req,res,next) =>{
    res.statusCode=403;
    res.end(`DELETE request doesn't allowed in promo router`);
});

promoRouter.get('/:promoId', (req,res,next) =>{
    var promoId = req.params.promoId;
     res.end(`your fetched result for promoId ${promoId} is here`);
});

promoRouter.post('/:promoId', (req,res,next) =>{
    res.statusCode=403;
    var promoName = req.body.name;
    var promoId = req.params.promoId;
    res.end(`for the ${promoName} in promoId:${promoId}, POST request doesn't support`);
});

promoRouter.put('/:promoId', (req,res,next) =>{
    var promoId = req.params.promoId;
    res.end(`Congrats, promotions is updated for ${promoId}`);
});

promoRouter.delete('/:promoId', (req,res,next) =>{
    var promoId = req.params.promoId;
    res.end(`successfully deleted the promotions number ->${promoId}`);
});

module.exports= promoRouter;