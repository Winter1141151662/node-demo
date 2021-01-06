require('./init')
const express = require('express');
const app = express(); // 创建一个express应用
const port = 9527;
app.listen(port,()=>{
    console.log('server listen on 9527')
})
app.get('/abc',
(req,res,next)=>{
    console.log('handle1')
    next()
},
(req,res,next)=>{
    console.log('handle2')
    
})  
// app.get()