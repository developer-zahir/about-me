import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import users from "./routes/users.js";
import expressEjsLayouts from "express-ejs-layouts";

//  dot env config 
dotenv.config();
const PORT = process.env.PORT || 4040;

// init express
const app = express();

// static files or folder
app.use(express.static("public"));


// midlleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.text());


// ejs setup
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

// express router
app.use(users)




// app listen 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.yellow.bold);
})