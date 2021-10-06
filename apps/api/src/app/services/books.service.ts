import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { environment } from '../../environments/environment';
import { BooksMappersService } from '../mappers/books.mappers';
import { Book, BookDocument } from '../schemas/book.schema';
import { OrderBy } from '@kortext-books/types';
import { BooksUtilities } from '../utilities/books.utilities';

@Injectable()
export class BooksService {
    constructor(
        private httpService: HttpService,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        private booksMappersService: BooksMappersService,
        private booksUtilities: BooksUtilities,
    ) {}

    public async getBooksCount(): Promise<number> {
        return await this.bookModel.countDocuments().exec();
    }

    public async getBooks(searchTerm: string, orderBy: OrderBy): Promise<Book[]> {
        const books: Book[] = await this.getBooksFromDb(searchTerm, orderBy);

        if (books.length > 0) {
            return books;
        } else {
            return await this.getBooksFromGoogle(searchTerm, orderBy);
        }
    }

    private async getBooksFromDb(searchTerm: string, orderBy?: OrderBy): Promise<Book[]> {
        const select = { $text: { $search: searchTerm } };

        const booksDocs: BookDocument[] = await this.bookModel.find(select).exec();

        const books: Book[] = booksDocs.map(this.booksMappersService.mapBookDocumentToBook);

        if (orderBy == OrderBy.ALPHABETICALLY) {
            return this.booksUtilities.sortBooksByTitle(books);
        } else if (orderBy == OrderBy.AUTHOR) {
            return this.booksUtilities.sortBooksByAuthors(books);
        }

        return booksDocs;
    }

    private async getBooksFromGoogle(
        searchTerm: string,
        orderBy: OrderBy,
        startIndex = 0,
        maxResults = 20,
    ): Promise<Book[]> {
        const url = `${
            environment.GOOGLE_BOOKS_API_URL
        }?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&projection=lite&key=${
            environment.GOOGLE_BOOKS_API_KEY
                ? environment.GOOGLE_BOOKS_API_KEY
                : 'AIzaSyA2Z6lZXaCkiLu_5XIBfQx8D9jIUjhmHJU'
        }`;

        return this.httpService
            .get(url)
            .toPromise()
            .then(async (response) => {
                const googleResponse = response.data;
                let books: Book[] = [];

                if (googleResponse.totalItems > 0) {
                    books = googleResponse.items.map(this.booksMappersService.mapBookDocumentGoogleToBook);
                    books = await this.saveBooksOnDb(books);

                    //ordering is only from db, if not just return google books
                    if (orderBy) {
                        return await this.getBooksFromDb(searchTerm, orderBy);
                    }
                }

                return books;
            });
    }

    private async saveBooksOnDb(books: Book[]): Promise<Book[]> {
        //don't save books without title or without authors
        books = books.filter((book) => !!book.title && book.authors.length > 0);
        for (const book of books) {
            const bookDoc = await this.bookModel.findOne({ googleId: book.googleId }).exec();
            if (!bookDoc) {
                const createdBook: BookDocument = new this.bookModel(book);
                await createdBook.save();
            }
        }
        return books;
    }
}
