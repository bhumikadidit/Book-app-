var express = require("express");
var router = express.Router()
var books = require("../resources/book")
router.get("/",function(req,res){
    res.render("book", { title: "Book App title", bookList: books})
});
router.get("/add",function(req,res){
    res.render("addbook",{title: "Add Book"})
})
router.post("/save",function(req,res){
    books.push({
        ...req.body,//spread 
        _id:`00${books.length+1}`
    
    })
    res.redirect("/book")
})
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

router.get("/delete/:_id", function (req, res) {
    const index = books.findIndex((book) => req.params._id === book._id);
    if (index !== -1) {
        books.splice(index, 1); // Remove the book from the array
    }
    res.redirect("/book"); // Redirect back to the book list
});


module.exports = router;