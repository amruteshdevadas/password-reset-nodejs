// setTimeout(() => {
//     console.log("Hello world2..!!")

// }, 2000);

// setTimeout(() => {
//     console.log("hello world3")

// }, 3000);

// setTimeout(() => {
//     console.log("hello world1")

// }, 1000);
// setInterval(()=>{
//     console.log("hello world..!!")
// },1000)

// var http = require("http")

// http.createServer(function (req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'})
//     res.end("Hello World..!!")
// }).listen(3000)

// const crypto = require("crypto");

// const start = Date.now();
// function logHashTime() {
//   crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
//     console.log("Hash: ", Date.now() - start);
//   });
// }

// logHashTime();
// logHashTime();
// logHashTime();
// logHashTime();

// setImmediate(() => {
//     //run something
//     console.log("Hello World..!!")
//   })
// const bar = () => console.log('bar')

// const baz = () => console.log('baz')

// const foo = () => {
//   console.log('foo')
//   setTimeout(bar, 0)
//   new Promise((resolve, reject) =>
//     resolve('should be right after baz, before bar')
//   ).then(resolve => console.log(resolve))
//   baz()
// }

// foo()

// function wait (timeout) {
//     return new Promise((resolve)=>{
//         setTimeout(() => {
//             resolve()
//         }, timeout);
//     })    
// }

// db.collection.insertOne({_id:"amrutesh@gmail.com",username:"Amrutesh"})
// db.collection.insertMany([{},{}])

// db.collection.updateOne({
//     //filter
// },{$set:{_id:"xyz"}})

const express = require('express')

const app = express()
const port = 3000

app.listen(port,()=>{
console.log('listening')
})



  

