const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profilepic: {
        type: String,
        default: "",
    },
    coverpic: {
        type: String,
        default: "",
    },
    // store user id in array
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    desc:{
        type:String
    },
    relationship: {
        type: String,
    },
    token: {
        type: String,
    }
}, {
    // it automatically adds a time stamp when the document is created or updated
    timestamps: true
});


//middlewares
userSchema.methods.generateAuthToken = async function () {
    try {
        const _id = this._id
        const token = jwt.sign(_id.toString(), process.env.SECRET_KEY)
        this.token = token
        await this.save()
        return token
    } catch (e) {
        console.log(e)
    }
}
module.exports = mongoose.model("user", userSchema)