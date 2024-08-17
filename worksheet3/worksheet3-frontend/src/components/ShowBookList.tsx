import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Book';

function ShowBookList() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/books');
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data);
                } else {
                    throw new Error('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error from ShowBookList: ' + error);
            }
        }
        fetchData();
    }, [])

    const bookList =
        books.length === 0
            ? 'there is no book record!'
            : books.map((book, k) => 
            <BookCard book={book} key={k} />
        );

    return (
        <div className="show-book-list">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h1 className="display-4 text-center">Books List</h1>
                    </div>
                    <div className="col-md-11">
                        <Link 
                            href="/create" 
                            className="btn btn-outline-warning float-right"
                        >
                            + Add New Book
                        </Link>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="list">
                    {bookList}
                </div>
            </div>
        </div>
    )
}

export default ShowBookList;