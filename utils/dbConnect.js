const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataBase="gadgetBazaar"

const productsCollection=client.db(dataBase).collection("products")
const userCollection=client.db(dataBase).collection("users")
const sliderCollection=client.db(dataBase).collection("slider")

module.exports ={
  productsCollection,
  userCollection,
  sliderCollection
}