import { Injectable } from '@nestjs/common';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BooksUtilities {
    public sortBooksByTitle(books: Book[]): Book[] {
        return books.sort((b1, b2) => {
            const title1 = b1.title.toLowerCase();
            const title2 = b2.title.toLowerCase();
            return title1 > title2 ? 1 : title1 < title2 ? -1 : 0;
        });
    }

    public sortBooksByAuthors(books: Book[]): Book[] {
        let booksWithAuthorsString: (Book & { authorsString: string })[] = books.map((book) => {
            return {
                ...book,
                authorsString: book.authors.sort().join(),
            };
        });

        booksWithAuthorsString = booksWithAuthorsString.sort((b1, b2) => {
            const authorsString1 = b1.authorsString.toLowerCase();
            const authorsString2 = b2.authorsString.toLowerCase();
            return authorsString1 > authorsString2 ? 1 : authorsString1 < authorsString2 ? -1 : 0;
        });

        return booksWithAuthorsString.map((book) => {
            delete book['authorsString'];
            return book as Book;
        });
    }
}
