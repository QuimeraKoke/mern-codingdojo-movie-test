const express = require('express');
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const {userController} = require("./controllers/user.conroller.js");
const {movieController} = require("./controllers/movie.controller.js");
const {reviewController} = require("./controllers/review.controller.js");
const {authenticateToken} = require("./util");

var app = express()
var cors = require('cors')

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

//
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
//
// // parse an HTML body into a string

// app.use(bodyParser.text({ type: 'text/html' }))
// setup the logger
// create a write stream (in append mode)

app.post('/register/', userController.registerUser);
app.post('/login/', userController.login);

app.get('/movies/', authenticateToken, movieController.getMovies)
app.post('/movies/', authenticateToken, movieController.createMovie)
app.get('/movies/:movieId/', authenticateToken, movieController.getMovie)
app.delete('/movies/:movieId/', authenticateToken, movieController.deleteMoview)

app.post('/movies/:movieId/reviews/', authenticateToken, reviewController.createReview)
app.delete('/movies/:movieId/reviews/:reviewId/', authenticateToken, reviewController.deleteReview)



app.listen(3030, () => {
    console.log(`Movie app listening on port 3030`)
});