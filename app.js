const port = process.env.PORT || 3000;
const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const hbs = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, '/views/layouts'),
  extname: '.hbs',
  partialsDir: path.join(__dirname, '/views/partials'),
  defaultLayout: 'main'
});

console.clear();

// Setup handlebars and public dir
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({ 
  secret: 'topsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routers
let indexRouter = require('./routers/index');
app.use(indexRouter);

app.listen(port, function () {
  console.log(`Listening at http://localhost:${port}`)
});