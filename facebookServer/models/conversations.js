const mongoose=require('mongoose')

const conversations= new mongoose.Schema({
    usersId:{
        type:Array,
        default:[]
    },
    timestamps: true,
})




module.exports=mongoose.model("conversation",conversations)