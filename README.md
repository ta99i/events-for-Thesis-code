# change initdb.js by this and install the packages
#1 cors.
#2body-parser.
```
const express= require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongodb").MongoClient;
const app=express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const uri = "mongodb://127.0.0.1:27017/";

app.listen(4000,()=>{
  console.log('app listining on port 4000')
})
// add citizen into gendarm 
app.post('/gendarm',async (req,res)=>{
  console.log(req.body)
  const client = new mongoose(uri);
  const database = await client.db("GENDARMERIE");
  const Reg = database.collection('Citizens').insertOne(req.body);

 
})
//add RS into gendarm
app.post('/gendarmRS',async (req,res)=>{
  
  console.log(req.body)
  const client = new mongoose(uri);
  const database = await client.db("GENDARMERIE");
  const Reg = database.collection('RegisterCertificats').insertOne(req.body);
 
})
//add citizen into police
app.post('/police',async (req,res)=>{

  const client = new mongoose(uri);
  const database = client.db("Police");
  const Reg = database.collection('Citizens').insertOne(req.body);;
  console.log(resRC)
  res.status(200).json(resRC)
 
})
//add RS into police
app.post('/policeRS',async (req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("Police");
  const Reg = database.collection('RegisterCertificats').insertOne(req.body);;
  console.log(resRC)
  res.status(200).json(resRC)
 
})
//add citizen inti tax
app.post('/tax',async (req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("Tax");
  const Reg = database.collection('Citizens').insertOne(req.body);
  
})
```
## and run npm node initdb.js to insert documents to database.
