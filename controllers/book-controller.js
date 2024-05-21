const { UserModel, BookModel } = require("../models/index");

// const getAllBooks = () => {};           // Two Different Ways Of Exporting. Choose ONE. 
exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Book Found"
        })
    }
    res.status(200).json({
        success: true,
        data: books,
    })
};

// const getSingleBookById = () => {};
exports.getSingleBookById = async() => {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book){
        return res.status(404).json({
            success: false,
            message: "Boon Not Found",
        })
    }
    return res.status(200).json({
        success: true,
        message: "Found The Book By Their Id",
        data: book,
    });
};

exports.getAllIssuedBooks = async(req, res) => {
        const users = await UserModel.find({
            issuedBook: {$exists: true}
        }).populate("issuedBook");

        
     if (issuedBooks.length === 0) {
       return res.status(404).json({
         success: false,
         message: "No Book Issued Yet...",
       });
     }
     return res.status(200).json({
       success: true,
       message: "Users With The Issued Books...",
       data: issuedBooks,
     });
}

// module.exports = { getAllBooks, getSingleBookById};

