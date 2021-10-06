import { HttpModule, Module } from '@nestjs/common';
import { BookController } from './controllers/books.controller';
import { BooksService } from './services/books.service';
import { BooksMappersService } from './mappers/books.mappers';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksUtilities } from './utilities/books.utilities';

@Module({
    imports: [
        HttpModule,
        //used docker for versioning problem
        MongooseModule.forRoot('mongodb://localhost:27017/books'),
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    ],
    controllers: [BookController],
    providers: [BooksService, BooksMappersService, BooksUtilities],
})
export class AppModule {}
