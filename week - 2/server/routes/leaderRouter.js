const express = require('express');
const bodyParser= require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.use( (req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/html');
    next();
})
leaderRouter.get('/', (req,res,next) =>{
    
    res.end(`your will get list of all the leaders `);
});

leaderRouter.post('/', (req,res,next) =>{

   res.statusCode=403;
   res.end(` POST request doesn't support in leader router`);
});

leaderRouter.put('/', (req,res,next) =>{
   res.statusCode=403;
   res.end(`PUT request doesn't support in leader router`);
});

leaderRouter.delete('/', (req,res,next) =>{
   res.statusCode=403;
   res.end(`DELETE request doesn't allowed in leader router`);
});
leaderRouter.get('/:leaderId', (req,res,next) =>{
    var leaderId = req.params.leaderId;
     res.end(`your fetched result for leaderId ${leaderId} is here`);
});

leaderRouter.post('/:leaderId', (req,res,next) =>{
    res.statusCode=403;
    var leaderName = req.body.name;
    var leaderId = req.params.leaderId;
    res.end(`for the ${leaderName} in leaderId:${leaderId}, POST request doesn't support`);
});

leaderRouter.put('/:leaderId', (req,res,next) =>{
    var leaderId = req.params.leaderId;
    res.end(`Congrats, Leader is updated for ${leaderId}`);
});

leaderRouter.delete('/:leaderId', (req,res,next) =>{
    var leaderId = req.params.leaderId;
    res.end(`successfully deleted the Leader number ->${leaderId}`);
});

module.exports= leaderRouter;