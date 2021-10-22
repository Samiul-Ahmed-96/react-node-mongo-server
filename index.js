
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5000;


//Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dbUserAnik:h5gVPHR70wquBped@cluster0.iy3km.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("company");
    const usersCollection = database.collection("users");
    //Post Api
    app.post('/users',async(req,res)=>{
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      // console.log('got new user',result);
      // console.log('hitting the post',req.body)
      res.json(result);
    })

  }
   finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
  res.send('Running port on 5000')
})

app.get('/users',(req,res)=>{
  res.send('Running port on users ')
})
app.listen(port,()=>{
  console.log('running server on',port)
})