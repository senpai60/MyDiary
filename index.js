const express = require("express");
const app = express();

const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');
const Sentiment = require('sentiment');
const sentiment = new Sentiment()



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Diary = require("./models/diary");

  
// app.get('/sent',async(req,res)=>{
//   const text = await Diary.findOne({_id:'676c1037fca68a23770d8068'})
//   const textdata = text.content
//   const result = sentiment.analyze(textdata)
//   console.log(result);  
//   res.redirect('/')
  
// })

app.get("/", async (req, res) => {
  try {
    const diaries = await Diary.find();
    
    res.render("index",{diaries:diaries});
  } catch (err) {
    console.error("Error Finding the diaries", err);
  }
});

app.post("/written", async (req, res) => {
  const { title, content, sidecontent } = req.body;
  const sidecontents = sidecontent || [];

  try {
    // Perform sentiment analysis
    const sentimentResult = sentiment.analyze(content);

    // Define mood keywords
    const moodKeywords = {
      happy: ['joyful', 'cheerful', 'smile', 'sunshine', 'delight', 'excited'],
      sad: ['tears', 'lonely', 'gloom', 'heartbreak', 'grief', 'blue'],
      angry: ['furious', 'rage', 'annoyed', 'upset', 'resentful', 'irritated'],
      calm: ['serene', 'peaceful', 'tranquil', 'relaxed', 'soothing', 'quiet'],
      energetic: ['active', 'vibrant', 'motivated', 'lively', 'dynamic'],
      nostalgic: ['memory', 'longing', 'past', 'bittersweet', 'childhood'],
      reflective: ['thoughtful', 'pondering', 'introspective', 'philosophical'],
      anxious: ['worried', 'nervous', 'uneasy', 'stressed', 'concerned'],
      hopeful: ['optimistic', 'promising', 'positive', 'encouraging', 'uplifting'],
      melancholic: ['pensive', 'wistful', 'somber', 'dreary', 'forlorn'],
      excited: ['thrilled', 'exuberant', 'ecstatic', 'elated', 'overjoyed'],
      serene: ['calm', 'tranquil', 'restful', 'composed', 'placid']
    };

    // Function to calculate mood scores
    function calculateMoods(text) {
      const analysis = sentiment.analyze(text);
      const moodScores = {};

      // Initialize scores for all moods
      Object.keys(moodKeywords).forEach(mood => moodScores[mood] = 0);

      // Check tokens against mood keywords
      analysis.tokens.forEach(token => {
        Object.entries(moodKeywords).forEach(([mood, keywords]) => {
          if (keywords.includes(token.toLowerCase())) {
            moodScores[mood] += 1; // Increment score for matched mood
          }
        });
      });

      // Normalize scores by total word count
      const totalWords = analysis.tokens.length;
      Object.keys(moodScores).forEach(mood => {
        moodScores[mood] = (moodScores[mood] / totalWords).toFixed(2); // Normalize
      });

      return moodScores;
    }

    // Function to get top 3 moods
    function getTopMoods(text) {
      const moodScores = calculateMoods(text);

      // Sort moods by score in descending order and pick top 3
      const topMoods = Object.entries(moodScores)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .slice(0, 3)
        .map(([mood, score]) => mood);

      return topMoods;
    }

    // Get the top 3 moods
    const topMoods = getTopMoods(content);

    // Create new diary entry
    const diaryEntry = await Diary.create({
      title: title,
      content: content,
      sidecontent1: sidecontents[0] || "",
      sidecontent2: sidecontents[1] || "",
      sidecontent3: sidecontents[2] || "",
      date: new Date().toISOString().split("T")[0],
      mood: topMoods, // Store top 3 moods in the mood array
    });

    // Redirect to the main page
    res.redirect("/");
  } catch (error) {
    console.error("Error saving diary entry:", error);
    res.status(500).send("An error occurred while saving the diary entry.");
  }
});


app.listen(3000);
