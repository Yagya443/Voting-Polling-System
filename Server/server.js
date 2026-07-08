require('dotenv').config()

const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const cors=require('cors')
const connectDB=require('./src/db.js')
const app=express()
const httpServer=http.createServer(app)

const io=new Server(httpServer,{
    cors:{
        origin:'http://localhost:5000/'
    }
})

app.use(express.json())

connectDB()

PORT=process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`Server is started ${process.env.PORT}`  );
    
})
