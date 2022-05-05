const express = require('express');
const app=express();
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');

const PORT=process.env.PORT || 3000;
const mongoUrl= 'mongodb+srv://ANILSRGT:1234567890@cluster0.2ssnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const hbs=exphbs.create({
    defaultLayout:'main',
    extname: 'hbs',
});

app.engine('hbs',hbs.engine);
app.set('view engine','hbs');
app.set('views','views');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

async function start(){
    try {
        await mongoose.connect(mongoUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log('Error',error);
    }
}

start();