import { Component, Input } from '@angular/core';
import { BookCardVM } from '../../models/BookCardVM';

@Component({
    selector: 'kortext-books-book-cards-container',
    templateUrl: './book-cards-container.component.html',
    styleUrls: ['./book-cards-container.component.scss'],
})
export class BookCardsContainerComponent {
    @Input()
    public bookCards: BookCardVM[] | null = [];
}
