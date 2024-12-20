const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',  // OpenAPI version
        info: {
            title: 'Travel Website API',
            version: '1.0.0',
            description: 'This is the API documentation for the Travel & Trips Booking application.',
            contact: {
            name: 'Rishabh Sinha',
            email: 'sinharishabh402@gmail.com',
            },
        },
        servers: [
            {
                url: 'https://exploro-travel-assignment.onrender.com',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

//middlewares
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(express.json({limit: "50mb"}));
app.use(cors(corsOptions));
app.use(morgan("dev"));

const swaggerDocs = swaggerJSDoc(swaggerOptions);


//routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/trips", require("./routes/tripRoutes"));
app.use("/api/v1/cart", require("./routes/cartRoutes"));
app.use("/api/v1/booking", require("./routes/bookingRoutes"));
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`);
});