
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
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
    //Get Api
    app.get('/users', async(req,res)=>{
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    })
    //Post Api
    app.post('/users',async(req,res)=>{
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      // console.log('got new user',result);
      // console.log('hitting the post',req.body)
      res.json(result);
    })
    //Delete Api
    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        console.log('delete user id',result);
        res.json(result);
    })
    //Update
    app.get('/users/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};

      const user =await usersCollection.findOne(query);
      console.log('load user id',id)
      res.send(user);
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

app.listen(port,()=>{
  console.log('running server on',port)
})