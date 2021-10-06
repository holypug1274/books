import { HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { BookController } from '../controllers/books.controller';
import { BooksMappersService } from '../mappers/books.mappers';
import { Book, BookSchema } from '../schemas/book.schema';
import { MongoClient } from 'mongodb';
import { BooksService } from './books.service';
import { BOOKS_MOCKED } from '../mocks/books';
import { OrderBy } from '@kortext-books/types';
import { BooksUtilities } from '../utilities/books.utilities';

describe('BooksService', () => {
    let service: BooksService;
    let utilities: BooksUtilities;

    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    const database = client.db('books-test');
    const booksModel = database.collection('books');

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                HttpModule,
                //used docker for versioning problem
                MongooseModule.forRoot('mongodb://localhost:27017/books-test'),
                MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
            ],
            controllers: [BookController],
            providers: [BooksService, BooksMappersService, BooksUtilities],
        }).compile();

        await client.connect();

        // booksModel.createIndex({ title: 'text' });
        // booksModel.createIndex({ description: 'text' });

        service = app.get<BooksService>(BooksService);
        utilities = app.get<BooksUtilities>(BooksUtilities);
    });

    beforeEach(async () => {
        await booksModel.drop();
        await booksModel.insertMany(BOOKS_MOCKED);
    });

    describe('getBooksCount', () => {
        it('should has same books number as mocked array books', async () => {
            expect(await service.getBooksCount()).toEqual(BOOKS_MOCKED.length);
        });
    });

    describe('getBooks', () => {
        it('should return same result of books mocked ordered alphabetically', async () => {
            const res = JSON.stringify(await service.getBooks('Basket', OrderBy.ALPHABETICALLY));
            const expected = JSON.stringify(utilities.sortBooksByTitle(BOOKS_MOCKED));
            expect(res).toEqual(expected);
        });

        //from here insues on colelction indexes

        it("should return 2 books with 'Gift' mocked ordered alphabetically", async () => {
            const res = JSON.stringify(await service.getBooks('Gift', OrderBy.ALPHABETICALLY));
            const expected = JSON.stringify(utilities.sortBooksByTitle(BOOKS_MOCKED.slice(2, 4)));
            expect(res).toEqual(expected);
        });

        it("should return 2 books with 'Gift' mocked ordered by author", async () => {
            const res = JSON.stringify(await service.getBooks('Gift', OrderBy.AUTHOR));
            const expected = JSON.stringify(utilities.sortBooksByAuthors(BOOKS_MOCKED.slice(2, 4)));
            expect(res).toEqual(expected);
        });

        it('should return an empty collection', async () => {
            const res = JSON.stringify(await service.getBooks('mfn5b89243phcg58t073', OrderBy.AUTHOR));
            expect(res).toEqual([]);
        });
    });
});
