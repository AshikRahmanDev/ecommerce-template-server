const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const productsRoute = require("./routes/products.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
// midleware
app.use(cors());
app.use(express.json());



app.use("/products", productsRoute)
app.use("/user",userRoute)
app.use("/cart", cartRoute)



app.get("/", (req, res) => {
    res.send("automoli server is running");
});
  
app.listen(port, () => {
    console.log("server running on port", port);
});