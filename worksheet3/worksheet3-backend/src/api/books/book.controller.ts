import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { error } from 'console';

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get('/test')
    test() {
        return this.bookService.test();
    }

    // Get all books
    @Get('/')
    async findAll() {
        try {
            return this.bookService.findAll();
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No books found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error }
            );
        }
    }

    // Get one book by id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.bookService.findOne(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Book not found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error }
            );
        }
    }

    // Create a book
    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto) {
        try {
            await this.bookService.create(createBookDto);
            return { message: 'Book added successfully' }
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to add book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error }
            );
        }
    }

    // Update a book
    @Put('/:id')
    async updateBook(
        @Param('id') id:string,
        @Body() createBookDto: CreateBookDto
    ) {
        try {
            await this.bookService.update(id, createBookDto);
            return { message: 'Book updated successfully' };
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to update book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error }
            );
        }
    }

    // Delete a book
    @Delete('/:id')
    async deleteBook(@Param('id') id: string) {
        try {
            return await this.bookService.delete(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to delete book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error }
            );
        }
    }
}