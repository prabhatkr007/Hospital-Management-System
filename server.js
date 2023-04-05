const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

dotenv.config({path: './config.env'});

require('./DB/conn.js');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;






app.get('/hello', (req, res)=>{
    res.send({"Hello" :"World"})
})



app.get('/', (req,res)=>{
        res.send ('hello world')
});

// app.get('/about',(req,res)=>{
//     res.send ('about hello world')
// });

app.get('/contact', (req,res)=>{
    res.send ('hello contact world')
});

app.get('/signin', (req,res)=>{
    res.send ('hello sigin world')
});

app.get('/signup', (req,res)=>{
    res.send ('hello signup world')
});



app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
})