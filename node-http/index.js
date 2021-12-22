const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port= process.env.PORT || 3000;
const hostName= 'localHost';
const dishRouter= require('./routes/dishRouter');
const promoRouter= require('./routes/promoRouter');
const leaderRouter= require('./routes/leaderRouter');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use( (req,res,next) =>{
      res.statusCode= 200;
      res.setHeader('Content-Type','text/html');
      next();
});

app.get('/', (req,res,next) =>{
   res.end('<html> <body> <h1> Hey!, I am using express Js </body> </html>');
   next();
});

app.use('/dishes',dishRouter);

app.use('/promotions',promoRouter);

app.use('/leaders',leaderRouter);

app.listen(port,hostName,() => {
    console.log(`app is listning on http://${hostName}:${port}`);
})