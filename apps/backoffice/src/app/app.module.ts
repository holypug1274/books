import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookCardsContainerComponent } from './components/book-cards-container/book-cards-container.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ApiService } from './services/api.service';
import { BookMappers } from './mappers/books.mappers';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, BookCardComponent, BookCardsContainerComponent, SearchBarComponent],
    imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
    providers: [ApiService, BookMappers],
    bootstrap: [AppComponent],
})
export class AppModule {}
