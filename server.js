if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const User = require('./models/users');
const helmet = require('helmet')


const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine", "ejs")
app.set('views', './view');
app.use(express.static('view'));
app.set('models', './models');
app.use(express.static('models'));
app.use(helmet())
app.use('/css', express.static('css'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


mongoose.connect('mongodb://localhost/storesdb', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('Connected to MongoDB'))
     .catch((err) => console.error('Could not connect to MongoDB..', err))


app.get('/home', (req, res) => {
     if (req.user) {
          // Loads items corresponding to the user that is logged in
          let itemList = [];
          req.user.items.forEach(el => {
               itemList.push({
                    id: el._id,
                    name: el.name,
                    isle: el.isle
               })
          });
          res.render('index.ejs', { itemList: itemList, name: req.user.username })
     }
     else res.render("error.ejs")

})

app.post('/newItem', (req, res) => {
     itemList = []
     req.user.items.push({ name: req.body.title, isle: req.body.isle })
     req.user.save(function (err) {
          if (err) return handleError(err);
     });

     res.redirect('/home')

})


app.get('/', (req, res) => {
     res.render('login.ejs')
})

app.post('/', passport.authenticate('local', {
     successRedirect: '/home',
     failureRedirect: '/',
     failureFlash: true
}))


app.get('/register', (req, res) => {
     res.render('register.ejs')
})


app.post('/register', (req, res) => {
     // Creates and saves a new user with a salt and hashed password
     User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function (err, user) {
          if (err) {
               console.log(err);
               return res.redirect('/register');
          } else {
               passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
               });
          }
     });
});

app.get('/logout', (req, res) => {
     req.logout();
     res.redirect('/')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
     console.log(`Server is listening on Port ${port}`)
})

