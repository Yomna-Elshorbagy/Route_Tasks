import autherModel from "../../../database/models/author.model.js";

export const addAuthor = async (req, res) => {
  const { name, bio, birthDate, books } = req.body;

  const author = await autherModel.insertMany({
    name,
    bio,
    birthDate,
    books,
  });
  res.status(201).json({ message: "Author added sucessfully", author });
};

export const getAllAuthors = async (req, res) => {
  const authors = await autherModel.find();
  res.status(200).json({ message: "Authors", authors });
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  const author = await autherModel.findById(id);
  if (!author)
    return res.status(401).json({ message: "Author doesnot exisist " });
  res.status(200).json({ message: "Author ", author });
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, bio, birthDate, books } = req.body;

  let author = await autherModel.findById(id);
  if (!author)
    return res.status(404).json({ message: "Author doesnot exisit" });

  const updatedauthor = await autherModel.findByIdAndUpdate(
    author._id,
    {
      name,
      bio,
      birthDate,
      books,
    },
    { new: true }
  );
  res.status(200).json({ message: "Author updated", updatedauthor });
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  let author = await autherModel.findById(id);
  if (!author)
    return res.status(404).json({ message: "Author doesnot exisit" });

  const deleteauthor = await autherModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Author deleted", deleteauthor });
};

//author with Books
export const getBooks = async (req, res) => {
  const { id } = req.params;
  const author = await autherModel.findById(id).populate("books");
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
};