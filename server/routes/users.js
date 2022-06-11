const accountSid = "AC440735b8765755186361f9203261bbbe";
const authToken = "02d60780747daa66e5c8ddd92e47f58d";
const client = require("twilio")(accountSid, authToken);
const express = require("express");
const router = express.Router();

function sendMessage(msg) {
  client.messages
    .create({
      body: `
        Header

        Body
        ${msg}

        Footer
        `,
      messagingServiceSid: "MG83b6a0b8490a6f0fd169c6761ef13e0c",
      to: "+15623352217",
    })
    .then((message) => console.log(message.sid))
    .done();
}
router.get("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName });

    console.log(users);
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firstName });
  }
});

router.get("/new", (req, res) => {
  console.log(users);
  res.render("users/new");
});

router.post("/", (req, res) => {
  console.log(req.body.firstName);
  sendMessage(req.body.firstName);
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.users);

    res.send("get user get with id" + req.params.id);
  })
  .put((req, res) => {
    res.send("update user get with id" + req.params.id);
  })
  .delete((req, res) => {
    res.send("delete user get with id" + req.params.id);
  });

const users = [{ name: "kyle" }, { name: "Sally" }];

router.param("id", (req, res, next, id) => {
  req.users = users[id];
  next();
});
module.exports = router;
