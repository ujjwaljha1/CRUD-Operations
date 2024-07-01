# 📚 CRUD Operations Repository

Welcome to the **CRUD Operations Repository**! This project demonstrates the basics to advanced CRUD (Create, Read, Update, Delete) operations using Node.js and MongoDB. This README will guide you through setting up the project, understanding the code, and exploring advanced features. Enjoy the journey! 🚀

![CRUD GIF](https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/crud.png)

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Basic CRUD Operations](#basic-crud-operations)
5. [Advanced Features](#advanced-features)
6. [Running the Project](#running-the-project)
7. [Contributing](#contributing)
8. [License](#license)

---

## Introduction

CRUD operations are fundamental to most web applications. This project covers:

- 📥 **Create**: Adding new data to the database.
- 📄 **Read**: Retrieving data from the database.
- ✏️ **Update**: Modifying existing data in the database.
- 🗑️ **Delete**: Removing data from the database.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 🟢
- [MongoDB](https://www.mongodb.com/) 🍃

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ujjwaljha1/crud-operations.git
    ```
2. Navigate to the project directory:
    ```bash
    cd crud-operations
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Environment Setup

Create a `.env` file in the root directory and add your MongoDB connection string:

```plaintext
MONGO_URI=your-mongodb-connection-string
PORT=5000
```

---

## Project Structure

```plaintext
crud-operations/
│
├── public/              # Static files
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # Application routes
│   └── app.js           # Express application setup
│
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

---

## Basic CRUD Operations

### Create 📝

To create a new record, use the `POST` endpoint:

```javascript
router.post('/item', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
```

### Read 📖

To read records, use the `GET` endpoint:

```javascript
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

### Update 🔄

To update a record, use the `PUT` endpoint:

```javascript
router.put('/item/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
```

### Delete 🗑️

To delete a record, use the `DELETE` endpoint:

```javascript
router.delete('/item/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

---

## Advanced Features

### Pagination 📜

Enhance the `GET` endpoint with pagination:

```javascript
router.get('/items', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const items = await Item.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Item.countDocuments();
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

### Search 🔍

Add search functionality:

```javascript
router.get('/items/search', async (req, res) => {
    const { query } = req.query;
    try {
        const items = await Item.find({ $text: { $search: query } });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

### Error Handling 🚨

Centralize error handling middleware:

```javascript
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});
```

---

## Running the Project

To run the project locally:

```bash
npm start
```

Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

---

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

![Contribute GIF](https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

