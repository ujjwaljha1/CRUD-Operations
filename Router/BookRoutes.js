const express = require("express");
const bookController = require("../Controllers/BookControllers");
const router = express.Router();

router.get("/books", bookController.getBooks);
router.post("/books", bookController.createBooks);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
