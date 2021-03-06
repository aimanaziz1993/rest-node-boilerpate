const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true }, () => {
    console.log('db connected')
});

// create middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// run server
app.listen(8800, () => {
    console.log("Server running")
})