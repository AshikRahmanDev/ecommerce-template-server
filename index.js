const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const productsRoute = require("./routes/products.route");
const { connectToServer } = require("./utils/dbConnect");
// midleware
app.use(cors());
app.use(express.json());



app.use("/products", productsRoute)



app.get("/", (req, res) => {
    res.send("automoli server is running");
  });
  
  app.listen(port, () => {
    console.log("server running on port", port);
  });