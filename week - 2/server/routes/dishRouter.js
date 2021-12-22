const express = require('express');
const bodyParser= require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.use( (req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/html');
    next();
})
dishRouter.get('/:dishId', (req,res,next) =>{
    var dishId = req.params.dishId;
     res.end(`your fetched result for dishId ${dishId} is here`);
});

dishRouter.post('/:dishId', (req,res,next) =>{
    res.statusCode=403;
    var dishName = req.body.name;
    var dishId = req.params.dishId;
    res.end(`for the ${dishName} in dishId:${dishId}, POST request doesn't support`);
});

dishRouter.put('/:dishId', (req,res,next) =>{
    var dishId = req.params.dishId;
    res.end(`Congrats, dish is updated for ${dishId}`);
});

dishRouter.delete('/:dishId', (req,res,next) =>{
    var dishId = req.params.dishId;
    res.end(`successfully deleted the dish number ->${dishId}`);
});

module.exports= dishRouter;