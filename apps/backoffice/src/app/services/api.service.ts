import { environment } from './../../environments/environment';
import { BookDto, BooksCountDto } from '@kortext-books/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    public getBooksCount(): Observable<BooksCountDto> {
        return this.httpClient.get<BooksCountDto>(`${environment.apiEndpoint}/books/count`);
    }

    public getBooks(searchTerm: string, orderBy: string): Observable<BookDto[]> {
        return this.httpClient.get<BookDto[]>(`${environment.apiEndpoint}/books`, {
            params: {
                searchTerm,
                orderBy,
            },
        });
    }
}
