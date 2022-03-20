const express= require("express")
const env=require("dotenv")
const mongoose=require("mongoose")
const helmet=require("helmet")
const morgan=require("morgan")
const path=require('path')
const app=express()
const UserRoute=require('../routes/users')
const authRoute=require('../routes/auth')
const postRoute=require('../routes/posts')
const get_auth=require('../config/get_auth')
const cookieParser=require('cookie-parser')
const cors=require('cors');
const multer=require('multer')

app.use('/images',express.static(path.join(__dirname,"../public/images/")))
app.use('/imagesposts',express.static(path.join(__dirname,"../public/images/posts")))
app.use('/imagesperson',express.static(path.join(__dirname,"../public/images/person")))
app.use('/imagescoverpic',express.static(path.join(__dirname,"../public/images/coverpic")))





console.log(path.join(__dirname,"../public/images/assets"))
env.config({path:path.join(__dirname,'../.env')});
const PORT=process.env.PORT || 8000
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connection successful')
}).catch((e)=>{
    console.log("no connection" +e)
})



//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use('/api/auth',get_auth)
app.use('/api/users',UserRoute)
app.use('/api/users/auth',authRoute)
app.use('/api/posts',postRoute)


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(req.body.cat==="posts")
        {
            cb(null,"../public/images/posts")
        }else if(req.body.cat==="person")
        {
            cb(null,"../public/images/person")
        }
        
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
})

const upload=multer({storage})
app.post('/api/upload/images',upload.single('file'),(req,res)=>{
    try{
        res.status(200).json("images uploaded successfully")
    }catch(e){
        console.log(e)
    }
})


app.listen(PORT,()=>{
    console.log(`connected to port ${PORT}`)
})