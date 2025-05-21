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
    const book = await Book.create(req.body)
   return res.status(200).json(book)
    // books.push({
    //     ...req.body,//spread 
    //     _id:`00${books.length+1}`
    
    
    res.redirect("/book")
});
router.get("/edit/:_id", function (req, res, next) {
  console.log(req.params._id);
  const book = books.find((book) => book._id === req.params._id);
  res.render("edit", { title: "Edit Books", book });
});
router.post("/saveEdited/:_id", function (req, res, next) {
  const currIndex = books.findIndex((book) => req.params._id === book._id);
  books.splice(currIndex, 1, { ...req.body, _id: req.params._id });
  res.redirect("/book");
});

router.get('/delete/:id', function(req, res, next){
    console.log(req.params._id)
    const book= books.find((book)=>book._id=== req.params.id)
    const currIndex= books.findIndex(book=> req.params._id=== book._id)
    books.splice(currIndex, 1);
    // Redirect to the homepage or send a success message
    res.redirect('/book'); // Redirect to the homepage
});


module.exports = router;