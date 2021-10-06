import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderBy } from '@kortext-books/types';
import { SearchParams } from '../../models/SearchParams';

@Component({
    selector: 'kortext-books-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
    @Output()
    public onSearch: EventEmitter<SearchParams> = new EventEmitter();

    public options = [
        {
            value: OrderBy.ALPHABETICALLY,
            text: 'Alphabetically',
        },
        {
            value: OrderBy.AUTHOR,
            text: 'Author',
        },
    ];

    public formControlSearchTerm: FormControl = new FormControl('');
    public formControlOrderBy: FormControl = new FormControl('');

    public search(): void {
        this.onSearch.emit({
            searchTerm: this.formControlSearchTerm.value,
            orderBy: this.formControlOrderBy.value,
        });
    }
}
