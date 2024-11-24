const express = require("express");
const login = express.Router();
const User = require("../db/schema/loginSchema");

login.post("/get-one/:id", async (req, res) => {
  const { id } = req.params;

  const response = await User.findById(id);
  res.send(response);
});

login.post("/delete-questionnaire", async function (req, res) {
  let { id } = req.body;

  User.updateOne(
    { _id: id },
    {
      $set: {
        "questionnaire.age": "",
        "questionnaire.problem": "",
        "questionnaire.answers": [],
        "questionnaire.backendAnswers": [],
      },
    }
  )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

login.post("/update-questionnaire", async (req, res) => {
  let { age, problem, answers } = req.body;
  let { id } = req.body;

  let enviromental = parseInt(
    ((answers[0] + answers[1] + answers[2] + answers[3]) / 28) * 100
  );
  let purposeOfLife = parseInt(
    ((answers[4] + answers[5] + answers[6]) / 21) * 100
  );
  let selfAcceptance = parseInt(
    ((answers[7] + answers[8] + answers[9]) / 21) * 100
  );
  let positiveRelation = parseInt(
    ((answers[10] + answers[11] + answers[12]) / 21) * 100
  );

  let backendAnswers = [
    { value: enviromental },
    { value: purposeOfLife },
    { value: selfAcceptance },
    { value: positiveRelation },
  ];

  // Enviromental
  if (enviromental <= 30) {
    backendAnswers[0].text =
      "You have difficulty managing everyday affairs; feel unable to change or improve surrounding contexts; are unaware of surrounding opportunities; and lack a sense of control over the external world.";
  } else if (enviromental > 30 && enviromental <= 50) {
    backendAnswers[0].text =
      "You are in the process of discovering your sense of purpose and creating meaningful goals for yourself. While you may have felt directionless in the past, you are now exploring different outlooks and beliefs that bring a sense of fulfillment and purpose to your life.";
  } else if (enviromental > 50 && enviromental <= 70) {
    backendAnswers[0].text =
      "You have a good sense of mastery & competence in managing environment; control complex external activities; make effective use of surrounding opportunities";
  } else {
    backendAnswers[0].text =
      "You have a high sense of mastery & competence in managing environment; control complex external activities; make effective use of surrounding opportunities";
  }

  // purposeOfLife
  if (purposeOfLife <= 30) {
    backendAnswers[1].text =
      "You lack a sense of meaning in life; have few goals or aims, lack a sense of direction; do not see purpose of your past life; and have no outlook or beliefs that give life meaning.";
  } else if (purposeOfLife > 30 && purposeOfLife <= 50) {
    backendAnswers[1].text =
      "You are in the process of discovering your sense of purpose and creating meaningful goals for yourself. While you may have felt directionless in the past, you are now exploring different outlooks and beliefs that bring a sense of fulfillment and purpose to your life.";
  } else if (purposeOfLife > 50 && purposeOfLife <= 70) {
    backendAnswers[1].text =
      "You depict good sense of directedness; feel there is meaning to your present and past life; hold beliefs that give life purpose; and have aims and objectives for living.";
  } else {
    backendAnswers[1].text =
      "You depict high sense of directedness; feel there is meaning to your present and past life; hold beliefs that give life purpose; and have aims and objectives for living.";
  }

  // selfAcceptance
  if (selfAcceptance <= 30) {
    backendAnswers[2].text =
      "You feel dissatisfied with yourself; are disappointed with what has occurred in your past life; are troubled about certain personal qualities; and wish to be different than what you are.";
  } else if (selfAcceptance > 30 && selfAcceptance <= 50) {
    backendAnswers[2].text =
      "You possess a low level of self-awareness and are actively working towards personal growth and development. While acknowledging your past experiences and personal traits, you strive to improve and become the best version of yourself. You are motivated and optimistic about the potential for positive change in your life.";
  } else if (selfAcceptance > 50 && selfAcceptance <= 70) {
    backendAnswers[2].text =
      "You possess a positive attitude toward yourself; acknowledge and accept multiple aspects of yourself including both good and bad qualities; and feel positive about your past life.";
  } else {
    backendAnswers[2].text =
      "You possess a highly positive attitude toward yourself; acknowledge and accept multiple aspects of yourself including both good and bad qualities; and feel positive about your past life.";
  }

  // positiveRelation
  if (positiveRelation <= 30) {
    backendAnswers[3].text =
      "You have few close, trusting relationships with others; find it difficult to be warm, open, and concerned about others; are isolated and frustrated in interpersonal relationships.";
  } else if (positiveRelation > 30 && positiveRelation <= 50) {
    backendAnswers[3].text =
      "You cherish your close relationships and are working towards improving your ability to show warmth, openness, and concern towards others. While feeling some isolation and frustration in interpersonal relationships, you remain hopeful and committed to building fulfilling connections with others.";
  } else if (positiveRelation > 50 && positiveRelation <= 70) {
    backendAnswers[3].text =
      "You have warm, satisfying, trusting relationships with others; are concerned about the welfare of others; are capable of strong empathy, affection, and intimacy; and understand the give and take of human relationships.";
  } else {
    backendAnswers[3].text =
      "You have very warm, satisfying, trusting relationships with others; are concerned about the welfare of others; are capable of strong empathy, affection, and intimacy; and understand the give and take of human relationships.";
  }

  User.updateOne(
    { _id: id },
    {
      $set: {
        "questionnaire.age": age,
        "questionnaire.problem": problem,
        "questionnaire.answers": answers,
        "questionnaire.backendAnswers": backendAnswers,
      },
    }
  )
    .then(async (response) => {
      let data = await User.findOne({ _id: id });
      res.json({ response, data });
    })
    .catch((err) => {
      console.log(err);
    });
});

login.post("/update", async (req, res) => {
  const { id } = req.body;
  const { anonymous, profile } = req.body;

  const response = await User.updateOne(
    { _id: id },
    {
      profile,
      anonymous,
    }
  );
  console.log(response);
  res.send(response);
});

module.exports = login;
