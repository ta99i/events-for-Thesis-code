const express= require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
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
  const client = new mongoose(uri);
  const database = await client.db("GENDARMERIE");
  const Reg = database.collection('Citizens').insertOne(req.body);
})
//add RS into gendarm
app.post('/gendarmRS',async (req,res)=>{
  const client = new mongoose(uri);
  const database = await client.db("GENDARMERIE");
  const Reg = database.collection('RegisterCertificats').insertOne(req.body);
 
})
//Update citizen status gendarm
app.post('/recharch_citizens_g',async(req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("GENDARMERIE");
  const Reg = database.collection('Citizens').find(req.body)
  const cit= await Reg.toArray()
  res.send(cit)
})
app.post('/update_citizens_g',async(req,res)=>{
  console.log(req.body.id)
  const client = new mongoose(uri);
  const database = client.db("GENDARMERIE");
  const id=req.body.id
  console.log(id)
  const Reg =await database.collection('Citizens').updateOne({ "$expr": { "$eq": ["$_id", { "$toObjectId": id }] } },{$set:{status:'false'}}) 
  res.send(id)
})
//Update RS status gendarm
app.post('/recharch_rs_g',async(req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("GENDARMERIE");
  const Reg = database.collection('RegisterCertificats').find( {$or: [{certificatId:req.body.id},{ vin: req.body.vin }, { vrp: req.body.vrp }]})
  const rc= await Reg.toArray()
  res.send(rc)
})
app.post('/update_rs_g',async(req,res)=>{
  console.log(req.body.id)
  const client = new mongoose(uri);
  const database = client.db("GENDARMERIE");
  const id=req.body.id
  console.log(id)
  const Reg =await database.collection('RegisterCertificats').updateOne({ "$expr": { "$eq": ["$_id", { "$toObjectId": id }] } },{$set:{status:'false'}}) 
  res.send(id)
})
//add citizen into police
app.post('/police',async (req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("Police");
  const Reg = database.collection('Citizens').insertOne(req.body); 
})
//add RS into police
app.post('/policeRS',async (req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("Police");
  const Reg = database.collection('RegisterCertificats').insertOne(req.body);
})
//Update citizen status Police
app.post('/recharch_citizens_p',async(req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("Police");
  const Reg = database.collection('Citizens').find(req.body)
  const cit= await Reg.toArray()
  res.send(cit)
})
app.post('/update_citizens_p',async(req,res)=>{
  console.log(req.body.id)
  const client = new mongoose(uri);
  const database = client.db("Police");
  const id=req.body.id
  console.log(id)
  const Reg =await database.collection('Citizens').updateOne({ "$expr": { "$eq": ["$_id", { "$toObjectId": id }] } },{$set:{status:'false'}}) 
  res.send(id)
})
//Update RS status Police
app.post('/recharch_rs_p',async(req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("Police");
  const Reg = database.collection('RegisterCertificats').find( {$or: [{certificatId:req.body.id},{ vin: req.body.vin }, { vrp: req.body.vrp }]})
  const rc= await Reg.toArray()
  res.send(rc)
})
app.post('/update_rs_p',async(req,res)=>{
  console.log(req.body.id)
  const client = new mongoose(uri);
  const database = client.db("Police");
  const id=req.body.id
  console.log(id)
  const Reg =await database.collection('RegisterCertificats').updateOne({ "$expr": { "$eq": ["$_id", { "$toObjectId": id }] } },{$set:{status:'false'}}) 
  res.send(id)
})
//add citizen inti tax
app.post('/tax',async (req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("TAX");
  const Reg = database.collection('Citizens').insertOne(req.body);
})
//Update citizen status Tax
app.post('/recharch_citizens_t',async(req,res)=>{
  const client = new mongoose(uri);
  const database = client.db("TAX");
  const Reg = database.collection('Citizens').find(req.body)
  const cit= await Reg.toArray()
  res.send(cit)
})
app.post('/update_citizens_t',async(req,res)=>{
  console.log(req.body.id)
  const client = new mongoose(uri);
  const database = client.db("TAX");
  const id=req.body.id
  console.log(id)
  const Reg =await database.collection('Citizens').updateOne({ "$expr": { "$eq": ["$_id", { "$toObjectId": id }] } },{$set:{status:'false'}}) 
  res.send(id)
})
