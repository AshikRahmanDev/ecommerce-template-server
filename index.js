const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const productsRoute = require("./routes/products.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
const sliderRouter= require("./routes/slider.route");
const advertiseRouter= require("./routes/advertise.route");
// midleware
app.use(cors());
app.use(express.json());



app.use("/products", productsRoute)
app.use("/user",userRoute)
app.use("/cart", cartRoute)
app.use("/slider",sliderRouter)
app.use("/advertise",advertiseRouter)



app.get("/", (req, res) => {
    res.send("gadget bazaar server is running");
});
  
app.listen(port, () => {
    console.log("server running on port", port);
});