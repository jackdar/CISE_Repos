'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function ShowBookDetails() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);

    const id = useParams<{ id: string }>().id;

    const navigate = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/books/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBook(data);
                } else {
                    throw new Error('Failed to fetch book');
                }
            } catch (error) {
                console.error('Error from ShowBookDetails: ' + error);
            }
        }
        fetchData();
    }, [id])

    const onDeleteClick = async (id: string) => {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                navigate.push('/');
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error from ShowBookDetails: ' + error);
        }
    }

    const BookItem = (
        <div>
            <table className="table table-hover table-dark table-striped table-bordered">
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Title</td>
                        <td>{book.title}</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Author</td>
                        <td>{book.author}</td>
                    </tr>
                    <tr>
                        <th scope='row'>3</th>
                        <td>ISBN</td>
                        <td>{book.isbn}</td>
                    </tr>
                    <tr>
                        <th scope='row'>4</th>
                        <td>Publisher</td>
                        <td>{book.publisher}</td>
                    </tr>
                    <tr>
                        <th scope='row'>5</th>
                        <td><Date></Date></td>
                        <td>{book.published_date?.toString()}</td>
                    </tr>
                    <tr>
                        <th scope='row'>6</th>
                        <td>Description</td>
                        <td>{book.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    return (
        <div className="show-book-details">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <br />
                        <br />
                        <Link
                            href="/"
                            className="btn btn-outline-warning float-left"
                        >
                            Show Book List
                        </Link>
                    </div>
                    <br />
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Book's Record</h1>
                        <p className="lead text-center">
                            View Book's Info
                        </p>
                        <hr />
                        <br />
                    </div>
                    <div className="col-md-10 m-auto">{BookItem}</div>
                    <div className="col-md-6 m-auto">
                        <button
                            type='button'
                            className='btn btn-outline-danger btn-lg btn-block'
                            onClick={() => {
                            onDeleteClick(book._id || "");
                            }}
                        >
                            Delete Book
                        </button>
                    </div>
                    <div className="col-md-6 m-auto">
                        <Link
                            href={`/edit-book/${book._id}`}
                            className='btn btn-outline-info btn-lg btn-block'
                        >
                            Edit Book
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowBookDetails;