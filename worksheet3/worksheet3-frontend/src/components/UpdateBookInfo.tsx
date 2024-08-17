import React, { useState, useEffect, ChangeEvent, FormEvent, ChangeEventHandler } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';
import Link from 'next/link';

function UpdateBookInfo() {
    const [book, setBook] = useState<Book>(DefaultEmptyBook);

    const id = useParams<{ id: string }>().id;

    const router = useRouter();

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
                console.error('Error from UpdateBookInfo: ' + error);
            }
        }
        fetchData();
    }, [id])

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (response.ok) {
                router.push('/');
            } else {
                throw new Error('Failed to update book');
            }
        } catch (error) {
            console.error('Error from UpdateBookInfo: ' + error);
        }
    }

    return (
        <div className="update-book-info">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link href='/' className='btn btn-outline-warning float-left'>
                            Show Book List
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit Book</h1>
                        <p className="lead text-center">Update Book's Info</p>
                    </div>
                </div>

                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type='text'
                                placeholder='Title of the Book'
                                name='title'
                                className='form-control'
                                value={book.title}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label htmlFor="isbn">ISBN</label>
                            <input
                                type='text'
                                placeholder='ISBN'
                                name='isbn'
                                className='form-control'
                                value={book.isbn}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type='text'
                                placeholder='Author'
                                name='author'
                                className='form-control'
                                value={book.author}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                placeholder='Describe this Book'
                                name='description'
                                className='form-control'
                                value={book.description}
                                onChange={textAreaOnChange}
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label htmlFor="published_date">Published Date</label>
                            <input
                                type='date'
                                placeholder='published_date'
                                name='published_date'
                                className='form-control'
                                value={book.published_date?.toString()}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label htmlFor="publisher">Publisher</label>
                            <input
                                type='text'
                                placeholder='Publisher of this Book'
                                name='publisher'
                                className='form-control'
                                value={book.publisher}
                                onChange={inputOnChange}
                            />
                        </div>
                        <br />

                        <button type='submit' className='btn btn-outline-info btn-lg btn-block'>
                            Update Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateBookInfo;