const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productsCollection=client.db('gadgetBazzer').collection("products")

module.exports ={
  productsCollection
}