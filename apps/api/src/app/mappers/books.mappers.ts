import { Injectable } from '@angular/core';
import { Book, BookDocument } from '../schemas/book.schema';

@Injectable()
export class BooksMappersService {
    public mapBookDocumentGoogleToBook(googleBook: any): Book {
        return {
            googleId: googleBook.id,
            title: !!googleBook.volumeInfo && !!googleBook.volumeInfo.title ? googleBook.volumeInfo.title : '',
            authors: !!googleBook.volumeInfo && !!googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors : '',
            description:
                !!googleBook.volumeInfo && !!googleBook.volumeInfo.description ? googleBook.volumeInfo.description : '',
            thumbnail:
                !!googleBook.volumeInfo &&
                !!googleBook.volumeInfo.imageLinks &&
                !!googleBook.volumeInfo.imageLinks.thumbnail
                    ? googleBook.volumeInfo.imageLinks.thumbnail
                    : '',
            epubAvailable:
                !!googleBook.accessInfo && !!googleBook.accessInfo.epub
                    ? googleBook.accessInfo.epub.isAvailable
                    : false,
            pdfAvailable:
                !!googleBook.accessInfo && !!googleBook.accessInfo.pdf ? googleBook.accessInfo.pdf.isAvailable : false,
        };
    }

    public mapBookDocumentToBook(bookDocument: BookDocument): Book {
        return {
            googleId: bookDocument.id,
            title: bookDocument.title,
            authors: bookDocument.authors,
            description: bookDocument.description,
            thumbnail: bookDocument.thumbnail,
            epubAvailable: bookDocument.epubAvailable,
            pdfAvailable: bookDocument.pdfAvailable,
        };
    }
}
