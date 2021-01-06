require('./init')
const express = require('express');
// const http = require('http');
const app = express(); // 创建一个express应用
// const server = http.createServer(app);
app.listen(9527,()=>{
    console.log('server listen on 9527')
})
app.get('/abc/:id',(req,res)=>{
    console.log(req.headers['cache-control'])
    console.log(req.path)
    console.log(req.query)
    console.log(req.params)
    // res.send("<h1>我是你爸爸</h1>")
    // res.setHeader('a',"123")
    // res.send([1,1,1,1,1,1,1])
    // res.status(302).header('location','https://duyiedu.ke.com').end()
    // res.status(302).location('https://duyi.ke.qq.com').end()
    // res.redirect(302,'https://duyi.ke.qq.com')
    res.send('123')
})  
// app.get()