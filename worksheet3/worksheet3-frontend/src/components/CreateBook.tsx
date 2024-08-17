import React, { useState } from 'react';
import { Book, DefaultEmptyBook } from './Book';
import { useRouter } from 'next/router';
import Link from 'next/link';

function CreateBookComponent() {
    const navigate = useRouter();

    const [book, setBook] = useState<Book>(DefaultEmptyBook);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(book);
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                console.log(response);
                setBook(DefaultEmptyBook);
                navigate.push('/');
            } else {
                throw new Error('Failed to create book');
            }
        } catch (error) {
            console.error('Error from CreateBook: ' + error);
        }
    }
    
    return (
        <div className="create-book">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link href="/" className="btn btn-outline-warning float-left">
                            Show Book List
                        </Link>
                    </div>
                    <div className="col-md-10 m-auto">
                        <h1 className="display-4 text-center">Add Book</h1>.
                        <p className="lead text-center">Create new book</p>
                        <form noValidate onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Title of the Book'
                                    name='title'
                                    className='form-control'
                                    value={book.title}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='ISBN'
                                    name='isbn'
                                    className='form-control'
                                    value={book.isbn}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Author'
                                    name='author'
                                    className='form-control'
                                    value={book.author}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Describe this Book'
                                    name='description'
                                    className='form-control'
                                    value={book.description}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type='date'
                                    placeholder='published_date'
                                    name='published_date'
                                    className='form-control'
                                    value={book.published_date?.toString()}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Publisher of this Book'
                                    name='publisher'
                                    className='form-control'
                                    value={book.publisher}
                                    onChange={onChange}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4 mb-4 w-100'
                            >
                                Submit
                            </button>
                        </form>
                    </div>                   
                </div>
            </div>
        </div>
    )
}

export default CreateBookComponent;