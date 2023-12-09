const express = require('express');
const cors= require('cors');
const mongoose = require("mongoose");
//hash password for security
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const app = express();


const salt = bcrypt.genSaltSync(10);
//salt for jwt
const secret = 'sfdgsahshg4h3yh7';


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://wlbr:2sB7fkpmaUX69n5h@cluster0.wfsakrs.mongodb.net/?retryWrites=true&w=majority');

app.post('/register',async(req,res)=>{
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            //so that database get an hashed password at registration good for user pravacy
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    }catch(err){
        res.status(400).json(err);
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    //compare password in database
    const passOk = bcrypt.compareSync(password, userDoc.password);
    
    if(passOk){
        //logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token',token).json('ok');
        });
    }else{
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret,{},(err,info)=>{
        if (err) throw err;
        res.json(info);
    })
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})


app.listen(4000);


//wlbr
//2sB7fkpmaUX69n5h

