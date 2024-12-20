const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(express.json({limit: "50mb"}));
app.use(cors(corsOptions));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/trips", require("./routes/tripRoutes"));
app.use("/api/v1/cart", require("./routes/cartRoutes"));
app.use("/api/v1/booking", require("./routes/bookingRoutes"));

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`);
});