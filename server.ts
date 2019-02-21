import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://admin:password@127.0.0.1:27017/events?authSource=admin', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

app.listen(PORT, () =>
  console.log("Server is running on Port: " + PORT)
);