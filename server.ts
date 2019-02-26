import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { Event } from "./events.model";

const app = express();
const eventsRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://admin:password@mongodb:27017/events?authSource=admin', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

eventsRoutes.route('/').get(async function(req, res) {
  try {
    const events = await Event.find().exec();
    res.json(events);
  }
  catch(err) {
    res.status(400).send(err);
  };
});

eventsRoutes.route('/add').post(async function(req, res) {
  try {
    let event = new Event(req.body);
    await event.save();
    res.status(200).send("");
  }
  catch(err) {
    res.status(400).send(err);
  };
});

eventsRoutes.route('/edit/:id').put(async function(req, res) {
  try {
    const event = await Event.findById(req.params.id).exec();
    event.date = req.body.date;
    event.descr = req.body.descr;
    await event.save();
    res.json('Event updated!');
  }
  catch (err) {
    res.status(400).send("Update not possible");
  }
});

eventsRoutes.route('/delete/:id').delete(async function(req, res) {
  try {
    await Event.findByIdAndDelete(req.params.id).exec();
    res.json('Event deleted!');
  }
  catch (err) {
    res.status(400).send("Deletion not possible");
  }
});

app.use('/events', eventsRoutes);
app.listen(PORT, () =>
  console.log("Server is running on Port: " + PORT)
);