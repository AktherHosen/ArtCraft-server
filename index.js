const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//  middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bmhyihx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const craftCollection = client.db("craftDB").collection("craft");
    const subCategoryCollection = client
      .db("craftDB")
      .collection("subCategory");

    // write api here
    app.post("/allcraft", async (req, res) => {
      const newCraft = req.body;
      const result = await craftCollection.insertOne(newCraft);
      res.send(result);
    });

    app.get("/allcraft", async (req, res) => {
      const cursor = craftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //single craft
    app.get("/allcraft/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await craftCollection.findOne(query);
      res.send(result);
    });

    // my craft
    app.get("/myArtCraft/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await craftCollection.find(query).toArray();
      res.send(result);
    });

    //update
    app.put("/updateCraft/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCraft = req.body;

      const craft = {
        $set: {
          craftImage: updatedCraft.craftImage,
          itemName: updatedCraft.itemName,
          subCategoryName: updatedCraft.subCategoryName,
          shortDescription: updatedCraft.shortDescription,
          price: updatedCraft.price,
          rating: updatedCraft.rating,
          processTime: updatedCraft.processTime,
          customization: updatedCraft.customization,
          stock: updatedCraft.stock,
        },
      };
      const result = await craftCollection.updateOne(filter, craft, options);
      res.send(result);
    });

    //delete
    app.delete("/deleteCraft/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await craftCollection.deleteOne(query);
      res.send(result);
    });

    //categories api
    // add category
    app.post("/categories", async (req, res) => {
      const newCategory = req.body;
      const result = await subCategoryCollection.insertOne(newCategory);
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const cursor = subCategoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // same category craft
    app.get("/sameCategory/:subCategory", async (req, res) => {
      const subCategory = req.params.subCategory;
      const query = { subCategoryName: subCategory };
      const result = await craftCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("art craft server is running");
});
app.listen(port, () => {
  console.log(`art craft server port running on ${port}`);
});
