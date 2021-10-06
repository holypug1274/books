import { BookCardVM } from '../models/BookCardVM';
import { BookDto } from '@kortext-books/types';
import { Injectable } from '@angular/core';

@Injectable()
export class BookMappers {
    public mapFromBookDtoToBookCardVM(bookDto: BookDto): BookCardVM {
        return {
            googleId: bookDto.googleId,
            title: bookDto.title,
            authors: bookDto.authors,
            description: bookDto.description,
            thumbnail: bookDto.thumbnail,
            epubAvailable: bookDto.epubAvailable,
            pdfAvailable: bookDto.pdfAvailable,
        };
    }
}
