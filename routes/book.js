var express = require("express");
var router = express.Router()
const Book = require("../models/book.model.js");
var books = require("../resources/book")


router.get("/",function(req,res){
    res.render("book", { title: "Book App title", bookList: books})
});
router.get("/add",function(req,res){
    res.render("addbook",{title: "Add Book"}) //render view
});
router.post("/save", async function(req,res,next){
    try{const book = await Book.create(req.body)
        
   return res.status(200).redirect("/book")
    } catch(error){
        res.status(500).json({message: error.message})
    }
    
    
    
});
router.get("/edit/:_id", async function (req, res, next) {
 try{ const book =await Book.findById(req.params._id);

  // console.log(book)
  res.render("editBook", { title: "Edit book", book });}
  catch(err){
      res.status(500).json({message:err.message})
  }
 
});
router.post('/saveEdited/:_id', async function(req, res, next){
  const book = await Book.findByIdAndUpdate(req.params._id, req.body)
  if (!book) {
    return res.status(404).json({message: "Error updating book"})
  }
  res.redirect('/book')
 })

router.get('/delete/:id', function(req, res, next){
    console.log(req.params._id)
    const book= books.find((book)=>book._id=== req.params.id)
    const currIndex= books.findIndex(book=> req.params._id=== book._id)
    books.splice(currIndex, 1);
    // Redirect to the homepage or send a success message
    res.redirect('/book'); // Redirect to the homepage
});


module.exports = router;