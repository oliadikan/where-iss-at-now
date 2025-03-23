import express from "express";
import axios from "axios";
import {setTimeout} from "timers/promises";
//import sound from "sound-play";


const app = express();
const port = process.env.PORT || 3003;
//const port = 3003;
const apiKey = "AIzaSyByKtLiRu0Q_uJpMWm5hsjtHVldFrOn53o";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    //console.log(req.query.latitude, req.query.longitude);
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);
    //console.log(latitude, longitude);
    res.render("index.ejs", {lat: latitude, lng: longitude, key:apiKey});
});

app.post("/now", async (req, res) => {
    //console.log("got here!");
    //sound.play("files/piano-sound.mp3");
    try{
        const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
        //console.log(response.data.latitude, response.data.longitude);
        await setTimeout(2000);
        res.redirect("/?latitude=" + response.data.latitude + "&longitude=" + response.data.longitude);
    }
    catch (error){
        console.error("Failed to make request:", error.message);
        await setTimeout(2000);
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});



