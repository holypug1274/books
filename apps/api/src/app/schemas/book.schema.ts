import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ _id: false })
export class Book {
    @Prop({ unique: true })
    googleId: string;

    @Prop()
    title: string;

    @Prop()
    authors: [string];

    @Prop()
    description: string;

    @Prop()
    thumbnail: string;

    @Prop()
    epubAvailable: boolean;

    @Prop()
    pdfAvailable: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.index({ title: 'text' });
BookSchema.index({ description: 'text' });
