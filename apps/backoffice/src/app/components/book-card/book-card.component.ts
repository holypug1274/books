import { Component, Input } from '@angular/core';
import { BookCardVM } from '../../models/BookCardVM';

@Component({
    selector: 'kortext-books-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
    @Input()
    public bookCard: BookCardVM = {};
}
