require("./config");

// node express

import * as express from "express";
import { addPushSubscriber } from "./add-push-subscriber.route";
import { sendNotification } from "./add-push-subscriber.route";

const bodyParser = require("body-parser");
const webpush = require("web-push");
const app = express();
const cors = require("cors");

webpush.setVapidDetails(
  process.env.VAPID_MAILTO,
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

app.use(cors());

app.use(bodyParser.json());

// Routes... move to a new folder.
app.route("/api/notifications").post(addPushSubscriber);
// push-notification subscribe ol
app.route("/api/newsletter").post(sendNotification);
// yeni bir notification gönder

app.listen(process.env.PORT, () => {
  console.log("Listen port: ", process.env.PORT);
});
