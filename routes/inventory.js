/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const ToDoItem = require('../models/ToDoItem')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /inventory/remove/:itemId")
      await ToDoItem.remove({_id:req.params.itemId});
      res.redirect('/inventory')
});

router.post('/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      const cost = req.body.cost
      const quantity = req.body.quantity
      const totalCostV = cost*quantity
      const todo = new ToDoItem(
        {item:req.body.item,
         cost:req.body.cost,
         sku:req.body.sku,
         quantity:req.body.quantity,
         totalCost:totalCostV,
         createdAt: new Date(),
         userId: req.user._id
        })
      await todo.save();
      res.redirect('/todo')
});

// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.items = await ToDoItem.find({userId:req.user._id})
      res.render('inventoryPrinter');
});


module.exports = router;
