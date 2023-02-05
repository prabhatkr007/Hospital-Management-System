
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/atc');

require('../DB/conn');

const User = require("../models/userSchema");

// router.get('/', (req, res) => {
//     res.send(`hello world from the server router js`);
// });

// Promise method

// router.post('/register' , (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if( !name || ! email || ! phone || ! work|| ! password || !cpassword ){
//         return res.status(422).json({error: "plz fill the filled properly" });
//     }
    
//     User.findOne({email: email})
//     .then((userExist) => {
//         if (userExist){
//             return res.status(422).json({ error: "Email already exist"});
//         }
    
//     const user = new User({name, email, phone, work, password, cpassword });

//     user.save().then( () => {
//         res.status(201).json({ message: "user registered successfully"});
//     }).catch((err) => res.status(500).json({ error: "Failed to register"}));
// }).catch(( err => { console.log(err); }));
    
// });

//Async-await mehod

router.post('/register' , async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if( !name || ! email || ! phone || ! work|| ! password || !cpassword ){
        return res.status(422).json({error: "plz fill the filled properly" });
    }

    try{
        const userExist = await User.findOne({ email: email });

        if (userExist){
            return res.status(422).json({ error: "Email already exist"});
        }else if(password != cpassword){
            return res.status(422).json({ error: 'password are not matching'});
        }
    
    else{
    const user = new User({name, email, phone, work, password, cpassword });

    const userRegister = await user.save();

    if (userRegister){
        res.status(201).json({ message: "user registered successfully"});
    }else{
        res.status(500).json({ error: "Failed to register"});
    }
}
       
}catch(err){
    console.log(err);
}

});

// Login route

router.post('/signin', async (req ,res) => {
    // console.log(req.body);
    // res.json ({message: "awesome"});
    try{
        const {email, password} = req.body;
        if(!email|| !password){
            return res.status(400).json({error:"plz fill the data"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
        
            const token = await userLogin.generateAuthToken();
            
            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

        if(isMatch){

                res.json({message:"user signin successful"});

            } else{
                res.status(400).json({error:"Invalid credientials"});
            }
        } else{
            res.status(400).json({error:"Invalid credientials."});
        }
    

       
        

    } catch(err){
        console.log(err);
    }
});

// about us ka page

router.get('/about',authenticate,(req,res)=>{
    res.send (req.rootUser);
});

router.get('/getdata',authenticate,(req,res)=>{
    res.send (req.rootUser);
});


router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send ("User logout");
});


module.exports = router;