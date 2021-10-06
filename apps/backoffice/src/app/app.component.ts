import { Component } from '@angular/core';
import { SearchParams } from './models/SearchParams';
import { ApiService } from './services/api.service';
import { BookMappers } from './mappers/books.mappers';
import { BookCardVM } from './models/BookCardVM';
import { map, Observable } from 'rxjs';
import { BookDto, BooksCountDto } from '@kortext-books/types';

@Component({
    selector: 'kortext-books-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public books$: Observable<BookCardVM[]> = new Observable();
    public booksCount$: Observable<number | undefined>;

    constructor(private apiService: ApiService, private bookMappers: BookMappers) {
        this.booksCount$ = this.apiService.getBooksCount().pipe(map((res: BooksCountDto) => res.totalBooks));
    }

    onSearch(params: SearchParams) {
        this.books$ = this.apiService
            .getBooks(params.searchTerm, params.orderBy)
            .pipe(map((books: BookDto[]) => books.map(this.bookMappers.mapFromBookDtoToBookCardVM)));

        this.booksCount$ = this.apiService.getBooksCount().pipe(map((res: BooksCountDto) => res.totalBooks));
    }
}
