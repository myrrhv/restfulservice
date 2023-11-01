const Book = require('./Book');


class BookDAO {
    static async getAllBooks() {
        try {
            const book = await Book.find();
            return book;
        } catch (error) {
            throw new Error('Error fetching books from database');
        }
    }

    static addBook(bookData) {
        return new Promise(async (resolve, reject) => {
            try {
                const book = new Book(bookData);
                await book.save();
                resolve(book);
            } catch (error) {
                reject(new Error('Error adding book to database'));
            }
        });
    }

    static async getBookById(id) {
        try {
            const book = await Book.findById(id);
            return book;
        } catch (error) {
            throw new Error('Error fetching book from database');
        }
    }

    static async updateBook(id, updatedData) {
        try {
            const existingBook = await Book.findById(id);
            if (!existingBook) {
                throw new Error('Book not found');
            }

            Object.keys(updatedData).forEach(key => {
                existingBook[key] = updatedData[key];
            });

            await existingBook.save();
            return existingBook;
        } catch (error) {
            throw new Error('Error updating book in database: ' + error.message);
        }
    }

    static async deleteBook(id) {
        try {
            const deletedBook = await Book.findByIdAndDelete(id);
            if (!deletedBook) {
                throw new Error('Book not found');
            }
            return deletedBook;
        } catch (error) {
            throw new Error('Error deleting book from database: ' + error.message);
        }
    }

    static async getBooksByGenre(genre) {
        try {
            const books = await Book.find({ genre: genre });
            return books;
        } catch (error) {
            throw new Error('Error fetching books by genre from database: ' + error.message);
        }
    }
}

module.exports = BookDAO;
