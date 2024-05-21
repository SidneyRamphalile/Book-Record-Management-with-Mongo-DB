const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
// const { route } = require("./users");

//const BookModel = require('../models/book-model');
//const UserModel = require('../models/user-model');

const router = express.Router();

const {UserModel, BookModel} = require('../models/index');

/**
 * Route: /books
 * Method: GET
 * Description: Getting all the books
 * Access: Public
 * Parameters: none
 */
router.get("/", getAllBooks);
// router.get("/", (req,res) => {
//     res.status(200).json({
//         success: true,
//         message: "Got all the books successfully",
//         data: books
//     });
// });



/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by ther id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleBookById)

/**
 * Route: /
 * Method: POST
 * Description: Adding a New Book
 * Access: Public
 * Parameters: none
 * Data: id, name, genre, price, publisher, author
 */
router.post("/", (req,res) => {
    const {data} = req.body;

    if(!data){
        return res.status(400).json({
            success: false,
            message: "No Data to Add a Book"
        });
    }

    const book = books.find((each) => each.id === data.id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "ID already exists"
        });
    }
    const allBooks = {...books, data};
    return res.status(201).json({
        success: true,
        message: "Added Book Successfully",
        data: allBooks
    })
});

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a book by its id
 * Access: Public
 * Parameters: id
 * Data: id, name, genre, price, publisher, author
 */
router.put("/updateBook/:id",(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(400).json({
            success: false,
            message: "Book Not Found For This ID"
        })
    }

    const updateData = books.map((each) => {
        if(each.id === id){
            return {...each, ...data};
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        message: "Updated a Book By Their Id",
        data: updateData,
    });
});


module.exports = router;