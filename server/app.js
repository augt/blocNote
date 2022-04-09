//dependencies
const express = require("express");
const path = require("path");
const sequelize = require("./config/database");

const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

const app = express();

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//parsing requests' content
app.use(express.json());

// api routes for users, publications and comments
app.use("/api/auth", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
