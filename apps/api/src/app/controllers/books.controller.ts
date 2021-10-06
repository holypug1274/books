import { Controller, Get, Query } from '@nestjs/common';
import { Book } from '../schemas/book.schema';

import { BooksService } from '../services/books.service';

@Controller()
export class BookController {
    constructor(private readonly bookService: BooksService) {}

    @Get('/books/count')
    public async getBooksCount(): Promise<{ totalBooks: number }> {
        return { totalBooks: await this.bookService.getBooksCount() };
    }

    @Get('/books')
    public async getBooks(@Query('searchTerm') searchTerm, @Query('orderBy') orderBy): Promise<Book[]> {
        return await this.bookService.getBooks(searchTerm, orderBy);
    }
}
