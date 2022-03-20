const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
        default:''
    },
    likes:{
        type:Array,
        default:[]
    },
}, {
    // it automatically adds a time stamp when the document is created or updated
    timestamps: true 
});

module.exports = mongoose.model("posts", postSchema)
//middlewares
// userSchema.pre('save',async function(next){
//     if (this.isModified('password')){
//         this.password=bcrypt.hash(this.password,10)
//         console.log(this.password)
//     }
//     next()
// })