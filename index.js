const express = require("express");
const app = express();

const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Diary = require("./models/diary");

app.get("/", async (req, res) => {
  try {
    const diaries = await Diary.find();
    console.log(diaries[0]);
    
    res.render("index",{diaries:diaries});
  } catch (err) {
    console.error("Error Finding the diaries", err);
  }
});

app.post("/written", async (req, res) => {
  const { title, content, sidecontent } = req.body;
  const sidecontents = sidecontent || [];

  try {
    const diaryEntry = Diary.create({
      title: title,
      content: content,
      sidecontent1: sidecontents[0] || "",
      sidecontent2: sidecontents[1] || "",
      sidecontent3: sidecontents[2] || "",
      date: new Date().toISOString().split("T")[0],
    });
    console.log("Diary Entry Saved: ", diaryEntry);
    res.redirect("/");
  } catch (error) {
    console.error("Error saving diary entry:", error);
    res.status(500).send("An error occurred while saving the diary entry.");
  }
});

app.listen(3000);
