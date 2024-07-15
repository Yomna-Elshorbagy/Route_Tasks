import bookModel from "../../../database/models/book.model.js";

export const addBook = async (req, res) => {
  const { title, content, author } = req.body;

  const Book = await bookModel.insertMany({
    title,
    content,
    author,
  });
  res.status(201).json({ message: "Book added sucessfully", Book });
};

export const getAllBooks = async (req, res) => {
  const Books = await bookModel.find();
  res.status(200).json({ message: "Books", Books });
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  const Book = await bookModel.findById(id);
  if (!Book) return res.status(401).json({ message: "Book doesnot exisist " });
  res.status(200).json({ message: "Book ", Book });
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, publishedDate } = req.body;

  let book = await bookModel.findById(id);
  if (!book) return res.status(404).json({ message: "book doesnot exisit" });

  const updatedBook = await bookModel.findByIdAndUpdate(
    book._id,
    { title, content, author, publishedDate },
    { new: true }
  );
  res.status(200).json({ message: "Book updated", updatedBook });
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
  
    let book = await bookModel.findById(id);
    if (!book) return res.status(404).json({ message: "book doesnot exisit" });
    
    const deleteBook = await bookModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted", deleteBook });
  };
  