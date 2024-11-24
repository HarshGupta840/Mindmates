const route = require("express").Router();
const { validateToken } = require("./index");
const Message = require("./schema");

route.get("/get-messages/:mate_id/:mindmate_id", async (req, res) => {
  const { mindmate_id, mate_id } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: mindmate_id, receiver: mate_id },
        { sender: mate_id, receiver: mindmate_id },
      ],
    }).sort({
      time: 1,
    });

    res.send(messages);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

route.post("/seen/:id", validateToken, async (req, res) => {
  let { id } = req.params; // Trubuddy Id

  const response = await Message.updateMany(
    {
      $or: [
        { sender: req?.id, receiver: id },
        { sender: id, receiver: req?.id },
      ],
    },
    { seenByTrubuddy: true }
  );

  res.status(200).send(response);
});

module.exports = route;
