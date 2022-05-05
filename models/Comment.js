const {Schema, model} = require('mongoose');

const schema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
});

module.exports=model('Comment',schema);