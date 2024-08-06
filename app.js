const express = require('express');

//pool for database connection
const pool = require('./config/dbconfig');

// const userModel = require('./model/userModel');

// add all functionalities of express in APP
const app = express();

//for environment variables files
const dotenv = require("dotenv");
dotenv.config();

//middleware
const morgan= require('morgan');


//middlewares
app.use(morgan("dev"));

//routes
app.get('/', function(req, res){
res.status(200).send("<h1>Hello JAsmine!!!!!!</h1>");
});
app.use(express.json());

app.post('/', (req, res) => {
    const name = req.body;
    res.json(name);
});

app.listen(5000, function(){
    console.log('app listening on port 3000');
});

// const { response } = require('express');
// const http = require('http')
// test()=(req,res)=>{
//     res.writeHead(200,{'Content-Type':'application\json'});
//     res.write(JSON.stringify({name:'Jasmine',email:'riya@test.com', phone: 6306843836}));
//     res.end();
// }
// http.createServer(test).listen(5000);