/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const SoldItems = require('../models/SoldItems')
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
      console.log("inside /sold/remove/:itemId")
      await SoldItems.remove({_id:req.params.itemId});
      res.redirect('/sold')
});

router.post('/',
  isLoggedIn,
  async (req, res, next) => {
    try{
      const cost = parseFloat(req.body.cost)
      const sku = req.body.sku
      const soldPrice = parseFloat(req.body.soldprice)
      const totalProfit = soldPrice - cost
      const sold = new SoldItems(
        {item:req.body.name,
         cost:cost,
         sku:sku,
         soldprice: req.body.soldprice,
         totalProfit: totalProfit,
         size: req.body.size,
         createdAt: new Date(),
         userId: req.user._id
        })
      await sold.save();
      await ToDoItem.remove({_id:req.body.id});
      res.redirect('/sold')
    }
    catch(e){
      console.log("error " + e)
      next(e);
    }
});



// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      res.locals.items = await SoldItems.find({userId:req.user._id})
      res.render('soldPrinter');
});



module.exports = router;
