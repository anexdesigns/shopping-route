let itemList = []
let store;

const mongoose = require('mongoose');
const conn = mongoose.connection;


exports.login = ('/', (req, res) => {
     res.render('login.ejs')
})


exports.auth = ('/auth', (req, res) => {
     return res.redirect('/home')
})


exports.home = ('/home', (req, res) => {
     res.render('index.ejs')
})


exports.newItem = ('/newItem', (req, res) => {
     console.log("item submitted")

     const newItem = {
          user_id: req.cookies.user_id,
          name: req.body.title,
          isle: req.body.isle
     }

     store = req.body.store
     conn.collection(store).insertOne(newItem)
     res.redirect('/loadStore')
})


exports.loadStore = ('/loadStore', (req, res) => {
     itemList = []
     let result;

     if (req.query.savedStore) {
          result = conn.collection(req.query.savedStore).find()
     } else {
          if (store) { result = conn.collection(store).find() }
          else {
               store = 'Publix'
               result = conn.collection(store).find()
          }
     }

     result.forEach((doc) => {
          itemList.push({
               name: doc.name,
               isle: doc.isle,
               id: doc._id
          })
     })
     res.redirect('/home')
})


exports.sendData = ('/sendData', function (req, res) {
     res.send(itemList)
});