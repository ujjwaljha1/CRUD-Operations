let books = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" },
    { id: 3, title: "Book 3", author: "Author 3" },
    { id: 4, title: "Book 4", author: "Author 4" },
    { id: 5, title: "Book 5", author: "Author 5" },
    { id: 6, title: "Book 6", author: "Author 6" },
  ];
  
  // Read
  const getBooks = (req, res) => {
    res.status(200).json(books);
  };
  
  // Create
  const createBooks = (req, res) => {
    const newBook = req.body;
    if (!newBook.title || !newBook.author) {
      return res.status(400).json({ error: "Title and Author are required" });
    }
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
  };
  
  // Update
  const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex((book) => book.id === id);
  
    if (index !== -1) {
      books[index] = { ...books[index], ...updatedBook };
      res.status(200).json(books[index]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  };
  
  // Delete
  const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((book) => book.id === id);
  
    if (index !== -1) {
      const deletedBook = books.splice(index, 1);
      res.status(200).json(deletedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  };
  
  module.exports = { getBooks, createBooks, updateBook, deleteBook };
  