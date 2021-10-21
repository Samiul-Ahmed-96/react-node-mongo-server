const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://myDbUserAnik:vZrBrIHffuW6rM7A@cluster0.inxey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("clients");
      const usersCollection = database.collection("users");
      // create a document to insert
      const doc = {
        name:'Rafi',
        email:'rafi@gmail.com',
      }
      const result = await usersCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res) =>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Hello from listen ${port}`)
})
