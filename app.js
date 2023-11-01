const express = require('express');

const db = require('./db');
const BookDAO = require('./DAObook');


const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);


app.get('/books', async (req, res) => {
    const books = await BookDAO.getAllBooks();
    res.json(books);
});

app.get('/books/:id', async (req, res) => {
    const book = await BookDAO.getBookById(req.params.id);
    res.json(book);
});

// Маршрут POST для додавання нової книги
app.post('/books', async (req, res) => {
    console.log('req.body: ', req.body);

    try {
        const { title, author, genre } = req.body;
        if (!title || !author || !genre) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newBook = await BookDAO.addBook({ title, author, genre });
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.put('/books/:id', async (req, res) => {
    await BookDAO.updateBook(req.params.id, req.body);
    res.json({ message: 'Запис оновлено' });
});

app.delete('/books/:id', async (req, res) => {
    await BookDAO.deleteBook(req.params.id);
    res.json({ message: 'Запис видалено' });
});

app.get('/books/:genre', async (req, res) => {
    const genre = req.params.genre;

    try {
        const books = await BookDAO.getBooksByGenre(genre);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(8888, () => {
    console.log('Сервер запущено на порту 3001');
});
